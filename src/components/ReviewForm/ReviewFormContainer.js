import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReviewForm from './ReviewForm';
import {
  getPositions,
  enterYear,
  toggleAnonymous,
  enterWage,
  enterBody,
  enterEnjoyment,
  enterLearning,
  enterRecommend
} from '../../actions';

const mapStateToProps = (state) => {
  return {newReview: state.newReview};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {getPositions, enterYear, toggleAnonymous, enterWage, enterBody, enterEnjoyment, enterLearning, enterRecommend},
    dispatch
  );
};

const ReviewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);

export default ReviewFormContainer;
