import {Component, Inject, OnInit} from '@angular/core';
import {NewSlotRequest, Specialization} from "../shared/model/Slot";
import {Gym} from "../shared/model/Gym";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RefdataService} from "../shared/service/refdata.service";
import {BookingService} from "../shared/service/booking.service";
import {TrainerService} from "../shared/service/trainer.service";
import {Trainer} from "../shared/model/TrainerInfo";
import {SkakalkaBookedLessonDialog} from "../available-slots/available-slots.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {getLessonStatusById, Lesson} from "../shared/model/Lesson";
import {AuthService} from "../shared/service/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.css']
})
export class CreateSlotComponent implements OnInit {

  specializations: Specialization[] = [];
  gyms: Gym[] = [];

  timeFrom = {hour: null, minute: null};
  timeTo = {hour: null, minute: null};

  slot: NewSlotRequest = {
    trainerId: 0,
    date: "",
    startTime: "",
    finishTime: "",
    gymId: 0,
    specializationId: 0,
    maxClientCount: 1,
    price: 0
  }
  private trainerId: number = 0; // user id
  private trainerInfo: Trainer | null = null

  constructor(private router: Router, private  refdataService: RefdataService, private bookingService: BookingService,
              private activatedRoute: ActivatedRoute, private trainerService: TrainerService,  public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.trainerId = params['trainerId'];
      this.slot.trainerId = this.trainerId;
      this.trainerService.getTrainerIdByUserId(this.trainerId).subscribe({
        next: (spec: number) => {
          this.trainerId = spec
          this.trainerService.getTrainerById(spec).subscribe({
            next: (spec: Trainer) => {
              this.trainerInfo = spec
              if (this.trainerInfo.defaultClientsCount != null) {
                this.slot.maxClientCount = this.trainerInfo.defaultClientsCount
              }
              if (this.trainerInfo.defaultGym?.id != null) {
                this.slot.gymId = this.trainerInfo.defaultGym?.id
              }
            }
          })
        },
        error: (err: HttpErrorResponse) => {
          console.log("lol " + err.error.errorMessage + err.error.errorCode)
          alert(err.error.errorMessage)
        }
      })
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

  onSubmit(skipWarning: boolean) {
    function  resolveTimeToString(time: { hour: number | null; minute: number | null }) {
      if (time == null || time.hour == null) {
        return null;
      }
      let min = ''
      let hr = ''
      if (time.minute == null || time.minute == 0) {
        min = '00'
      } else {
        min = (time.minute < 10) ? `0${time.minute}` : `${time.minute}`
      }
      hr = (time.hour < 10) ? `0${time.hour}` : `${time.hour}`
      return `${hr}:${min}`
    }
    this.slot.startTime = resolveTimeToString(this.timeFrom);
    this.slot.finishTime = resolveTimeToString(this.timeTo);
    console.log(this.slot)

    this.bookingService.createSlot(this.slot, skipWarning).subscribe({
      next: value => {
        alert(value)
        this.router.navigateByUrl('/myTrainerAccount');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.errorMessage.includes("пересекается с создаваемым!")) {
          let dialogRef = this.dialog.open(SkakalkaNewSlotDialog, {
            data: null,
          })
          dialogRef.afterClosed().subscribe(result => {
            if (result == "ignoreWarn") {
              this.onSubmit(true)
            }
          });
        } else {
          console.log("lol " + err.error.errorMessage + err.error.errorCode)
          alert(err.error.errorMessage)
        }
      }
    })
  }

  onChangeSelect($event: any) {

  }
}


@Component({
  selector: 'skakalka-new-slot-dialog',
  templateUrl: 'skakalka-new-slot-dialog.html',
})
export class SkakalkaNewSlotDialog {
  stringStatus: string | undefined;

  constructor(public dialogRef: MatDialogRef<SkakalkaBookedLessonDialog>, @Inject(MAT_DIALOG_DATA) public lesson: Lesson | null,
              private bookingService: BookingService, private authService: AuthService,
              private router: Router, private jwtHelper: JwtHelperService,) {
    if (lesson != null) {
      this.stringStatus = getLessonStatusById(this.lesson?.statusId);
    }
  }

  isWarning() {
    return this.lesson == null
  }

  bookLesson(b: boolean) {
    this.dialogRef.close("ignoreWarn")
  }
}


