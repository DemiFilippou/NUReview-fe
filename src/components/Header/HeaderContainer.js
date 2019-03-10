import {connect} from 'react-redux';
import Header from './Header';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.nuReview.isLoggedIn
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  null
)(Header);

export default HeaderContainer;
