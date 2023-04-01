import { Component, OnInit } from '@angular/core';
import {SlotCriteria} from "../shared/model/slotCriteria";
import {Time} from "@angular/common";
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-skakalka-header-search-form',
  templateUrl: './skakalka-header-search-form.component.html',
  styleUrls: ['./skakalka-header-search-form.component.css']
})
export class SkakalkaHeaderSearchFormComponent implements OnInit {

  criteria: SlotCriteria = {
    date: "",
    startTimeFrom: {hours: 12, minutes: 0},
    startTimeTo: {hours: 13, minutes: 0},
    specialization: 0, //get id from select
    priceFrom: 0,
    priceTo: 1000,
    isIndividual: false,

    trainerRank: "", //select
    trainerEducation: "", // number for enum
    trainerExperienceFrom: 0,

    gymRegion: 0, // get Id from select
    gymOrganisation: 0, //get ID from select

  }

  time = {hour: 14, minute: 30};

  time2 = {hour: 15, minute: 30};

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.router.navigateByUrl('/slots');
  }

  onChangeSelect($event: Event) {

  }

  onChangeInput($event: Event) {

  }
}
