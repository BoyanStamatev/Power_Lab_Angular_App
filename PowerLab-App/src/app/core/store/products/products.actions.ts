import { Action } from '@ngrx/store'
import { ProductModel } from 'src/app/core/store/products/models/ProductModel'
import { ReviewModel } from '../reviews/models/ReviewModel'

export const GET_ALL = '[PRODUCTS] GET_ALL'
export const CREATE_PRODUCTS = '[PRODUCTS] CREATE_PRODUCTS'
export const DELETE_PRODUCT = '[PRODUCTS] DELETE_PRODUCT'
export const EDIT_PRODUCT = '[PRODUCTS] EDIT_PRODUCT'
export const ADD_REVIEW_ID = '[PRODUCTS] ADD_REVIEW_ID'
export const DELETE_REVIEW_ID = '[PRODUCTS] DELETE_REVIEW_ID'
export const LIKE_PRODUCT = '[PRODUCTS] LIKE'
export const UNLIKE_PRODUCT = '[PRODUCTS] UNLIKE'

export class GetAllProducts implements Action {
  readonly type: string = GET_ALL

  constructor(public payload: ProductModel[]) { }
}

export class CreateProducts implements Action {
  readonly type: string = CREATE_PRODUCTS

  constructor(public payload: ProductModel) { }
}

export class DeleteProduct implements Action {
  readonly type: string = DELETE_PRODUCT

  constructor(public id: string) { }
}

export class EditProduct implements Action {
  readonly type: string = EDIT_PRODUCT

  constructor(public payload: ProductModel) { }
}

export class AddProductReviewId implements Action {
  readonly type: string = ADD_REVIEW_ID

  constructor(public reviewId: string, public productId: string) { }
}

export class DeleteProductReviewId implements Action {
  readonly type: string = DELETE_REVIEW_ID

  constructor(public productId: string, public reviewId: string) { }
}

export class LikeProduct implements Action {
  readonly type: string = LIKE_PRODUCT

  constructor(public id: string, public username: string) { }
}

export class UnlikeProduct implements Action {
  readonly type: string = UNLIKE_PRODUCT

  constructor(public id: string, public username: string) { }
}