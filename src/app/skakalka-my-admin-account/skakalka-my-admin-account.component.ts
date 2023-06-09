import {Component, OnInit} from '@angular/core';
import {Slot} from "../shared/model/Slot";
import {LessonRequest} from "../shared/model/LessonRequest";
import {LessonReview} from "../shared/model/LessonReview";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {User} from "../shared/model/User";
import {AuthService} from "../shared/service/auth.service";
import {BookingService} from "../shared/service/booking.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {TrainerService} from "../shared/service/trainer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SkakalkaTrainerSlotDialog} from "../skakalka-my-trainer-account/skakalka-my-trainer-account.component";

@Component({
  selector: 'app-skakalka-my-admin-account',
  templateUrl: './skakalka-my-admin-account.component.html',
  styleUrls: ['./skakalka-my-admin-account.component.css']
})
export class SkakalkaMyAdminAccountComponent implements OnInit {

  admin: User | null = null;

  Events: any[] = [];
  lessons: Slot[] = [];
  clientRequests: LessonRequest[] = [];
  reviews: LessonReview[] = [];

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

  constructor(private authService: AuthService, private router: Router, private bookingService: BookingService,
              private jwtHelper: JwtHelperService, public dialog: MatDialog, public  trainerService: TrainerService) {
  }

  ngOnInit(): void {
    this.authService.getAuthUser().subscribe({
        next: (user: User) => {
          console.log(user.birthDate);
          this.admin = user

          this.trainerService.getAllOrganisationSlots(user.id).subscribe({
            next: (lessons: Slot[]) => {
              console.log(lessons)
              this.lessons = lessons;
              lessons.forEach(lesson => {
                  let color = (lesson.declined) ? "#707070" : "#fd9f01";

                  this.Events.push({
                    id: lesson.id,
                    title: lesson.specialization.name,
                    allDay: false,
                    start: lesson.date + 'T' + lesson.startTime,
                    end: lesson.date + 'T' + lesson.finishTime,
                    backgroundColor: color,
                  })
                }
              )
              this.calendarOptions = {
                events: this.Events,
              };
            }
          })

          this.bookingService.getRequestsForOrganisation(user.id).subscribe({
              next: (requests: LessonRequest[]) => {
                console.log(requests)
                this.clientRequests = requests
              }
          })

          this.trainerService.getAllOrganisationReviews(user.id).subscribe({
              next: reviews => {
                console.log(reviews)
                this.reviews = reviews
              },
              error: (err: HttpErrorResponse) => {
                console.log("lol " + err.error.errorMessage + err.error.errorCode)
                alert(err.error.errorMessage)
              }
            }
          )

        }
      }
    )
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  viewDialog(id: number) {
    const lesson: Slot = this.lessons.filter((obj: Slot) => {
      return obj.id == id;
    })?.[0];

    this.dialog.open(SkakalkaTrainerSlotDialog, {
      data: lesson
    });
  }

  acceptRequest(id: number) {
    this.clientRequests.forEach(r => {
      if (r.id == id) {
        r.status = 2
      }
    })
  }

  declineRequest(id: number) {
    this.clientRequests.forEach(r => {
      if (r.id == id) {
        r.status = 3
      }
    })
  }

  createReview(review: LessonReview) {

  }

  createSlot() {

  }
}
