import {User} from "./User";

export interface NewChatMessage {
  id: number | null;
  from: string;
  to: string;
  dateTime: string;
  message: string;
}

export interface ChatMessage {
  id: number | null;
  from: User | null | undefined;
  to: User | undefined;
  dateTime: string;
  message: string;
}
