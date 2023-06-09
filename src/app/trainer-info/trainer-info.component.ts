import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Trainer} from "../shared/model/TrainerInfo";
import {TrainerService} from "../shared/service/trainer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BookingService} from "../shared/service/booking.service";
import {Slot} from "../shared/model/Slot";
import {UserRole} from "../shared/model/User";
import {AuthService} from "../shared/service/auth.service";
import {Lesson} from "../shared/model/Lesson";

@Component({
  selector: 'app-trainer-info',
  templateUrl: './trainer-info.component.html',
  styleUrls: ['./trainer-info.component.css']
})
export class TrainerInfoComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
      center: '',
      end: 'dayGridMonth,timeGridWeek,timeGridDay' // will normally be on the right. if RTL, will be on the left
    },

    slotDuration: {
      minute: 60,
    },
    allDaySlot: false,
    height: "auto",
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    slotLabelFormat: [
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
    ],

    eventClick: (info) => {
      this.viewDialog(+info.event.id)
    }
  };

  trainer: Trainer = {
    id: null,
    organisation: null,
    user: null,
    defaultClientsCount: null,
    defaultGym: null,
    phoneNumber: null,
    experience: null,
    education: null,
    rank: null,
    readOnlyPermission: null,
    specializations: []

  }

  Events: any[] = [];
  slots: Slot[] = [];

  constructor(private activatedRoute: ActivatedRoute, private trainerService: TrainerService,
              public dialog: MatDialog, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.calendarOptions.events = [];
    this.activatedRoute.params.subscribe(params => {
      const trainerId = params['id'];
      const userId = params['userId']

      if (!(trainerId == undefined)) {
        this.getInfo(trainerId)
      } else {
        this.trainerService.getTrainerIdByUserId(userId).subscribe({
            next: value => {
              this.getInfo(value)
            },
            error: (err: HttpErrorResponse) => {
              console.log("lol " + err.error.errorMessage + err.error.errorCode)
              alert(err.error.errorMessage)
            }
          }
        )
      }

    });
  }


  viewDialog(id: number) {
    const lesson: Slot = this.slots.filter((obj: Slot) => {
      return obj.id == id;
    })?.[0];

    this.dialog.open(TrainerLessonDialog, {
      data: lesson
    });
  }

  private getInfo(trainerId: any) {
    this.trainerService.getTrainerById(trainerId).subscribe({
        next: value => {
          this.trainer = value

          this.trainerService.getTrainerSlots(value.user.id).subscribe({
              next: (slots: Slot[]) => {
                console.log(slots)
                this.slots = slots;
                slots.forEach(slot => {
                    let color = (slot.declined) ? "#707070" : "#fd9f01";

                    this.Events.push({
                      id: slot.id,
                      title: slot.specialization.name,
                      allDay: false,
                      start: slot.date + 'T' + slot.startTime,
                      end: slot.date + 'T' + slot.finishTime,
                      backgroundColor: color,
                    })
                  }
                )
                this.calendarOptions = {
                  events: this.Events,
                };
              },
              error: (err: HttpErrorResponse) => {
                console.log("lol " + err.error.errorMessage + err.error.errorCode)
                alert(err.error.errorMessage)
              }
            }
          )


        },
        error: (err: HttpErrorResponse) => {
          console.log("lol " + err.error.errorMessage + err.error.errorCode)
          alert(err.error.errorMessage)
        }
      }
    )
  }

  onRequestLesson(id: number | null) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['LessonRequest/', this.trainer.user?.id]);
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  isClient() {
    return this.authService.isAuthenticatedWithRole(UserRole.CLIENT) || !this.authService.isAuthenticated()
  }
}


@Component({
  selector: 'skakalka-trainer-lesson-dialog',
  templateUrl: 'skakalka-trainer-lesson-dialog.html',
})
export class TrainerLessonDialog {
  stringStatus: string | undefined;
  isWarning: boolean = false;

  constructor(public dialogRef: MatDialogRef<TrainerLessonDialog>, @Inject(MAT_DIALOG_DATA) public slot: Slot,
              private jwtHelper: JwtHelperService, private bookingService: BookingService,
              private authService: AuthService, private router: Router) {
    this.stringStatus = (this.slot.declined) ? "Отменено" : "";
  }

  cancelLesson(): void {

  }

  bookLesson(warningFlag: boolean): void {
    if (this.authService.isAuthenticatedWithRole(UserRole.CLIENT)) {
      const username = this.jwtHelper.decodeToken().sub;
      this.bookingService.bookLesson(this.slot.id, username, warningFlag).subscribe({
          next: (l: Lesson) => {
            this.isWarning = false;
            alert("Запись произведена успешно")
            this.dialogRef.close();
          }
          ,
          error: (err: HttpErrorResponse) => {
            if (err.error.errorMessage.includes("пересекается с создаваемым!")) {
              this.isWarning = true;
            } else {
              this.isWarning = false;
              console.log("lol " + err.error.errorMessage + err.error.errorCode)
              alert(err.error.errorMessage)
            }
          }
        }
      )
    } else {
      this.dialogRef.close();

      this.router.navigateByUrl('/login');
    }
  }

  isClient() {
    return this.authService.isAuthenticatedWithRole(UserRole.CLIENT) || !this.authService.isAuthenticated()
  }
}
