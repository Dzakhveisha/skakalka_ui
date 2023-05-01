import {Component, Inject, OnInit} from '@angular/core';
import {Slot} from "../shared/model/Slot";
import {BookingService} from "../shared/service/booking.service";
import {SlotCriteria} from "../shared/model/slotCriteria";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../shared/service/auth.service";
import {UserRole} from "../shared/model/User";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {getLessonStatusById, Lesson} from "../shared/model/Lesson";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SkakalkaMyLessonDialog} from "../skakalka-my-account/skakalka-my-account.component";


@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  slots: Slot[];

  criteria: SlotCriteria = {
    date: null,
    startTimeFrom: null,
    startTimeTo: null,
    specialization: null, //get id
    priceFrom: null,
    priceTo: null,
    isIndividual: false,

    trainerAgeFrom: null,
    trainerAgeTo: null,
    trainerExperienceFrom: null,
    trainerGender: null,

    gymRegion: null, // get Id from select
    gymOrganisation: null, //get ID from select
  }

  constructor(private bookingService: BookingService, private authService: AuthService,
              private router: Router, private jwtHelper: JwtHelperService, public dialog: MatDialog) {
    this.slots = [];
  }

  ngOnInit(): void {
    this.bookingService.getAvailableSlots(this.criteria).subscribe({
      next: (slotsN: Slot[]) => {
        this.slots = slotsN;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });
  }

  onBookSlot(id: number) {
    if (this.authService.isAuthenticatedWithRole(UserRole.CLIENT)) {
      const username = this.jwtHelper.decodeToken().sub;
      this.bookingService.bookLesson(id, username).subscribe({
          next: (l: Lesson) => {
            this.dialog.open(SkakalkaMyLessonDialog, {
              data: l
            })
          },
          error: (err: HttpErrorResponse) => {
            console.log("lol " + err.error.errorMessage + err.error.errorCode)
            alert(err.error.errorMessage)
          }
        }
      )
    } else {
      this.router.navigateByUrl('/login');
    }
    return false
  }

  updateList(criteria: SlotCriteria
  ) {
    this.criteria = criteria;
    this.bookingService.getAvailableSlots(this.criteria).subscribe({
      next: (slotsN: Slot[]) => {
        this.slots = slotsN;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

  }

  isClient() {
    return  this.authService.isAuthenticatedWithRole(UserRole.CLIENT) || !this.authService.isAuthenticated()
  }
}


@Component({
  selector: 'skakalka-booked-lesson-dialog',
  templateUrl: 'skakalka-booked-lesson-dialog.html',
})
export class SkakalkaBookedLessonDialog {
  stringStatus: string | undefined;

  constructor(public dialogRef: MatDialogRef<SkakalkaBookedLessonDialog>, @Inject(MAT_DIALOG_DATA) public lesson: Lesson) {
    this.stringStatus = getLessonStatusById(this.lesson.statusId);
  }
}

