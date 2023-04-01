import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SkakalkaMainComponent} from "./skakalka-main/skakalka-main.component";
import {SkakalkaLoginComponent} from "./skakalka-login/skakalka-login.component";
import {SkakalkaRegistrComponent} from "./skakalka-registr/skakalka-registr.component";
import {SkakalkaMyAccountComponent} from "./skakalka-my-account/skakalka-my-account.component";
import {AvailableSlotsComponent} from "./available-slots/available-slots.component";

const routes: Routes = [
  { path: '', component: SkakalkaMainComponent },
  {path: 'login', component: SkakalkaLoginComponent},
  {path: 'registr', component: SkakalkaRegistrComponent},
  {path: 'myAccount', component: SkakalkaMyAccountComponent},
  {path: 'slots', component: AvailableSlotsComponent},
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
