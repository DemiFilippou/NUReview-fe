import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Company from './Company';
import {getCompany} from '../../actions';

const mapStateToProps = (state) => {
  return {
    company: state.company
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getCompany}, dispatch);
};

const CompanyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

export default CompanyContainer;
