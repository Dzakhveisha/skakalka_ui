import { Component } from '@angular/core';
import {ApiError} from "../shared/model/Error";
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {JWTToken} from "../shared/model/AccessToken";
import {HttpErrorResponse} from "@angular/common/http";
import {NewUser} from "../shared/model/NewUser";
import {User} from "../shared/model/User";

//import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-skakalka-registr',
  templateUrl: './skakalka-registr.component.html',
  styleUrls: ['./skakalka-registr.component.css']
})
export class SkakalkaRegistrComponent {

  error: ApiError | null = null

  newUser: NewUser = {
    firstname:"",
    secondName: "",
    login:"",
    mail:"",
    birthdate: Date.prototype,
    password:"",
    gender:"o"
  };

  constructor(private service: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.newUser)
    this.register()
  }

  register() {
    this.service.register(this.newUser).subscribe({
      next: (page: JWTToken) => {
        this.error = null
        localStorage.setItem("token", page.token)
        this.error = {errorMessage: "", errorCode: ""}
        this.service.getAuthUser().subscribe({
            next: (user: User) => {
              localStorage.setItem("userRoleId", String(user.roleId))
              this.service.initWS()
            },
            error: (err: HttpErrorResponse) => {
              console.log("lol " + err.error.errorMessage + err.error.errorCode)
            }
          }
        )
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
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
