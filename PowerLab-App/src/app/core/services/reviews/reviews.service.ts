import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReviewModel } from '../../store/reviews/models/ReviewModel';
import { ResponseDataModel } from '../../models/ResponseDataModel';
import { AddProductReview, DeleteProductReview, GetAllReviews, EditProductReview } from '../../store/reviews/reviews.actions';
import { GetRequestBegin, GetRequestEnd } from '../../store/http/http.actions';
import { AddProductReviewId, DeleteProductReviewId } from '../../store/products/products.actions';

const reviewsUrl = 'http://localhost:5000/reviews/'
const minutes = 1000 * 60 * 5

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviewsCached: boolean = false
  private cacheTime = new Date().getTime()

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private spiner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  getAllReviews() {
    if (this.reviewsCached && (new Date().getTime() - this.cacheTime) < minutes) {
      return
    }
    this.reviewsCached = true
    this.cacheTime = new Date().getTime()

    this.store.dispatch(new GetRequestBegin())

    this.http.get<ReviewModel[]>(`${reviewsUrl}all`)
    .subscribe(reviews => {
      
      this.reviewsCached = true
      this.cacheTime = new Date().getTime()
      this.store.dispatch(new GetAllReviews(reviews))
      this.store.dispatch(new GetRequestEnd())
    })
  }
  
  addProductReview(model: ReviewModel, powerId: string) {
    this.spiner.show()
    this.http.post(`${reviewsUrl}create/${powerId}`, model)
    .subscribe((res: ResponseDataModel) => {
      this.store.dispatch(new AddProductReviewId(res.data._id, powerId))
      this.store.dispatch(new AddProductReview(res.data, powerId))
      this.spiner.hide()
      this.toastr.success('Review added successfully.')
    })
  }

  editProductReview(reviewId: string, reviewText: string) {
    this.spiner.show()
    this.http.post(`${reviewsUrl}edit/${reviewId}`, {reviewText})
    .subscribe((res: ResponseDataModel) => {
      
      this.store.dispatch(new EditProductReview(res.data))
      this.spiner.hide()
      this.toastr.success('Review edited successfully.')
    })
  }

  deleteProductReview(productId: string, reviewId: string) {
    this.spiner.show()
    this.http.delete(`${reviewsUrl}delete/${productId}/${reviewId}`)
    .subscribe((res: ResponseDataModel) => {
      this.store.dispatch(new DeleteProductReviewId(productId, reviewId))
      this.store.dispatch(new DeleteProductReview(reviewId))
      this.spiner.hide()
      this.toastr.success('Review deleted successfully.')
    })
  }
}
