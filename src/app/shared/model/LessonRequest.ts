import {User} from "./User";
import {Gym} from "./Gym";
import {Specialization} from "./Slot";
import {LessonStatus} from "./Lesson";

export interface LessonRequest{
  id: number;
  status: number;
  comment: string;
  date: string;
  startTime: string;
  finishTime:string;
  trainer: User;
  owner: User;
  gym: Gym;
  specialization: Specialization;
}

export interface LessonRequestCreate{
  comment: string | null;
  date: string | null;
  startTime: string | null;
  finishTime:string | null;
  trainerId: number | null;
  username: string | null;
  gymId: number | null;
  specializationId: number | null;
}

const requestStatuses = [
  {
    id: 1,
    name: 'Ожидает ответа'
  },
  {
    id: 2,
    name: 'Подтверждено'
  },
  {
    id: 3,
    name: 'Отклонено'
  }
];

export function getRequestStatusById(id: number | undefined) {
  console.log(id)
  return requestStatuses.find(s => {
    return s.id == id;
  })?.name
}
