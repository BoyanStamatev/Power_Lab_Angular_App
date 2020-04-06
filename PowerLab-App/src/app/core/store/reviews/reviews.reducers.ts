import { ReviewsState } from './reviews.state';
import { GET_ALL, ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW, } from './reviews.actions';
import { ReviewModel } from '../../models/ReviewModel';

const intialState: ReviewsState = {
  all: []
}

function getAllReviews(state: ReviewsState, reviews: ReviewModel[]) {
  return Object.assign({}, state, { all: reviews })
}

function addProductReview(state: ReviewsState, review: ReviewModel) {
  return Object.assign({}, state, { all: [...state.all, review] })
}

function deleteProductReview(state: ReviewsState, reviewId: string) {
  return Object.assign({}, state, { all: state.all.filter(r => r._id !== reviewId) })
}

function editProductReview(state: ReviewsState, review: ReviewModel) {
  const allReviewsCopy = state.all.slice()
  const reviews = allReviewsCopy.find(r => r._id === review._id)
  if (reviews) {
    reviews.reviewText = review.reviewText
  }

  return Object.assign({}, state, { all: allReviewsCopy })
}


export function reviewsReducers(state: ReviewsState = intialState, action) {

  switch (action.type) {
    case GET_ALL:
      return getAllReviews(state, action.payload)
    case ADD_REVIEW:
      return addProductReview(state, action.review)
    case DELETE_REVIEW:
      return deleteProductReview(state, action.reviewId)
    case EDIT_REVIEW:
      return editProductReview(state, action.review)
    default:
      return state
  }
}