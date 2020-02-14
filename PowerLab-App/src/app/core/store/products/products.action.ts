import { Action } from '@ngrx/store'
import { ProductModel } from 'src/app/core/store/products/models/ProductModel'
import { ReviewModel } from 'src/app/core/store/products/models/ReviewModel'

export const CREATE_PRODUCTS = '[PRODUCTS] CREATE_PRODUCTS'
export const DELETE_PRODUCT = '[PRODUCTS] DELETE_PRODUCT'
export const GET_ALL = '[PRODUCTS] GET_ALL'
export const ADD_REVIEW = '[PRODUCTS] ADD_REVIEW'
export const LIKE_PRODUCT = '[PRODUCTS] LIKE'
export const UNLIKE_PRODUCT = '[PRODUCTS] UNLIKE'

export class CreateProducts implements Action {
  readonly type: string = CREATE_PRODUCTS

  constructor(public payload: ProductModel) { }
}

export class DeleteProduct implements Action {
  readonly type: string = DELETE_PRODUCT

  constructor(public id: string) {}
}

export class GetAllProducts implements Action {
  readonly type: string = GET_ALL

  constructor(public payload: ProductModel[]) { }

}

export class AddProductReview implements Action {
  readonly type: string = ADD_REVIEW

  constructor(public review: ReviewModel, public productId: string) { }
}

export class LikeProduct implements Action {
  readonly type: string = LIKE_PRODUCT

  constructor(public id: string, public username: string) { }
}

export class UnlikeProduct implements Action {
  readonly type: string = UNLIKE_PRODUCT

  constructor(public id: string, public username: string) { }
}