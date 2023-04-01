import {SkakalkaSubscription} from "./SkakalkaSubscription";

export interface Organisation{
  id: number;
  name: string;
  fullName: string;
  webLink: string;
  contactNumber: string;
  contactMail: string;
  unicBusinessNumber: string;
  subscription: SkakalkaSubscription;
}
