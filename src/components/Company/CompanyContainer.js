import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Company from './Company';
import {getCompany, setSuccessMessage} from '../../actions';

const mapStateToProps = (state) => {
  return {
    company: state.nuReview.company,
    successMessage: state.nuReview.successMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getCompany, setSuccessMessage}, dispatch);
};

const CompanyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

export default CompanyContainer;
