import {Organisation} from "./Organisation";

export interface Gym{
  id: number;
  name: string;
  street: string;
  buildingNumber: string;
  city: string;
  photoPath: string;
  contactNumber: string;
  organisation: Organisation;
  comfortClientsCount: number;
  rate: number;
  cityRegionId: number;
}
