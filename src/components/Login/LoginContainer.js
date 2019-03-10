import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Login from './Login';
import {login} from '../../actions';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.nuReview.isLoggedIn,
    error: state.error.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({login}, dispatch);
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
