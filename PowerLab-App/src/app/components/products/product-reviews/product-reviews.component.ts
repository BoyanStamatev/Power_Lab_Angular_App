import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ReviewModel } from '../../../core/store/products/models/ReviewModel';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { toLocaleString } from 'src/app/core/utils/helper-functions';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  protected reviewForm
  protected toLocaleString = toLocaleString
  @Input() protected reviews: ReviewModel[]
  @Input() private id: string

  constructor(
    protected formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private productsService: ProductsService
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
    this.productsService.addProductReview(formValue, this.id)
    this.reviewForm.reset()
  }

}
