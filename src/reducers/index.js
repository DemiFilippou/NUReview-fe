import {
  SEARCH_COMPANY_BEGIN,
  SEARCH_COMPANY_SUCCESS,
  SEARCH_COMPANY_FAIL,
  SET_COMPANY_CHOSEN,
  GET_COMPANY_BEGIN,
  GET_COMPANY_SUCCESS
} from '../actions';

let initialState = {search: {isLoading: false, companies: []}, company: {}};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COMPANY_BEGIN:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: true
        }
      };
    case SEARCH_COMPANY_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          companies: action.payload
        }
      };
    case SEARCH_COMPANY_FAIL:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false
        }
      };
    case SET_COMPANY_CHOSEN:
      return {
        ...state,
        search: {
          ...state.search,
          companyChosen: action.company
        }
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
