import {
  LOGIN_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_FAIL,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_BEGIN,
  ADD_REVIEW_FAIL,
  GET_COMPANY_BEGIN,
  GET_COMPANY_FAIL
} from '../actions';

let initialState = {
  addReview: '',
  getCompany: {code: '', message: ''},
  login: [],
  register: []
};

const nuReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAIL:
      return {...state, login: action.payload.error};
    case LOGIN_BEGIN:
    case LOGIN_SUCCESS:
      return {...state, login: []};
    case REGISTER_FAIL:
      return {...state, register: action.payload.error};
    case REGISTER_BEGIN:
    case REGISTER_SUCCESS:
      return {...state, register: []};
    case ADD_REVIEW_FAIL:
      return {...state, addReview: action.payload.error};
    case ADD_REVIEW_BEGIN:
      return {...state, addReview: ''};
    case ADD_REVIEW_SUCCESS:
      return {...state, addReview: ''};
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
