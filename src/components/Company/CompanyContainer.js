import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Company from './Company';
import {getCompany, getPositions, setSuccessMessage} from '../../actions';

const mapStateToProps = (state) => {
  return {
    company: state.nuReview.company,
    successMessage: state.nuReview.successMessage,
    error: state.error.getCompany,
    isLoading: state.nuReview.company.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getCompany, setSuccessMessage, getPositions}, dispatch);
};

const CompanyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

export default CompanyContainer;
