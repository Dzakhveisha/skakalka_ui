import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SlotCriteria} from "../shared/model/slotCriteria";
import {Router} from "@angular/router";
import {Specialization} from "../shared/model/Slot";
import {RefdataService} from "../shared/service/refdata.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CityRegion} from "../shared/model/Gym";
import {OrganisationName} from "../shared/model/Organisation";

@Component({
  selector: 'app-skakalka-header-search-form',
  templateUrl: './skakalka-header-search-form.component.html',
  styleUrls: ['./skakalka-header-search-form.component.css']
})
export class SkakalkaHeaderSearchFormComponent implements OnInit {
  manConstValue: string = "m"
  womenConstValue: string = "w"

  priceFrom: number = 0;
  priceTo: number = 100;

  timeFrom = {hour: null, minute: null};
  timeTo = {hour: null, minute: null};

  @Input() criteria!: SlotCriteria;
  @Output() criteriaChange = new EventEmitter<SlotCriteria>();

  specializations: Specialization[] = [];
  cityRegions: CityRegion[] = [];
  organisations: OrganisationName[] = [];
  panelOpenState: boolean = false;
  mainPanelOpenState: boolean = true;


  constructor(private router: Router, private  refdataService: RefdataService) {
  }

  ngOnInit(): void {

    this.refdataService.getAllSpecializations().subscribe({
      next: (spec: Specialization[]) => {
        this.specializations = spec;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        alert(error.message)
      }
    });

    this.refdataService.getAllCityRegions().subscribe({
      next: (spec: CityRegion[]) => {
        this.cityRegions = spec;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        alert(error.message)
      }
    });

    this.refdataService.getAllOrgNames().subscribe({
      next: (spec: OrganisationName[]) => {
        this.organisations = spec;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        alert(error.message)
      }
    });


  }

  onSubmit() {
    console.log(this.timeTo)

    function resolveTimeToString(time: { hour: number | null; minute: number | null }) {
      if (time == null || time.hour == null) {
        return null;
      }
      if (time.minute == null || time.minute == 0) {
        return `${time.hour}:00`
      }
      return `${time.hour}:${time.minute}`
    }

    this.criteria.startTimeFrom = resolveTimeToString(this.timeFrom);
    this.criteria.startTimeTo = resolveTimeToString(this.timeTo);
    console.log(this.criteria)
    this.criteriaChange.emit(this.criteria);
  }

  onChangeSelect($event: Event) {

  }

  onChangeInput($event: Event) {

  }
}
