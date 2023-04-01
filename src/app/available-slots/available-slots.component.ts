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
    date: "",
    startTimeFrom:  {hours : 10, minutes:0},
    startTimeTo: {hours : 11, minutes:0},
    specialization: 1, //get id from select
    priceFrom: 10,
    priceTo: 100,
    isIndividual: false,

    trainerRank: "", //select
    trainerEducation: "",
    trainerExperienceFrom: 1,

    gymRegion: 1, // get Id from select
    gymOrganisation: 0 //get ID from select
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
        alert(error)
      }
    });
  }

  onBookSlot(id: number) {

  }
}
