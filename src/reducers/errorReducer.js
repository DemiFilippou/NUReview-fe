import {ADD_REVIEW_SUCCESS, ADD_REVIEW_BEGIN, ADD_REVIEW_FAIL} from '../actions';

let initialState = {
  addReview: ''
};

const nuReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_FAIL:
      return {...state, error: action.payload.error};
    case ADD_REVIEW_BEGIN:
      return {...state, error: ''};
    case ADD_REVIEW_SUCCESS:
      return {...state, error: ''};
    default:
      return state;
  }
};

export default nuReviewReducer;
