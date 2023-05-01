import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specialization} from "../model/Slot";
import {CityRegion, Gym} from "../model/Gym";
import {OrganisationName} from "../model/Organisation";
import {SkakalkaSubscription} from "../model/SkakalkaSubscription";

@Injectable({
  providedIn: 'root'
})
export class RefdataService {

  private specializationsUrl: string = 'http://localhost:8080/api/v1/specializations';
  private cityRegionsUrl: string = 'http://localhost:8080/api/v1/cityRegions';
  private organisationsNamesUrl: string = 'http://localhost:8080/api/v1/organisations/names';
  private subscriptionsTypesUrl: string= 'http://localhost:8080/api/v1/subscriptionTypes';
  private gymsUrl: string= 'http://localhost:8080/api/v1/gyms';

  private getHeadersWithAuth(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllSpecializations(): Observable<Specialization[]> {
    return this.http.request<Specialization[]>("GET", this.specializationsUrl, {headers: this.getHeadersWithAuth()});
  }

  getAllCityRegions(): Observable<CityRegion[]> {
    return this.http.request<CityRegion[]>("GET", this.cityRegionsUrl, {headers: this.getHeadersWithAuth()});
  }

  getAllOrgNames(): Observable<OrganisationName[]> {
    return this.http.request<OrganisationName[]>("GET", this.organisationsNamesUrl, {headers: this.getHeadersWithAuth()});
  }

  getAllSubscriptionsTypes(): Observable<any> {
    return this.http.request<any>("GET", this.subscriptionsTypesUrl, {headers: this.getHeadersWithAuth()});
  }

  getAllGyms(): Observable<Gym[]> {
  return this.http.request<Gym[]>("GET", this.gymsUrl, {headers: this.getHeadersWithAuth()});
}
}
