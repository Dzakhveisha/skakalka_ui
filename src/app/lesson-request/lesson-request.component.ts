import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {BookingService} from "../shared/service/booking.service";
import {LessonRequestCreate} from "../shared/model/LessonRequest";
import {SlotCriteria} from "../shared/model/slotCriteria";
import {Specialization} from "../shared/model/Slot";
import {CityRegion, Gym} from "../shared/model/Gym";
import {OrganisationName} from "../shared/model/Organisation";
import {Trainer} from "../shared/model/TrainerInfo";
import {RefdataService} from "../shared/service/refdata.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserName} from "../shared/model/User";
import {TrainerService} from "../shared/service/trainer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-lesson-request',
  templateUrl: './lesson-request.component.html',
  styleUrls: ['./lesson-request.component.css']
})
export class LessonRequestComponent implements OnInit {

  request: LessonRequestCreate = {
    gymId: null,
    comment: null,
    specializationId: null,
    trainerId: null, //user
    username: null,
    startTime: null,
    finishTime: null,
    date: null
  };

  timeFrom = {hour: 12, minute: 0};
  timeTo = {hour: 13, minute: 0};

  specializations: Specialization[] = [];
  gyms: Gym[] = []
  trainers: UserName[] = []

  trainerId: number = -1;


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private authService: AuthService, private bookingService: BookingService, private refdataService: RefdataService,
              private trainerService: TrainerService, private jwtHelper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.trainerId = params['trainerId'];

      this.trainerService.getAllTrainersNames().subscribe({
        next: (trainersNames: UserName[]) => {
          this.trainers = trainersNames;
          // @ts-ignore
          this.request.trainerId = trainersNames.find(t => {
            return t.id == this.trainerId;
          })?.id
        },
        error: (err: HttpErrorResponse) => {
          console.log("lol " + err.error.errorMessage + err.error.errorCode)
          alert(err.error.errorMessage)
        }
      });
    })

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
  }

  onSubmit() {

    function resolveTimeToString(time: { hour: number | null; minute: number | null }) {

      if (time == null || time.hour == null) {
        return null;
      }
      if (time.minute == null || time.minute == 0) {
        return `${time.hour}:00`
      }
      return `${time.hour}:${time.minute}`
    }

    this.request.startTime = resolveTimeToString(this.timeFrom);
    this.request.finishTime = resolveTimeToString(this.timeTo);
    if ( this.request.specializationId == null || this.request.trainerId == null || this.request.date == null
    || this.request.startTime == null || this.request.finishTime == null){
      alert("Все обязательные поля должны быть заполнены!")
      return;
    }
    this.request.username = this.jwtHelper.decodeToken().sub;

    console.log(this.request)
    this.bookingService.createLessonRequest(this.request).subscribe({
      next: (spec: []) => {
        alert("Запрос на занятие успешно создан!")
        this.router.navigate(["trainerInfo/user/", this.trainerId])
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    })

  }
}
