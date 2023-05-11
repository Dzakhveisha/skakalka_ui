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

const routes: Routes = [
  { path: '', component: SkakalkaMainComponent },
  {path: 'login', component: SkakalkaLoginComponent},
  {path: 'registr', component: SkakalkaRegistrComponent},
  {path: 'myAccount', component: SkakalkaMyAccountComponent},
  {path: 'myTrainerAccount', component: SkakalkaMyTrainerAccountComponent},
  {path: 'slots', component: AvailableSlotsComponent},
  {path: 'trainers', component: AvailableTrainersComponent},
  {path: 'price', component: SkakalkaPriceComponent},
  {path: 'trainerInfo/:id', component: TrainerInfoComponent},
  {path: 'trainerInfo/user/:userId', component:TrainerInfoComponent},
  {path: 'LessonRequest/:trainerId', component:LessonRequestComponent},
  {path: 'chat', component: TextChatComponent},
  {path: 'chat/:login', component: TextChatComponent}
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
