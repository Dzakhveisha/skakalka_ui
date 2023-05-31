import {forwardRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SkakalkaHeaderComponent} from './skakalka-header/skakalka-header.component';
import {SkakalkaMainComponent} from './skakalka-main/skakalka-main.component';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SkakalkaLoginComponent} from './skakalka-login/skakalka-login.component';
import {SkakalkaHeaderSearchFormComponent} from "./skakalka-header-search-form/skakalka-header-search-form.component";
import {HttpClientModule} from '@angular/common/http';
import {SkakalkaRegistrComponent} from './skakalka-registr/skakalka-registr.component';
import {SkakalkaMyAccountComponent, SkakalkaMyLessonDialog} from './skakalka-my-account/skakalka-my-account.component';
import {JwtModule} from "@auth0/angular-jwt";


import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {AvailableSlotsComponent, SkakalkaBookedLessonDialog} from './available-slots/available-slots.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkListboxModule} from '@angular/cdk/listbox';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DialogModule} from '@angular/cdk/dialog';
import { SkakalkaPriceComponent } from './skakalka-price/skakalka-price.component';
import { AvailableTrainersComponent } from './available-trainers/available-trainers.component';
import { SkakalkaTrainerSearchFormComponent } from './skakalka-trainer-search-form/skakalka-trainer-search-form.component';
import {TrainerInfoComponent, TrainerLessonDialog} from './trainer-info/trainer-info.component';
import { LessonRequestComponent } from './lesson-request/lesson-request.component';
import {
  SkakalkaMyTrainerAccountComponent,
  SkakalkaTrainerSlotDialog
} from './skakalka-my-trainer-account/skakalka-my-trainer-account.component';
import { TextChatComponent } from './text-chat/text-chat.component';
import {TextChatService} from "./shared/service/text-chat.service";
import { UserReviewComponent } from './user-review/user-review.component';
import { SkakalkaMyAdminAccountComponent } from './skakalka-my-admin-account/skakalka-my-admin-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

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
    SkakalkaMyLessonDialog,
    AvailableSlotsComponent,
    SkakalkaBookedLessonDialog,
    SkakalkaPriceComponent,
    AvailableTrainersComponent,
    SkakalkaTrainerSearchFormComponent,
    TrainerInfoComponent,
    TrainerLessonDialog,
    LessonRequestComponent,
    SkakalkaMyTrainerAccountComponent,
    SkakalkaTrainerSlotDialog,
    TextChatComponent,
    UserReviewComponent,
    SkakalkaMyAdminAccountComponent,
    EditAccountComponent
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
    MatChipsModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkListboxModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
  ],
  providers: [
    TextChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
