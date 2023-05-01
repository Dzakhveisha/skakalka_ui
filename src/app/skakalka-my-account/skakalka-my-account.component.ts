import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../shared/model/User";
import {AuthService} from "../shared/service/auth.service";
import {CalendarOptions} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {Router} from "@angular/router";
import {BookingService} from "../shared/service/booking.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {getLessonStatusById, Lesson} from "../shared/model/Lesson";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApiError} from "../shared/model/Error";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-skakalka-my-account',
  templateUrl: './skakalka-my-account.component.html',
  styleUrls: ['./skakalka-my-account.component.css']
})
export class SkakalkaMyAccountComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: "",
    secondName: "",
    mail: "",
    birthDate: Date.prototype,
    login: "",
    gender: "",
    rate: null,
    roleId: 0
  };

  Events: any[] = [];
  lessons: Lesson[] = [];

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
        hour12:false
      }
    ],

    eventClick: (info) => {
      this.viewDialog(+info.event.id)
    }
  };

  constructor(private authService: AuthService, private router: Router, private bookingService: BookingService,
              private jwtHelper: JwtHelperService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authService.getAuthUser().subscribe({
        next: (user: User) => {
          console.log(user.birthDate);
          this.user = user;
        }
      }
    )

    const username = this.jwtHelper.decodeToken().sub;
    this.bookingService.getLessonsOfUser(username).subscribe({
      next: (lessons: Lesson[]) => {
        console.log(lessons)
        this.lessons = lessons;
        lessons.forEach(lesson => {
          let color = (lesson.statusId == 4)? "#707070": "#fd9f01";

          this.Events.push({
              id: lesson.id,
              title: lesson.slot.specialization.name,
              allDay: false,
              start: lesson.slot.date + 'T' + lesson.slot.startTime,
              end: lesson.slot.date + 'T' + lesson.slot.finishTime,
              backgroundColor: color,
            })
          }
        )
        this.calendarOptions = {
          events: this.Events,
        };
      }
    })
    this.calendarOptions.events = []

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  viewDialog(id: number) {
    const lesson: Lesson = this.lessons.filter((obj: Lesson) => {
      return obj.id == id;
    })?.[0];

    this.dialog.open(SkakalkaMyLessonDialog, {
      data: lesson
    });
  }

}

@Component({
  selector: 'skakalka-my-account-dialog',
  templateUrl: 'skakalka-my-account-dialog.html',
})
export class SkakalkaMyLessonDialog {
  stringStatus: string | undefined;

  constructor(public dialogRef: MatDialogRef<SkakalkaMyLessonDialog>, @Inject(MAT_DIALOG_DATA) public lesson: Lesson,
              private jwtHelper: JwtHelperService, private bookingService: BookingService) {
    this.stringStatus =  getLessonStatusById(this.lesson.statusId);
  }

  cancelLesson(): void {
    const username = this.jwtHelper.decodeToken().sub;
    this.bookingService.cancelLesson(this.lesson.id, username).subscribe({
        next: (result: boolean) => {
          if (result) {
            alert("Занятие было успешно отменено.")
            this.lesson.statusId = 4;
            this.stringStatus = getLessonStatusById(4)
          } else {
            alert("Произошла ошибка при отмене занятия!")
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log("lol " + err.error.errorMessage + err.error.errorCode)
          alert(err.error.errorMessage)
        }
      }
    )

  }
}
