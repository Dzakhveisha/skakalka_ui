import {Time} from "@angular/common";

export interface SlotCriteria{
  date: string | null;
  startTimeFrom: string | null;
  startTimeTo: string | null;
  specialization: number | null; //get id from select
  priceFrom: number | null;
  priceTo: number | null;
  isIndividual: boolean;

  trainerExperienceFrom: number | null;
  trainerGender: string | null;
  trainerAgeFrom: string | null;
  trainerAgeTo: string | null;

  gymOrganisation: number | null; //get ID from select
  gymRegion: number | null; // get Id from select
}
