import {Component, OnInit} from '@angular/core';
import {NewLessonReview} from "../shared/model/LessonReview";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {BookingService} from "../shared/service/booking.service";

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {

  review: NewLessonReview = {
    lessonId: null,
    rate: 5,
    comment: null,
    targetUserId: null,
    authorId: null
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private authService: AuthService, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.review.lessonId = params['lessonId'];
      this.review.targetUserId = params['userId'];
      this.authService.getAuthUser().subscribe({
        next: value => this.review.authorId = value.id
      })
    })
  }

  onSubmit() {
    this.authService.createReview(this.review).subscribe({
      next: value => {
        alert("Отзыв успешно создан")
        this.router.navigateByUrl("/")
      },
      error: (err) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    })
  }
}
