import {Component} from '@angular/core';
import {Trainer} from "../shared/model/TrainerInfo";
import {TrainerCriteria} from "../shared/model/TrainerCriteria";
import {HttpErrorResponse} from "@angular/common/http";
import {TrainerService} from "../shared/service/trainer.service";
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {UserRole} from "../shared/model/User";
import {OrderType} from "../shared/model/OrderType";
import {Slot} from "../shared/model/Slot";

@Component({
  selector: 'app-available-trainers',
  templateUrl: './available-trainers.component.html',
  styleUrls: ['./available-trainers.component.css']
})
export class AvailableTrainersComponent {

  trainers: Trainer[] = []

  criteria: TrainerCriteria = {
    trainerAgeFrom: null,
    trainerAgeTo: null,
    trainerExperienceFrom: null,
    trainerGender: null,

    gymRegion: null, // get Id from select
    organisation: null,
    defaultGym: null, //get ID from select

    specialization: null,
    education: null,
    rank: null,
    defaultClientsCountFrom: null,
    defaultClientsCountTo: null,

    order: null
  }

  orderTypes: OrderType[] = [
    {
      orderName: "Сначала высокий рейтинг",
      value: "price_desc"
    },
    {
      orderName: "Сначала низкий рейтинг",
      value: "price_asc"
    }
]


  constructor(private trainerService: TrainerService, private authService: AuthService, private  router: Router) {
  }

  ngOnInit(): void {
    this.trainerService.getAllTrainers(this.criteria).subscribe({
      next: (trainersInfo: Trainer[]) => {
        this.trainers = trainersInfo;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });
  }

  updateList(criteria: TrainerCriteria) {
    this.criteria = criteria
    this.trainerService.getAllTrainers(this.criteria).subscribe({
      next: (trainersInfo: Trainer[]) => {
        this.trainers = trainersInfo;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });
  }

  onRequestLesson(id: number | undefined) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['LessonRequest/', id]);
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  isClient() {
      return  this.authService.isAuthenticatedWithRole(UserRole.CLIENT) || !this.authService.isAuthenticated()
  }

  onOrderChange(order: string | null) {
    this.criteria.order = order;
    this.trainerService.getAllTrainers(this.criteria).subscribe({
      next: (trainersInfo: Trainer[]) => {
        this.trainers = trainersInfo;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

  }
}
