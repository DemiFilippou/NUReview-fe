import {SEARCH_COMPANY_BEGIN, SEARCH_COMPANY_SUCCESS, SEARCH_COMPANY_FAIL, SET_COMPANY_CHOSEN} from '../actions';

let initialState = {isLoading: false, companies: []};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COMPANY_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case SEARCH_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: action.payload
      };
    case SEARCH_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case SET_COMPANY_CHOSEN:
      return {
        ...state,
        companyChosen: action.company
      };
    default:
      return state;
  }
};

export default reducer;
