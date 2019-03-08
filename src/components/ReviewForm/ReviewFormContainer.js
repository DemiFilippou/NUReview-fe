import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReviewForm from './ReviewForm';
import {
  getPositions,
  getTags,
  enterYear,
  toggleAnonymous,
  enterWage,
  enterBody,
  enterEnjoyment,
  enterLearning,
  enterRecommend,
  selectTag,
  setCompanyId,
  clearNewReviewForm,
  addReview
} from '../../actions';

const mapStateToProps = (state) => {
  return {
    newReview: state.newReview,
    tags: state.tags,
    errorMessage: state.error,
    successMessage: state.successMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPositions,
      getTags,
      enterYear,
      toggleAnonymous,
      enterWage,
      enterBody,
      enterEnjoyment,
      enterLearning,
      enterRecommend,
      selectTag,
      setCompanyId,
      clearNewReviewForm,
      addReview
    },
    dispatch
  );
};

const ReviewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);

export default ReviewFormContainer;
