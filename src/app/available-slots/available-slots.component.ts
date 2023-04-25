import {Component, OnInit} from '@angular/core';
import {Slot} from "../shared/model/Slot";
import {Time} from "@angular/common";
import {Gym} from "../shared/model/Gym";
import {BookingService} from "../shared/service/booking.service";
import {SlotCriteria} from "../shared/model/slotCriteria";
import {JWTToken} from "../shared/model/AccessToken";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  slots: Slot[];

  criteria: SlotCriteria = {
    date: null,
    startTimeFrom: null,
    startTimeTo: null,
    specialization: null, //get id
    priceFrom: null,
    priceTo: null,
    isIndividual: false,

    trainerAgeFrom: null,
    trainerAgeTo: null,
    trainerExperienceFrom: null,
    trainerGender: null,

    gymRegion: null, // get Id from select
    gymOrganisation: null, //get ID from select
  }

  constructor(private bookingService: BookingService) {
    this.slots = [];
  }

  ngOnInit(): void {
    this.bookingService.getAvailableSlots(this.criteria).subscribe({
      next: (slotsN: Slot[]) => {
        this.slots = slotsN;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        alert(error.message)
      }
    });
  }

  onBookSlot(id: number) {

  }

  updateList(criteria: SlotCriteria) {
    this.criteria = criteria;
    this.bookingService.getAvailableSlots(this.criteria).subscribe({
      next: (slotsN: Slot[]) => {
        this.slots = slotsN;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        alert(error.message)
      }
    });

  }
}
