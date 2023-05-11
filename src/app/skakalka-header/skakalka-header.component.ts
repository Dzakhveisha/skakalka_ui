import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {User, UserRole} from "../shared/model/User";

@Component({
  selector: 'app-skakalka-header',
  templateUrl: './skakalka-header.component.html',
  styleUrls: ['./skakalka-header.component.css']
})
export class SkakalkaHeaderComponent implements OnInit {

  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initUser()
  }

  private initUser() {
    if (this.authService.isAuthenticated()){
      this.authService.getAuthUser().subscribe({
        next: value => this.user = value
      })
    } else {
      this.user = null
    }
  }

  exit() {
    localStorage.removeItem("token");
    this.initUser()
    this.router.navigate([""])
  }

  isUserAuth(): boolean{
    return this.authService.isAuthenticated();
  }

  isUserClient() {
    return this.authService.isAuthenticatedWithRole(UserRole.CLIENT)
  }

  isUserTrainer() {
    return this.authService.isAuthenticatedWithRole(UserRole.TRAINER)
  }
}
