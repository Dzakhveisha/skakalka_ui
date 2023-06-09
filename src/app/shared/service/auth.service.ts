import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWTToken} from "../model/AccessToken";
import {Observable} from "rxjs";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {User, UserRole} from "../model/User";
import {TextChatService} from "./text-chat.service";
import {LessonReview, NewLessonReview} from "../model/LessonReview";
import {NewUser} from "../model/NewUser";
import {Slot} from "../model/Slot";
import {Trainer} from "../model/TrainerInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  private getHeadersWithAuth(): HttpHeaders{
    return new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")})
  };


  private loginUrl = 'http://localhost:8080/api/v1/auth/authenticate';
  private registerUrl = 'http://localhost:8080/api/v1/auth/register';
  private usersUrl = 'http://localhost:8080/api/v1/users/';
  private reviewsUrl = 'http://localhost:8080/api/v1/users/lessonReviews';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private chatService: TextChatService) {
  }

  authenticate(credentials: { login: any; password: any; }): Observable<JWTToken> {
    return this.http.post<JWTToken>(this.loginUrl, credentials, {headers: this.httpHeaders});
  }

  register(newUserRequest: any): Observable<JWTToken> {
    return this.http.post<JWTToken>(this.registerUrl, newUserRequest, {headers: this.httpHeaders});
  }

  isAuthenticated() {
    return !this.jwtHelper.isTokenExpired();
  }

  isAuthenticatedWithRole( role: UserRole) {
    if (!this.jwtHelper.isTokenExpired()) {
      return Number(localStorage.getItem("userRoleId")) == role.valueOf()
    }
    return false;
  }

  getAuthUser(): Observable<User> {
      const username = this.jwtHelper.decodeToken().sub;
      return this.http.get<User>(this.usersUrl + username, {headers: this.getHeadersWithAuth()});
  }

  getUser(login: string): Observable<User> {
      return this.http.get<User>(this.usersUrl + login, {headers: this.getHeadersWithAuth()});
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRoleId")
    this.chatService.disconnect()
  }

  initWS() {
    this.chatService.initializeWebSocketConnection()
  }

  createReview(review: NewLessonReview): Observable<any> {
    return this.http.request("POST", this.reviewsUrl,
      { body: review, headers: this.getHeadersWithAuth()});
  }

  updateClient(updatedUser: NewUser, id: number | undefined):Observable<any> {
    console.log(updatedUser)
    return this.http.request<Slot[]>("PUT", this.usersUrl + "clients/" + id, {body: updatedUser, headers: this.getHeadersWithAuth()});

  }

  updateTrainer(trainer: Trainer, id: number | undefined):Observable<any> {
    console.log(trainer)
    return this.http.request<Slot[]>("PUT", this.usersUrl + "trainers/" + id, {body: trainer, headers: this.getHeadersWithAuth()});

  }
}
