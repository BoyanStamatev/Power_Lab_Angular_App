import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { ReviewModel } from 'src/app/core/store/reviews/models/ReviewModel';
import { ReviewsService } from 'src/app/core/services/reviews/reviews.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-product-reviews-edit-modal',
  templateUrl: './product-reviews-edit-modal.component.html',
  styleUrls: ['./product-reviews-edit-modal.component.scss']
})
export class ProductReviewsEditModalComponent extends BaseComponent implements OnInit {

  @Input() private reviewId: string
  protected reviewEditForm
  protected faWindowClose = faWindowClose
  protected reviewX: ReviewModel[]
  private subscription$: Subscription

  constructor(
    protected formBuilder: FormBuilder,
    private reviewsService: ReviewsService,
    protected activeModal: NgbActiveModal,
    private store: Store<AppState>,
  ) {
    super()
  }

  ngOnInit() {

    this.subscription$ = this.store
      .pipe(select(state => state.reviews.all))
      .subscribe(reviews => {
        this.reviewX = reviews.filter(r => r._id === this.reviewId)
      })

    this.subscriptions.push(this.subscription$)

    this.editReview()
  }

  get review() { return this.reviewEditForm.get('review') }

  submitForm() {
    if (this.reviewEditForm.invalid) { return }

    const formValue = this.reviewEditForm.value
    this.reviewsService.editProductReview(this.reviewId, formValue.review)
    this.activeModal.close()
  }

  editReview() {
    this.reviewEditForm = this.formBuilder.group({
      review: [this.reviewX[0].reviewText, [Validators.required, Validators.minLength(4)]]
    })
  }
}

