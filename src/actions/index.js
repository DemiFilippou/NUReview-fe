import api from '../api';

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
