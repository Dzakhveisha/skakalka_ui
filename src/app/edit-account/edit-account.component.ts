import {Component} from '@angular/core';
import {ApiError} from "../shared/model/Error";
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {NewUser} from "../shared/model/NewUser";
import {User, UserRole} from "../shared/model/User";
import {Trainer} from "../shared/model/TrainerInfo";
import {TrainerService} from "../shared/service/trainer.service";
import {Gym} from "../shared/model/Gym";
import {Specialization} from "../shared/model/Slot";
import {RefdataService} from "../shared/service/refdata.service";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {

  error: ApiError | null = null

  curUser: User | undefined;

  updatedUser: NewUser = {
    firstname: "",
    secondName: "",
    login: "",
    mail: "",
    birthdate: Date.prototype,
    gender: "o",
    password: ""
  };

  updatedTrainerInfo: Trainer = {
    id : 0,
    organisation : null,
    user : null,
    defaultClientsCount : null,
    defaultGym : null,
    phoneNumber: null,
    experience: null,
    education: null,
    rank: null,
    readOnlyPermission: null,
    specializations: []
  }

  gyms: Gym[] = [];
  specializations: Specialization[] = [];
  educationTypes: string[] = ["Высшее", "Среднее", "Курсы"]
  rankTypes: string[] = ["I разряд", "II разряд", "III разряд", "Мастер спорта РБ",
    "Мастер спорта РБ Межд.", "Кандидат в мастера спорта"]


  constructor(private authService: AuthService, private router: Router, private trainerService: TrainerService,
              private fb: FormBuilder, private refdataService: RefdataService) {
  }

  ngOnInit(): void {
    this.refdataService.getAllSpecializations().subscribe({
      next: (spec: Specialization[]) => {
        this.specializations = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

    this.refdataService.getAllGyms().subscribe({
      next: (spec: Gym[]) => {
        this.gyms = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

    this.authService.getAuthUser().subscribe({
        next: (value: User) => {
          this.curUser = value
          this.updatedUser.gender = value.gender
          this.updatedUser.birthdate = value.birthDate
          this.updatedUser.firstname = value.firstName
          this.updatedUser.secondName = value.secondName
          this.updatedUser.login = value.login
          this.updatedUser.mail = value.mail
          if (value.roleId == UserRole.TRAINER) {
            this.getTrainerInfo(value.id)
          }
        },
      }
    )
  }

  private getTrainerInfo(userId: number) {
    this.trainerService.getTrainerIdByUserId(userId).subscribe({
      next: (value) => {
        this.trainerService.getTrainerById(value).subscribe({
          next: (trainer: Trainer) => {
            this.updatedTrainerInfo = {
              id : trainer.id,
              organisation : trainer.organisation,
              user : trainer.user,
              defaultClientsCount : trainer.defaultClientsCount,
              defaultGym : trainer.defaultGym,
              phoneNumber: trainer.phoneNumber,
              experience: trainer.experience,
              education: trainer.education,
              rank: trainer.rank,
              readOnlyPermission: trainer.readOnlyPermission,
              specializations: trainer.specializations
            }
          }
        })
      }
    })
  }


  onSubmit() {
    console.log(this.updatedUser)
    if (this.curUser?.roleId == UserRole.CLIENT) {
      this.updateUser()
    }
    if (this.curUser?.roleId == UserRole.TRAINER) {
      this.updateTrainer()
    }
  }

  private updateUser() {
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

  private updateTrainer() {
    this.updatedTrainerInfo.user!.mail = this.updatedUser.mail
    this.updatedTrainerInfo.user!.firstName = this.updatedUser.firstname
    this.updatedTrainerInfo.user!.secondName = this.updatedUser.secondName
    this.updatedTrainerInfo.user!.login = this.updatedUser.login
    this.updatedTrainerInfo.user!.birthDate = this.updatedUser.birthdate
    this.updatedTrainerInfo.user!.gender = this.updatedUser.gender
    this.authService.updateTrainer(this.updatedTrainerInfo, this.curUser?.id).subscribe({
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
        this.router.navigateByUrl('/myTrainerAccount');
      }
    });
  }

  isTrainer(): boolean {
    return this.curUser?.roleId == UserRole.TRAINER
  }
}

