import { ProductsState } from "./products.state";
import {
  GET_ALL, CREATE_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT,
  LIKE_PRODUCT, UNLIKE_PRODUCT, ADD_REVIEW_ID, DELETE_REVIEW_ID
} from './products.actions';
import { ProductModel } from 'src/app/core/store/products/models/ProductModel';


const initialState: ProductsState = {
  all: []
}

function getAllProducts(state: ProductsState, products: ProductModel[]) {
  return Object.assign({}, state, { all: products })
}

function createProducts(state: ProductsState, product: ProductModel) {
  return Object.assign({}, state, { all: [...state.all, product] })
}

function deleteProduct(state: ProductsState, id: string) {

  return Object.assign({}, state, {
    all: state.all.filter(p => p._id !== id)
  })
}

function editProduct(state: ProductsState, product: ProductModel) {
  return Object.assign({}, state,
    { all: [...state.all.filter(p => p._id !== product._id), product] })
}

function addReviewId(state: ProductsState, reviewId: string, productId: string) {
  const allProductsCopy = state.all.slice()
  const product = allProductsCopy.find(p => p._id === productId)
  if (product) {
    product.reviews.push(reviewId)
  }

  return Object.assign({}, state, { all: allProductsCopy })
}

function deleteReviewId(state: ProductsState, productId: string, reviewId: string) {
  const allProductsCopy = state.all.slice()
  const product = allProductsCopy.find(p => p._id === productId)
  if (product) {
    product.reviews = product.reviews.filter(r => r !== reviewId)
  }

  return Object.assign({}, state, { all: allProductsCopy })
}

function likeProduct(state: ProductsState, id: string, username: string) {
  const allProductsCopy = state.all.slice()
  const product = allProductsCopy.find(p => p._id === id)
  if (product) {
    product.likes.push(username)
  }

  return Object.assign({}, state, { all: allProductsCopy })
}

function unlikeProduct(state: ProductsState, id: string, username: string) {
  const allProductsCopy = state.all.slice()
  const product = allProductsCopy.find(p => p._id === id)
  if (product) {
    product.likes = product.likes.filter(u => u !== username)
  }

  return Object.assign({}, state, { all: allProductsCopy })
}

export function productsReducer(state: ProductsState = initialState, action) {

  switch (action.type) {
    case GET_ALL:
      return getAllProducts(state, action.payload)
    case CREATE_PRODUCTS:
      return createProducts(state, action.payload)
    case DELETE_PRODUCT:
      return deleteProduct(state, action.id)
    case EDIT_PRODUCT:
      return editProduct(state, action.payload)
    case ADD_REVIEW_ID:
      return addReviewId(state, action.reviewId, action.productId)
      case DELETE_REVIEW_ID:
      return deleteReviewId(state, action.productId, action.reviewId)
    case LIKE_PRODUCT:
      return likeProduct(state, action.id, action.username)
    case UNLIKE_PRODUCT:
      return unlikeProduct(state, action.id, action.username)
    default:
      return state
  }
}

