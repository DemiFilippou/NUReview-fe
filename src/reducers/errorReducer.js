import {ADD_REVIEW_SUCCESS, ADD_REVIEW_BEGIN, ADD_REVIEW_FAIL, GET_COMPANY_BEGIN, GET_COMPANY_FAIL} from '../actions';

let initialState = {
  addReview: '',
  getCompany: {code: '', message: ''}
};

const nuReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_FAIL:
      return {...state, error: action.payload.error};
    case ADD_REVIEW_BEGIN:
      return {...state, error: ''};
    case ADD_REVIEW_SUCCESS:
      return {...state, error: ''};
    case GET_COMPANY_BEGIN:
      return {...state, getCompany: initialState.getCompany};
    case GET_COMPANY_FAIL:
      return {
        ...state,
        getCompany: {code: action.payload.error.response.status, message: action.payload.error.message}
      };
    default:
      return state;
  }
};

export default nuReviewReducer;
