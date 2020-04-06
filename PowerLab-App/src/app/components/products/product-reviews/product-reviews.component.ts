import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ReviewModel } from '../../../core/models/ReviewModel';
import { toLocaleString } from 'src/app/core/utils/helper-functions';
import { animations } from './product-reviews.animations';
import { ReviewsService } from 'src/app/core/services/reviews/reviews.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProductReviewsEditModalComponent } from '../product-reviews-edit-modal/product-reviews-edit-modal.component';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  animations: animations
})
export class ProductReviewsComponent implements OnInit {

  @Input() protected reviews: ReviewModel[]
  @Input() protected productId: string
  protected reviewId: string
  protected reviewForm
  protected toLocaleString = toLocaleString

  constructor(
    protected authService: AuthenticationService,
    private modalService: NgbModal,
    protected formBuilder: FormBuilder,
    private reviwesService: ReviewsService
  ) { }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      review: ['', [Validators.required, Validators.minLength(4)]]
    })

  }

  get review() { return this.reviewForm.get('review') }

  submitForm() {
    if (this.reviewForm.invalid) {return}

    const formValue = this.reviewForm.value
    this.reviwesService.addProductReview(formValue, this.productId)
    this.reviewForm.reset()
  }

  deleteReview(reviewId: string) {
    this.reviwesService.deleteProductReview(this.productId, reviewId)
  }

  openEditReviewModal(reviewId: string) {

    const loginRef = this.modalService.open(ProductReviewsEditModalComponent)
    loginRef.componentInstance.reviewId = reviewId;
    loginRef.result.then(res => {
      // console.log(res);
    }).catch(err => {
      console.log('(f)openEditReviewModal: ', err);
    })
  }

}
