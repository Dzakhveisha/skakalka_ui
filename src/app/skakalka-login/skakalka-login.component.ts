import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {ApiError} from "../shared/model/Error";
import {JWTToken} from "../shared/model/AccessToken";
import {FormBuilder} from '@angular/forms';
import {User} from "../shared/model/User";

//import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './skakalka-login.component.html',
  styleUrls: ['./skakalka-login.component.css'],
  providers: [AuthService]
})
export class SkakalkaLoginComponent implements OnInit {

  error: ApiError | null = null

  credentials = {login: '', password: ''};

  constructor(private service: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let rawToken = localStorage.getItem("token")
    this.login()
  }

  login() {
    this.service.authenticate(this.credentials).subscribe({
      next: (page: JWTToken) => {
        this.error = null
        localStorage.setItem("token", page.token)
        this.error = {errorMessage: "", errorCode: ""}
        this.service.getAuthUser().subscribe({
            next: (user: User) => {
              localStorage.setItem("userRoleId", String(user.roleId))
            },
            error: (err: HttpErrorResponse) => {
              console.log("lol " + err.error.errorMessage + err.error.errorCode)
            }
          }
        )
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        this.error = {
          errorMessage: err.error.errorMessage,
          errorCode: err.error.errorCode
        }
      },
      complete: () => {
        this.router.navigateByUrl('/');
      }
    });
  }

}
