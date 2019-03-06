import api from '../api';
import {snakeCase, mapKeys} from 'lodash';

export const SEARCH_COMPANY_BEGIN = 'SEARCH_COMPANY_BEGIN';
export const SEARCH_COMPANY_SUCCESS = 'SEARCH_COMPANY_SUCCESS';
export const SEARCH_COMPANY_FAIL = 'SEARCH_COMPANY_FAIL';
export const SET_COMPANY_CHOSEN = 'SET_COMPANY_CHOSEN';
export const GET_COMPANY_BEGIN = 'GET_COMPANY_BEGIN';
export const GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
export const GET_COMPANY_FAIL = 'GET_COMPANY_FAIL';
export const GET_POSITIONS_BEGIN = 'GET_POSITIONS_BEGIN';
export const GET_POSITIONS_SUCCESS = 'GET_POSITIONS_SUCCESS';
export const GET_POSITIONS_FAIL = 'GET_POSITIONS_FAIL';
export const GET_TAGS_BEGIN = 'GET_TAGS_BEGIN';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAIL = 'GET_TAGS_FAIL';
export const UPVOTE_BEGIN = 'UPVOTE_BEGIN';
export const UPVOTE_SUCCESS = 'UPVOTE_SUCCESS';
export const UPVOTE_FAIL = 'UPVOTE_FAIL';
export const DOWNVOTE_BEGIN = 'DOWNVOTE_BEGIN';
export const DOWNVOTE_SUCCESS = 'DOWNVOTE_SUCCESS';
export const DOWNVOTE_FAIL = 'DOWNVOTE_FAIL';
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
        dispatch(getCompanyFail(err.message));
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

export const upvote = (reviewId) => {
  return (dispatch) => {
    dispatch(upvoteBegin(reviewId));
    api
      .get(`/reviews/${reviewId}/upvote`)
      .then((res) => {
        dispatch(upvoteSuccess(res.data));
      })
      .catch((err) => {
        dispatch(upvoteFail(err.message));
      });
  };
};

export const upvoteBegin = (reviewId) => ({
  type: UPVOTE_BEGIN,
  reviewId
});

export const upvoteSuccess = (review) => ({
  type: UPVOTE_SUCCESS,
  payload: review
});

export const upvoteFail = (error) => ({
  type: UPVOTE_FAIL,
  payload: {error}
});

export const downvote = (reviewId) => {
  return (dispatch) => {
    dispatch(downvoteBegin(reviewId));
    api
      .get(`/reviews/${reviewId}/downvote`)
      .then((res) => {
        dispatch(downvoteSuccess(res.data));
      })
      .catch((err) => {
        dispatch(downvoteFail(err.message));
      });
  };
};

export const downvoteBegin = (reviewId) => ({
  type: DOWNVOTE_BEGIN,
  reviewId
});

export const downvoteSuccess = (review) => ({
  type: DOWNVOTE_SUCCESS,
  payload: review
});

export const downvoteFail = (error) => ({
  type: DOWNVOTE_FAIL,
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
  //const userId = JSON.parse(atob(localStorage.nureviewtoken.split('.')[1])).user;
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
        dispatch(addReviewFail(err.message));
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
