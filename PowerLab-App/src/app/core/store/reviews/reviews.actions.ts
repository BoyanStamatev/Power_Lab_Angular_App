import { Action } from '@ngrx/store'
import { ReviewModel } from './models/ReviewModel'

export const GET_ALL = '[REVIEWS] GET_ALL'
export const ADD_REVIEW = '[REVIEWS] ADD_REVIEW'
export const EDIT_REVIEW = '[REVIEWS] EDIT_REVIEW'
export const DELETE_REVIEW = '[REVIEWS] DELETE_REVIEW'

export class GetAllReviews implements Action {
  readonly type: string = GET_ALL

  constructor(public payload: ReviewModel[]) { }
}

export class AddProductReview implements Action {
    readonly type: string = ADD_REVIEW
  
    constructor(public review: ReviewModel, public productId: string) { }
  }
  
  export class EditProductReview implements Action {
    readonly type: string = EDIT_REVIEW
  
    constructor(public review: ReviewModel) { }
  }
  
  export class DeleteProductReview implements Action {
    readonly type: string = DELETE_REVIEW
  
    constructor(public reviewId: string) { }
  }