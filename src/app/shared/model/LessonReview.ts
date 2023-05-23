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

export interface NewLessonReview {
  lessonId: number | null;
  authorId: number | null;
  targetUserId: number | null;
  rate: number | null;
  comment: string | null;
}
