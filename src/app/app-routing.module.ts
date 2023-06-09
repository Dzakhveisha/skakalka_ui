import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SkakalkaMainComponent} from "./skakalka-main/skakalka-main.component";
import {SkakalkaLoginComponent} from "./skakalka-login/skakalka-login.component";
import {SkakalkaRegistrComponent} from "./skakalka-registr/skakalka-registr.component";
import {SkakalkaMyAccountComponent} from "./skakalka-my-account/skakalka-my-account.component";
import {AvailableSlotsComponent} from "./available-slots/available-slots.component";
import {SkakalkaPriceComponent} from "./skakalka-price/skakalka-price.component";
import {AvailableTrainersComponent} from "./available-trainers/available-trainers.component";
import {TrainerInfoComponent} from "./trainer-info/trainer-info.component";
import {LessonRequestComponent} from "./lesson-request/lesson-request.component";
import {SkakalkaMyTrainerAccountComponent} from "./skakalka-my-trainer-account/skakalka-my-trainer-account.component";
import {TextChatComponent} from "./text-chat/text-chat.component";
import {UserReviewComponent} from "./user-review/user-review.component";
import {SkakalkaMyAdminAccountComponent} from "./skakalka-my-admin-account/skakalka-my-admin-account.component";
import {EditAccountComponent} from "./edit-account/edit-account.component";
import {CreateSlotComponent} from "./create-slot/create-slot.component";
import {EditSlotComponent} from "./edit-slot/edit-slot.component";

const routes: Routes = [
  { path: '', component: SkakalkaMainComponent },
  {path: 'login', component: SkakalkaLoginComponent},
  {path: 'registr', component: SkakalkaRegistrComponent},
  {path: 'myAccount', component: SkakalkaMyAccountComponent},
  {path: 'editAccount', component: EditAccountComponent},
  {path: 'myTrainerAccount', component: SkakalkaMyTrainerAccountComponent},
  {path: 'myAdminAccount', component: SkakalkaMyAdminAccountComponent},
  {path: 'slots', component: AvailableSlotsComponent},
  {path: 'trainers', component: AvailableTrainersComponent},
  {path: 'price', component: SkakalkaPriceComponent},
  {path: 'trainerInfo/:id', component: TrainerInfoComponent},
  {path: 'trainerInfo/user/:userId', component:TrainerInfoComponent},
  {path: 'LessonRequest/:trainerId', component:LessonRequestComponent},
  {path: 'userReview/:lessonId/:userId', component:UserReviewComponent},
  {path: 'createSlot/:trainerId', component:CreateSlotComponent},
  {path: 'editSlot/:slotId', component: EditSlotComponent},
  {path: 'chat', component: TextChatComponent},
  {path: 'chat/:login', component: TextChatComponent}
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
