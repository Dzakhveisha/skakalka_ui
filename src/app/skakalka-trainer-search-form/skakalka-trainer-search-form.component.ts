import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Specialization} from "../shared/model/Slot";
import {CityRegion, Gym} from "../shared/model/Gym";
import {OrganisationName} from "../shared/model/Organisation";
import {Router} from "@angular/router";
import {RefdataService} from "../shared/service/refdata.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TrainerCriteria} from "../shared/model/TrainerCriteria";

@Component({
  selector: 'app-skakalka-trainer-search-form',
  templateUrl: './skakalka-trainer-search-form.component.html',
  styleUrls: ['./skakalka-trainer-search-form.component.css']
})
export class SkakalkaTrainerSearchFormComponent implements OnInit {
  manConstValue: string = "m"
  womenConstValue: string = "w"

  educationTypes: string[] = ["Высшее", "Среднее", "Курсы"]
  rankTypes: string[] = ["I разряд", "II разряд", "III разряд", "Мастер спорта РБ",
    "Мастер спорта РБ Межд.", "Кандидат в мастера спорта"]

  priceFrom: number = 0;
  priceTo: number = 100;

  @Input() criteria!: TrainerCriteria;
  @Output() criteriaChange = new EventEmitter<TrainerCriteria>();

  specializations: Specialization[] = [];
  cityRegions: CityRegion[] = [];
  organisations: OrganisationName[] = [];
  gyms: Gym[] = [];

  panelOpenState: boolean = false;
  mainPanelOpenState: boolean = true;

  constructor(private router: Router, private  refdataService: RefdataService) {
  }

  ngOnInit(): void {

    this.refdataService.getAllSpecializations().subscribe({
      next: (spec: Specialization[]) => {
        this.specializations = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

    this.refdataService.getAllGyms().subscribe({
      next: (spec: Gym[]) => {
        this.gyms = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

    this.refdataService.getAllCityRegions().subscribe({
      next: (spec: CityRegion[]) => {
        this.cityRegions = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });

    this.refdataService.getAllOrgNames().subscribe({
      next: (spec: OrganisationName[]) => {
        this.organisations = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    });
  }

  onSubmit() {
    console.log(this.criteria)
    this.criteriaChange.emit(this.criteria);
  }

  onChangeSelect($event: Event) {
  }

  onChangeInput($event: Event) {
  }

}
