import {Time} from "@angular/common";

export interface SlotCriteria{
  date: string;
  startTimeFrom: Time;
  startTimeTo: Time;
  specialization: number; //get id from select
  priceFrom: number;
  priceTo: number;
  isIndividual: boolean;

  trainerRank: string; //select
  trainerEducation: string;
  trainerExperienceFrom: number;

  gymRegion:number; // get Id from select
  gymOrganisation: number; //get ID from select
}
