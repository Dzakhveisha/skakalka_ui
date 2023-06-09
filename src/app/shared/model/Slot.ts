import {Time} from "@angular/common";
import {User} from "./User";
import {Gym} from "./Gym";

export interface Slot{
  id: number;
  trainer: User;
  date: string;
  startTime: string;
  finishTime:string;
  gym: Gym;
  specialization: Specialization;
  maxClientCount: number;
  curClientCount:number;
  declined: boolean;
  price: number;
}

export interface NewSlotRequest{
  trainerId: number;
  date: string;
  startTime: string | null;
  finishTime:string | null;
  gymId: number;
  specializationId: number;
  maxClientCount: number;
  price: number;
}

export interface Specialization{
  id: number;
  name: string;
  description: string;
}
