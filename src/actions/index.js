import api from '../api';

export const SEARCH_COMPANY = 'SEARCH_COMPANY';
export const SEARCH_COMPANY_BEGIN = 'SEARCH_COMPANY_BEGIN';
export const SEARCH_COMPANY_SUCCESS = 'SEARCH_COMPANY_SUCCESS';
export const SEARCH_COMPANY_FAIL = 'SEARCH_COMPANY_FAIL';
export const SET_COMPANY_CHOSEN = 'SET_COMPANY_CHOSEN';

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
