import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Slot, Specialization} from "../model/Slot";
import {Trainer} from "../model/TrainerInfo";
import {TrainerCriteria} from "../model/TrainerCriteria";
import {Lesson} from "../model/Lesson";
import {UserName} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private trainersUrl = 'http://localhost:8080/api/v1/trainers'
  private usersUrl = 'http://localhost:8080/api/v1/users/'

  private getHeadersWithAuth(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllTrainers(findCriteria: TrainerCriteria): Observable<Trainer[]> {
    return this.http.request<Trainer[]>("PUT", this.trainersUrl, {body: findCriteria, headers: this.getHeadersWithAuth()});
  }

  getTrainerById(id: number): Observable<any> {
    return this.http.request<Trainer>("GET", this.trainersUrl + '/' + id, { headers: this.getHeadersWithAuth()});
  }

  getTrainerSlots(id: number): Observable<any> {
    return this.http.request<Slot[]>("GET", this.trainersUrl + '/' + id + '/lessons', { headers: this.getHeadersWithAuth()});
  }

  getTrainerIdByUserId(id: number): Observable<any> {
    return this.http.request<Trainer>("GET", 'http://localhost:8080/api/v1/users/' + id + '/trainer', { headers: this.getHeadersWithAuth()});
  }

  getAllTrainersNames(): Observable<any> {
    return this.http.request<UserName[]>("GET", this.trainersUrl + '/names', {headers: this.getHeadersWithAuth()});
  }
}
