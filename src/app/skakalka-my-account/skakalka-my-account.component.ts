import {Component, OnInit} from '@angular/core';
import {User} from "../shared/model/User";
import {AuthService} from "../shared/service/auth.service";
import {JWTToken} from "../shared/model/AccessToken";
import {HttpErrorResponse} from "@angular/common/http";
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-skakalka-my-account',
  templateUrl: './skakalka-my-account.component.html',
  styleUrls: ['./skakalka-my-account.component.css']
})
export class SkakalkaMyAccountComponent implements OnInit {

  user: User = {
    firstName: "",
    secondName: "",
    mail: "",
    birthdate: Date.prototype,
    login:""
  };

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],

    headerToolbar: {
      start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
      center: '',
      end: 'dayGridMonth,timeGridWeek,timeGridDay' // will normally be on the right. if RTL, will be on the left
    },
    height: "auto",
    events: [
      {

        title: 'Йога', // a property!
        start: '2023-03-25T00:30:00',
        end: '2023-03-25T10:40:00',
        color: 'red',
        url: "/",
        className: "sportEvent"
      },
      {
        title: 'Танцы', // a property!
        start: '2023-03-26T00:30:00', // a property!
        end: '2023-03-26T20:30:00', // a property!
        color: "#FFGFF",

      },
      {
        title: 'BCH237',
        start: '2023-03-26T10:30:00',
        end: '2023-03-26T11:30:00',
        extendedProps: {
          department: 'BioChemistry'
        },
        description: 'Lecture'
      }
    ]
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getAuthUser().subscribe({
        next: (user: User) => {
          this.user = user;
        }
      }
    )
  }

}
