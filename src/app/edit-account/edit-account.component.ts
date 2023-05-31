import { Component } from '@angular/core';
import {ApiError} from "../shared/model/Error";
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {JWTToken} from "../shared/model/AccessToken";
import {HttpErrorResponse} from "@angular/common/http";
import {NewUser} from "../shared/model/NewUser";
import {User} from "../shared/model/User";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {

  error: ApiError | null = null

  curUser: User | undefined;

  updatedUser: NewUser = {
    firstname:"",
    secondName: "",
    login:"",
    mail:"",
    birthdate: Date.prototype,
    gender:"o",
    password: ""
  };

  constructor(private authService: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.authService.getAuthUser().subscribe({
      next: (value: User) => {
        this.curUser = value
        this.updatedUser.gender = value.gender
        this.updatedUser.birthdate = value.birthDate
        this.updatedUser.firstname = value.firstName
        this.updatedUser.secondName = value.secondName
        this.updatedUser.login = value.login
        this.updatedUser.mail = value.mail
      },
      }
    )
  }

  onSubmit() {
    console.log(this.updatedUser)
    this.authService.updateClient(this.updatedUser, this.curUser?.id).subscribe({
      next: (value: User) => {
        this.error = {errorMessage: "", errorCode: ""}
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        alert(err.error.errorMessage)
        this.error = {
          errorMessage: err.error.errorMessage,
          errorCode: err.error.errorCode
        }
      },
      complete: () => {
        this.router.navigateByUrl('/myAccount');
      }
    });
  }

}

