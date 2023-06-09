import {Component, Inject, OnInit} from '@angular/core';
import {NewSlotRequest, Slot, Specialization} from "../shared/model/Slot";
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
import {SkakalkaNewSlotDialog} from "../create-slot/create-slot.component";

@Component({
  selector: 'app-edit-slot',
  templateUrl: './edit-slot.component.html',
  styleUrls: ['./edit-slot.component.css']
})
export class EditSlotComponent implements OnInit {

  specializations: Specialization[] = [];
  gyms: Gym[] = [];

  timeFrom = {hour: null, minute: null};
  timeTo = {hour: null, minute: null};

  slot: Slot | null = null;

  private slotId: number = 0;

  constructor(private router: Router, private  refdataService: RefdataService, private bookingService: BookingService,
              private activatedRoute: ActivatedRoute, private trainerService: TrainerService,  public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.slotId = params['slotId'];

      this.bookingService.getSlotById(this.slotId).subscribe({
        next: (spec: Slot) => {
          this.slot = spec
          // @ts-ignore
          this.timeFrom = {hour: +spec.startTime.slice(0, 2), minute:  +spec.startTime.slice(3, 4)};
          // @ts-ignore
          this.timeTo = {hour: +spec.finishTime.slice(0, 2), minute:  +spec.finishTime.slice(3, 4)};
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
    // @ts-ignore
    this.slot.startTime = resolveTimeToString(this.timeFrom);
    // @ts-ignore
    this.slot.finishTime = resolveTimeToString(this.timeTo);
    console.log(this.slot)

    this.bookingService.updateSlot(this.slot, skipWarning).subscribe({
      next: value => {
        console.log(value)
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


