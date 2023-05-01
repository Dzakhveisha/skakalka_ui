export interface User {
  id: number;
  firstName: string;
  secondName: string;
  login: string;
  birthDate: Date;
  mail: string;
  rate: number | null;
  gender: string;
  roleId: number;
}

export interface UserName {
  id: number;
  firstName: string;
  secondName: string;
}

export enum UserRole {
  CLIENT = 1,
  TRAINER,
  ADMIN
}
