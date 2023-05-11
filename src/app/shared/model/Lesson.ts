import {Slot} from "./Slot";
import {User} from "./User";

export interface Lesson {
  id: number;
  slot: Slot;
  client: User;
  statusId: number;
}

export interface LessonStatus {
  id: number;
  name: string;
}

const lessonStatuses: LessonStatus[] = [
  {
    id: 1,
    name: 'Запланировано'
  },
  {
    id: 2,
    name: 'В процессе'
  },
  {
    id: 3,
    name: 'Завершено'
  },
  {
    id: 4,
    name: 'Отменено'
  },
];

export function getLessonStatusById(id: number | undefined) {
  console.log(id)
  return lessonStatuses.find(s => {
    return s.id == id;
  })?.name
}

