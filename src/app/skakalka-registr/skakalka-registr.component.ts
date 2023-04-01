import { Component } from '@angular/core';
import {ApiError} from "../shared/model/Error";
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {JWTToken} from "../shared/model/AccessToken";
import {HttpErrorResponse} from "@angular/common/http";
import {NewUser} from "../shared/model/NewUser";

//import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-skakalka-registr',
  templateUrl: './skakalka-registr.component.html',
  styleUrls: ['./skakalka-registr.component.css']
})
export class SkakalkaRegistrComponent {

  error: ApiError = {
    errorCode: "",
    errorMessage: ""
  }

  newUser: NewUser = {
    firstname:"",
    secondName: "",
    login:"",
    mail:"",
    birthdate: Date.prototype,
    password:""
  };

  constructor(private service: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.newUser)
    let rawToken = localStorage.getItem("token")
    this.register()
  }

  register() {
    this.service.register(this.newUser).subscribe({
      next: (page: JWTToken) => {
        localStorage.setItem("token", page.token)
        this.error = {errorMessage: "", errorCode: ""}
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error
        console.log(error)
      },
      complete: () => {
        this.router.navigateByUrl('/');
      }
    });
  }

}
