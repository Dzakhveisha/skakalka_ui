import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SlotCriteria} from "../model/slotCriteria";
import {Slot} from "../model/Slot";
import {Lesson} from "../model/Lesson";
import {LessonRequestCreate} from "../model/LessonRequest";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private slotsUrl: string = 'http://localhost:8080/api/v1/slots';
  private lessonsUrl: string = 'http://localhost:8080/api/v1/lessons';
  private lessonRequestsUrl: string = 'http://localhost:8080/api/v1/lessonRequests';

  private getHeadersWithAuth(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    })
  };

  constructor(private http: HttpClient) {
  }

  getAvailableSlots(slotCriteria: SlotCriteria): Observable<Slot[]> {
    console.log(slotCriteria)
    return this.http.request<Slot[]>("PUT", this.slotsUrl, {body: slotCriteria, headers: this.getHeadersWithAuth()});
  }

  getLessonsOfUser(username: string): Observable<Lesson[]> {
    return this.http.request<Lesson[]>("GET", this.lessonsUrl, {
      params: new HttpParams().set('username', username),
      headers: this.getHeadersWithAuth()
    });
  }

  cancelLesson(lessonId: number, username: string): Observable<boolean> {
    return this.http.request<boolean>("PUT", this.lessonsUrl + '/' + lessonId, {
      params: new HttpParams().set('username', username),
      headers: this.getHeadersWithAuth()
    });
  }

  bookLesson(slotId: number, username: string): Observable<any> {
    return this.http.request("POST", this.lessonsUrl,
      {
        params: new HttpParams().set('username', username).append("slotId", slotId),
        headers: this.getHeadersWithAuth()
      });
  }

  createLessonRequest(request: LessonRequestCreate): Observable<any> {
    return this.http.request("POST", this.lessonRequestsUrl,
      {body: request, headers: this.getHeadersWithAuth()});

  }
}
