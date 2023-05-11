import {Slot} from "./Slot";
import {User} from "./User";
import {Lesson} from "./Lesson";

export interface LessonReview {
  id: number;
  lesson: Lesson;
  author: User;
  targetUser: User;
  rate: number;
  dateTime: string;
  comment: string;
}
