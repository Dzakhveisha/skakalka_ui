import {Component, OnInit} from '@angular/core';
import {SkakalkaSubscription} from "../shared/model/SkakalkaSubscription";
import {RefdataService} from "../shared/service/refdata.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-skakalka-price',
  templateUrl: './skakalka-price.component.html',
  styleUrls: ['./skakalka-price.component.css']
})
export class SkakalkaPriceComponent implements OnInit {

  subscriptions: SkakalkaSubscription[] = []

  constructor(private refdataService: RefdataService) {
  }

  ngOnInit(): void {
    this.refdataService.getAllSubscriptionsTypes().subscribe({
        next: (subscriptions: SkakalkaSubscription[]) => {
          this.subscriptions = subscriptions
        },
        error: (err: HttpErrorResponse) => {
          console.log("lol " + err.error.errorMessage + err.error.errorCode)
          alert(err.error.errorMessage)
        }
      }
    )
  }

}
