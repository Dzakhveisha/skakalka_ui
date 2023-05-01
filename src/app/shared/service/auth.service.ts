import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWTToken} from "../model/AccessToken";
import {Observable} from "rxjs";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {User, UserRole} from "../model/User";

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

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
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
      console.log(this.jwtHelper.decodeToken().sub)
      const username = this.jwtHelper.decodeToken().sub;
      return this.http.get<User>(this.usersUrl + username, {headers: this.getHeadersWithAuth()});
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRoleId")
  }

}
