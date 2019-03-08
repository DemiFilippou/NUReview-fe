import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReviewCard from './ReviewCard';
import {vote} from '../../actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({vote}, dispatch);
};

const ReviewCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewCard);

export default ReviewCardContainer;
