import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkakalkaHeaderComponent } from './skakalka-header/skakalka-header.component';
import { SkakalkaMainComponent } from './skakalka-main/skakalka-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkakalkaLoginComponent } from './skakalka-login/skakalka-login.component';
import {SkakalkaHeaderSearchFormComponent} from "./skakalka-header-search-form/skakalka-header-search-form.component";
import { HttpClientModule } from '@angular/common/http';
import { SkakalkaRegistrComponent } from './skakalka-registr/skakalka-registr.component';
import { SkakalkaMyAccountComponent } from './skakalka-my-account/skakalka-my-account.component';
import {JwtModule} from "@auth0/angular-jwt";


import { FullCalendarModule } from '@fullcalendar/angular';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import { AvailableSlotsComponent } from './available-slots/available-slots.component';
import { SlotItemComponent } from './available-slots/slot-item/slot-item.component';

// import { CalendarModule } from 'angular-calendar';
// import { SchedulerModule } from 'angular-calendar-scheduler';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    SkakalkaHeaderComponent,
    SkakalkaHeaderSearchFormComponent,
    SkakalkaMainComponent,
    SkakalkaLoginComponent,
    SkakalkaRegistrComponent,
    SkakalkaMyAccountComponent,
    AvailableSlotsComponent,
    SlotItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["*"],
        disallowedRoutes: [],
      },
    }),

    FullCalendarModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
