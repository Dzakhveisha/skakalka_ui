import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {JWTToken} from "../model/AccessToken";
import {SlotCriteria} from "../model/slotCriteria";
import {Slot} from "../model/Slot";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private slotsUrl: string = 'http://localhost:8080/api/v1/slots';

  private getHeadersWithAuth(): HttpHeaders{
    return new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")})
  };

  constructor(private http: HttpClient) {
  }

  getAvailableSlots(slotCriteria: SlotCriteria): Observable<Slot[]> {
    console.log(slotCriteria)
    return this.http.request<Slot[]>("PUT",this.slotsUrl, {body: slotCriteria, headers: this.getHeadersWithAuth()});
  }

}
