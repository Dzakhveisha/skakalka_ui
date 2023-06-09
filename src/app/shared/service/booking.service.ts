import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SlotCriteria} from "../model/slotCriteria";
import {NewSlotRequest, Slot} from "../model/Slot";
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

  bookLesson(slotId: number, username: string, warningFlag: boolean | null): Observable<any> {
    let params;
    if (warningFlag != null) {
      params = new HttpParams()
        .set('username', username)
        .append("slotId", slotId)
        .append("skipWarning", warningFlag)
    } else {
      params = new HttpParams()
        .set('username', username)
        .append("slotId", slotId)
    }
    return this.http.request("POST", this.lessonsUrl,
      {
        params: params,
        headers: this.getHeadersWithAuth()
      });
  }

  createLessonRequest(request: LessonRequestCreate): Observable<any> {
    return this.http.request("POST", this.lessonRequestsUrl,
      {body: request, headers: this.getHeadersWithAuth()});

  }

  acceptLessonRequest(requestId: number, price: number): Observable<any> {
    let params = new HttpParams()
      .set('price', price)
    return this.http.request("POST", this.lessonRequestsUrl + "/" + requestId,
      {params: params, headers: this.getHeadersWithAuth()});

  }

  declineLessonRequest(requestId: number): Observable<any> {
    return this.http.request("PUT", this.lessonRequestsUrl + "/" + requestId,
      {headers: this.getHeadersWithAuth()});

  }

  getRequestsForTrainer(trainerId: number): Observable<any> {
    return this.http.request("GET", this.lessonRequestsUrl,
      {
        params: new HttpParams().set('trainerId', trainerId),
        headers: this.getHeadersWithAuth()
      });

  }

  getRequestsForClient(clientId: number): Observable<any> {
    return this.http.request("GET", this.lessonRequestsUrl,
      {
        params: new HttpParams().set('clientId', clientId),
        headers: this.getHeadersWithAuth()
      });
  }

  getRequestsForOrganisation(id: number): Observable<any> {
    return this.http.request("GET", this.lessonRequestsUrl,
      {
        params: new HttpParams().set('trainerId', 1),
        headers: this.getHeadersWithAuth()
      });

  }

  createSlot(slot: NewSlotRequest, skipWarn: boolean): Observable<any> {
    let params = new HttpParams()
      .append("skipWarning", skipWarn)

    return this.http.request("POST", this.slotsUrl,
      {
        body: slot,
        params: params,
        headers: this.getHeadersWithAuth()
      });
  }

  declineSlot(slotId: number): Observable<any> {
    // let params = new HttpParams()
    //   .append("skipWarning", skipWarn)

    return this.http.request("PUT", this.slotsUrl + '/' + slotId,
      {
        // params: params,
        headers: this.getHeadersWithAuth()
      });
  }

  getSlotById(slotId: number): Observable<Slot> {
    return this.http.request<Slot>("GET", this.slotsUrl + '/' + slotId,
      {
        headers: this.getHeadersWithAuth()
      });

  }

  updateSlot(slot: Slot | null, skipWarning: boolean) {
    let params = new HttpParams()
      .append("skipWarning", skipWarning)

    return this.http.request("POST", this.slotsUrl + '/' + slot?.id,
      {
        body: slot,
        params: params,
        headers: this.getHeadersWithAuth()
      });
  }
}
