import {Time} from "@angular/common";
import {User} from "./User";
import {Gym} from "./Gym";

export interface Slot{
  id: number;
  trainer: User;
  date: string;
  startTime: Time;
  finishTime:Time;
  gym: Gym;
  specialization: Specialization;
  maxClientCount: number;
  curClientCount:number;
  isDeclined: boolean;
  price: number;
}

export interface Specialization{
  id: number;
  name: string;
  description: string;
}
