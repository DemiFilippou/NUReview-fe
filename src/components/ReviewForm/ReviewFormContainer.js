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
  addReview,
  setSuccessMessage
} from '../../actions';

const mapStateToProps = (state) => {
  return {
    newReview: state.nuReview.newReview,
    errorMessage: state.error.addReview,
    successMessage: state.nuReview.successMessage
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
      addReview,
      setSuccessMessage
    },
    dispatch
  );
};

const ReviewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);

export default ReviewFormContainer;
