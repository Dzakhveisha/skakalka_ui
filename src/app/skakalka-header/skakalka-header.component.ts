import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";

@Component({
  selector: 'app-skakalka-header',
  templateUrl: './skakalka-header.component.html',
  styleUrls: ['./skakalka-header.component.css']
})
export class SkakalkaHeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  exit() {
    localStorage.removeItem("token");
    this.router.navigate([""])
  }

  isUserAuth(): boolean{
    return this.authService.isAuthenticated();
  }

}
