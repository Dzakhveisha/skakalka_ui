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
import {OrderType} from "../shared/model/OrderType";


@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  slots: Slot[];

  criteria: SlotCriteria = {
    order: null,

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

  orderTypes: OrderType[] = [
    {
      orderName: "Сначала дешевые",
      value: "price_asc"
    },
    {
      orderName: "Сначала дорогие",
      value: "price_desc"
    },
    {
      orderName: "Сначала с высоким рейтингом (тренеры)",
      value: "rate_asc"
    },
    {
      orderName: "без сортировок",
      value: null
    }]

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

  onBookSlot(id: number, warningFlag: boolean | null) {
    if (this.authService.isAuthenticatedWithRole(UserRole.CLIENT)) {
      const username = this.jwtHelper.decodeToken().sub;
      this.bookingService.bookLesson(id, username, warningFlag).subscribe({

          next: (l: Lesson) => {
            alert("Запись произведена успешно")
            let dialogRef = this.dialog.open(SkakalkaBookedLessonDialog, {
              data:l
            })
          },
          error: (err: HttpErrorResponse) => {
            if (err.error.errorMessage.includes("пересекается с создаваемым!")) {
              let dialogRef = this.dialog.open(SkakalkaBookedLessonDialog, {
                data: null,
              })
              dialogRef.afterClosed().subscribe(result => {
                if (result == "ignoreWarn"){
                  this.onBookSlot(id, true)
                }
              });
            } else {
              console.log("lol " + err.error.errorMessage + err.error.errorCode)
              alert(err.error.errorMessage)
            }
          }
        }
      )
    } else {
      this.router.navigateByUrl('/login');
    }
    return false
  }

  updateList(criteria: SlotCriteria) {
    criteria.order = this.criteria.order
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
    return this.authService.isAuthenticatedWithRole(UserRole.CLIENT) || !this.authService.isAuthenticated()
  }

  onOrderChange(order: string | null) {
    this.criteria.order = order;
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
}


@Component({
  selector: 'skakalka-booked-lesson-dialog',
  templateUrl: 'skakalka-booked-lesson-dialog.html',
})
export class SkakalkaBookedLessonDialog {
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

