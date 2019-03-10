import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Register from './Register';
import {register} from '../../actions';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.nuReview.isLoggedIn,
    error: state.error.register
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({register}, dispatch);
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
