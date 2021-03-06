import api from '../api';
import {snakeCase, mapKeys} from 'lodash';

export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_BEGIN = 'REGISTER_BEGIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const SEARCH_COMPANY_BEGIN = 'SEARCH_COMPANY_BEGIN';
export const SEARCH_COMPANY_SUCCESS = 'SEARCH_COMPANY_SUCCESS';
export const SEARCH_COMPANY_FAIL = 'SEARCH_COMPANY_FAIL';
export const SET_COMPANY_CHOSEN = 'SET_COMPANY_CHOSEN';
export const GET_COMPANY_BEGIN = 'GET_COMPANY_BEGIN';
export const GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
export const GET_COMPANY_FAIL = 'GET_COMPANY_FAIL';
export const GET_REVIEWS_BEGIN = 'GET_REVIEWS_BEGIN';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
export const GET_REVIEWS_FAIL = 'GET_REVIEWS_FAIL';
export const GET_POSITIONS_BEGIN = 'GET_POSITIONS_BEGIN';
export const GET_POSITIONS_SUCCESS = 'GET_POSITIONS_SUCCESS';
export const GET_POSITIONS_FAIL = 'GET_POSITIONS_FAIL';
export const GET_TAGS_BEGIN = 'GET_TAGS_BEGIN';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAIL = 'GET_TAGS_FAIL';
export const VOTE_BEGIN = 'VOTE_BEGIN';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAIL = 'VOTE_FAIL';
export const ADD_POSITION_BEGIN = 'ADD_POSITION_BEGIN';
export const ADD_POSITION_SUCCESS = 'ADD_POSITION_SUCCESS';
export const ADD_POSITION_FAIL = 'ADD_POSITION_FAIL';
export const ENTER_POSITION = 'ENTER_POSITION';
export const ENTER_SEMESTER = 'ENTER_SEMESTER';
export const ENTER_YEAR = 'ENTER_YEAR';
export const TOGGLE_ANONYMOUS = 'TOGGLE_ANONYMOUS';
export const ENTER_WAGE = 'ENTER_WAGE';
export const ENTER_ENJOYMENT = 'ENTER_ENJOYMENT';
export const ENTER_LEARNING = 'ENTER_LEARNING';
export const ENTER_RECOMMEND = 'ENTER_RECOMMEND';
export const ENTER_BODY = 'ENTER_BODY';
export const SELECT_TAG = 'SELECT_TAG';
export const SET_COMPANY_ID = 'SET_COMPANY_ID';
export const CLEAR_NEW_REVIEW_FORM = 'CLEAR_NEW_REVIEW_FORM';
export const ADD_REVIEW_BEGIN = 'ADD_REVIEW_BEGIN';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAIL = 'ADD_REVIEW_FAIL';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';

export const login = (loginInfo) => {
  return (dispatch) => {
    dispatch(loginBegin(loginInfo));
    api
      .post('/login', {user: loginInfo})
      .then((res) => {
        localStorage.setItem('nureviewtoken', res.data.token);
        api.defaults.headers['Authorization'] = res.data.token;
        dispatch(loginSuccess(res.data));
      })
      .catch((err) => {
        const errorMsgs = err.response && err.response.data && err.response.data.message;
        dispatch(loginFail(errorMsgs));
      });
  };
};

export const loginBegin = (userInfo) => ({
  type: LOGIN_BEGIN,
  userInfo
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: {error}
});

export const register = (registerInfo) => {
  return (dispatch) => {
    dispatch(registerBegin(registerInfo));
    api
      .post('/users', {user: registerInfo})
      .then((res) => {
        localStorage.setItem('nureviewtoken', res.data.token);
        api.defaults.headers['Authorization'] = res.data.token;
        dispatch(registerSuccess(res.data));
      })
      .catch((err) => {
        const errorMsgs = err.response && err.response.data && err.response.data.message;
        dispatch(registerFail(errorMsgs));
      });
  };
};

export const registerBegin = (userInfo) => ({
  type: REGISTER_BEGIN,
  userInfo
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerFail = (error) => ({
  type: REGISTER_FAIL,
  payload: {error}
});

export const searchCompany = (query) => {
  return (dispatch) => {
    dispatch(searchCompanyBegin(query));
    api
      .get(`search?query=${query}`)
      .then((res) => {
        dispatch(searchCompanySuccess(res.data));
      })
      .catch((err) => {
        dispatch(searchCompanyFail(err.message));
      });
  };
};

export const searchCompanyBegin = (query) => ({
  type: SEARCH_COMPANY_BEGIN,
  query
});

export const searchCompanySuccess = (companies) => ({
  type: SEARCH_COMPANY_SUCCESS,
  payload: companies
});

export const searchCompanyFail = (error) => ({
  type: SEARCH_COMPANY_FAIL,
  payload: {error}
});

export const setCompanyChosen = (company) => ({
  type: SET_COMPANY_CHOSEN,
  company
});

export const getCompany = (id) => {
  return (dispatch) => {
    dispatch(getCompanyBegin(id));
    api
      .get(`/companies/${id}`)
      .then((res) => {
        dispatch(getCompanySuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCompanyFail(err));
      });
  };
};

export const getCompanyBegin = (companyId) => ({
  type: GET_COMPANY_BEGIN,
  companyId
});

export const getCompanySuccess = (company) => ({
  type: GET_COMPANY_SUCCESS,
  payload: company
});

export const getCompanyFail = (error) => ({
  type: GET_COMPANY_FAIL,
  payload: {error}
});

export const getReviews = (companyId, filters) => {
  let path = `/companies/${companyId}/reviews`;
  if (filters.positionId) path += `?position_id=${filters.positionId}`;

  return (dispatch) => {
    dispatch(getReviewsBegin(companyId, filters));
    api
      .get(path)
      .then((res) => {
        dispatch(getReviewsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getReviewsFail(err));
      });
  };
};

export const getReviewsBegin = (companyId, filters) => ({
  type: GET_REVIEWS_BEGIN,
  companyId,
  filters
});

export const getReviewsSuccess = (reviews) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: reviews
});

export const getReviewsFail = (error) => ({
  type: GET_REVIEWS_FAIL,
  payload: {error}
});

export const getPositions = () => {
  return (dispatch) => {
    dispatch(getPositionsBegin());
    api
      .get('/positions/')
      .then((res) => {
        dispatch(getPositionsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPositionsFail(err.message));
      });
  };
};

export const getPositionsBegin = () => ({
  type: GET_POSITIONS_BEGIN
});

export const getPositionsSuccess = (positions) => ({
  type: GET_POSITIONS_SUCCESS,
  payload: positions
});

export const getPositionsFail = (error) => ({
  type: GET_POSITIONS_FAIL,
  payload: {error}
});

export const getTags = () => {
  return (dispatch) => {
    dispatch(getTagsBegin());
    api
      .get('/tags/')
      .then((res) => {
        dispatch(getTagsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getTagsFail(err.message));
      });
  };
};

export const getTagsBegin = () => ({
  type: GET_TAGS_BEGIN
});

export const getTagsSuccess = (tags) => ({
  type: GET_TAGS_SUCCESS,
  payload: tags
});

export const getTagsFail = (error) => ({
  type: GET_TAGS_FAIL,
  payload: {error}
});

export const vote = (reviewId, value) => {
  return (dispatch) => {
    dispatch(voteBegin(reviewId, value));
    api
      .post('/votes', {value: value, review_id: reviewId})
      .then((res) => {
        dispatch(voteSuccess(res.data));
      })
      .catch((err) => {
        dispatch(voteFail(err.message));
      });
  };
};

export const voteBegin = (reviewId, value) => ({
  type: VOTE_BEGIN,
  reviewId,
  value
});

export const voteSuccess = (review) => ({
  type: VOTE_SUCCESS,
  payload: review
});

export const voteFail = (error) => ({
  type: VOTE_FAIL,
  payload: {error}
});

export const addPosition = (title) => {
  return (dispatch) => {
    dispatch(addPositionBegin(title));
    api
      .post('/positions', {position: {title}})
      .then((res) => {
        dispatch(addPositionSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addPositionFail(err.message));
      });
  };
};

export const addPositionBegin = (title) => ({
  type: ADD_POSITION_BEGIN,
  position: title
});

export const addPositionSuccess = (position) => ({
  type: ADD_POSITION_SUCCESS,
  payload: position
});

export const addPositionFail = (error) => ({
  type: ADD_POSITION_FAIL,
  payload: {error}
});

export const enterPosition = (positionId) => ({
  type: ENTER_POSITION,
  positionId
});

export const enterSemester = (semester) => ({
  type: ENTER_SEMESTER,
  semester
});

export const enterYear = (year) => ({
  type: ENTER_YEAR,
  year
});

export const toggleAnonymous = () => ({
  type: TOGGLE_ANONYMOUS
});

export const enterWage = (wage) => ({
  type: ENTER_WAGE,
  wage
});

export const enterBody = (body) => ({
  type: ENTER_BODY,
  body
});

export const enterEnjoyment = (enjoyment) => ({
  type: ENTER_ENJOYMENT,
  enjoyment
});

export const enterLearning = (learning) => ({
  type: ENTER_LEARNING,
  learning
});

export const enterRecommend = (recommend) => ({
  type: ENTER_RECOMMEND,
  recommend
});

export const clearNewReviewForm = () => ({
  type: CLEAR_NEW_REVIEW_FORM
});

export const selectTag = (tagId) => ({
  type: SELECT_TAG,
  tagId
});

export const setCompanyId = (companyId) => ({
  type: SET_COMPANY_ID,
  companyId
});

export const addReview = (review) => {
  const reviewFormatted = {
    review: mapKeys(review, (v, k) => {
      return snakeCase(k);
    })
  };
  return (dispatch) => {
    dispatch(addReviewBegin(review));
    api
      .post('reviews', reviewFormatted)
      .then((res) => {
        dispatch(addReviewSuccess(res.data));
      })
      .catch((err) => {
        const errorMsgs = err.response && err.response.data && err.response.data.errors;
        const errorMsg = errorMsgs && errorMsgs.length ? errorMsgs.join() : 'Sorry, something went wrong.';
        dispatch(addReviewFail(errorMsg));
      });
  };
};

export const addReviewBegin = (review) => ({
  type: ADD_REVIEW_BEGIN,
  position: review
});

export const addReviewSuccess = (position) => ({
  type: ADD_REVIEW_SUCCESS,
  payload: position
});

export const addReviewFail = (error) => ({
  type: ADD_REVIEW_FAIL,
  payload: {error}
});

export const setSuccessMessage = (msg) => ({
  type: SET_SUCCESS_MESSAGE,
  msg
});
