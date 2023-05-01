import {Organisation} from "./Organisation";
import {User} from "./User";
import {Gym} from "./Gym";
import {Specialization} from "./Slot";

export interface Trainer {
  id: number | null;
  organisation: Organisation | null;
  user: User | null;
  defaultClientsCount: number | null;
  defaultGym: Gym | null;
  phoneNumber: string | null;
  experience: number | null;
  education: string | null;
  rank: string | null;
  readOnlyPermission: boolean | null;

  specializations: Specialization[];
}
