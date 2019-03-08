import {
  SEARCH_COMPANY_BEGIN,
  SEARCH_COMPANY_SUCCESS,
  SEARCH_COMPANY_FAIL,
  SET_COMPANY_CHOSEN,
  GET_COMPANY_SUCCESS,
  GET_POSITIONS_SUCCESS,
  GET_TAGS_SUCCESS,
  VOTE_SUCCESS,
  ADD_POSITION_SUCCESS,
  ENTER_POSITION,
  ENTER_SEMESTER,
  ENTER_YEAR,
  TOGGLE_ANONYMOUS,
  ENTER_WAGE,
  ENTER_ENJOYMENT,
  ENTER_LEARNING,
  ENTER_RECOMMEND,
  ENTER_BODY,
  SELECT_TAG,
  SET_COMPANY_ID,
  CLEAR_NEW_REVIEW_FORM,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_BEGIN,
  ADD_REVIEW_FAIL,
  SET_SUCCESS_MESSAGE
} from '../actions';
import newReviewTemplate from '../newReviewTemplate';
import {xor} from 'lodash';

let initialState = {
  search: {isLoading: false, companies: []},
  company: {},
  positions: [],
  tags: [],
  newReview: newReviewTemplate,
  error: '',
  successMessage: ''
};

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
        company: {...action.payload}
      };
    case GET_POSITIONS_SUCCESS:
      return {
        ...state,
        positions: action.payload
      };
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload
      };
    case VOTE_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          reviews: state.company.reviews.map((review) =>
            review.id === action.payload.review_id
              ? {
                  ...review,
                  user_vote: action.payload.value,
                  score: action.payload.review.score
                }
              : review
          )
        }
      };
    case SELECT_TAG:
      return {
        ...state,
        tags: state.tags.map((tag) => (tag.id === action.tagId ? {...tag, isSelected: !tag.isSelected} : tag)),
        newReview: {...state.newReview, tagIds: xor(state.newReview.tagIds, [action.tagId])}
      };
    case SET_COMPANY_ID:
      return {...state, newReview: {...state.newReview, companyId: action.companyId}};
    case ADD_POSITION_SUCCESS:
      return {
        ...state,
        positions: [action.payload, ...state.positions],
        newReview: {...state.newReview, positionId: action.payload.id}
      };
    case ENTER_POSITION:
      return {
        ...state,
        newReview: {...state.newReview, positionId: action.positionId}
      };
    case ENTER_SEMESTER:
      return {
        ...state,
        newReview: {...state.newReview, semester: action.semester}
      };
    case ENTER_YEAR:
      return {
        ...state,
        newReview: {...state.newReview, year: action.year}
      };
    case ENTER_WAGE:
      return {
        ...state,
        newReview: {...state.newReview, wage: action.wage}
      };
    case TOGGLE_ANONYMOUS:
      return {
        ...state,
        newReview: {...state.newReview, anonymous: !state.newReview.anonymous}
      };
    case ENTER_ENJOYMENT:
      return {
        ...state,
        newReview: {...state.newReview, enjoyment: action.enjoyment}
      };
    case ENTER_LEARNING:
      return {
        ...state,
        newReview: {...state.newReview, learning: action.learning}
      };
    case ENTER_RECOMMEND:
      return {
        ...state,
        newReview: {...state.newReview, recommend: action.recommend}
      };
    case ENTER_BODY:
      return {
        ...state,
        newReview: {...state.newReview, body: action.body}
      };
    case CLEAR_NEW_REVIEW_FORM:
      return {
        ...state,
        newReview: newReviewTemplate
      };
    case ADD_REVIEW_FAIL:
      return {...state, error: action.payload.error, successMessage: ''};
    case ADD_REVIEW_BEGIN:
      return {...state, error: ''};
    case ADD_REVIEW_SUCCESS:
      return {...state, error: '', successMessage: 'Thanks for your review!'};
    case SET_SUCCESS_MESSAGE:
      return {...state, successMessage: ''};
    default:
      return state;
  }
};

export default reducer;
