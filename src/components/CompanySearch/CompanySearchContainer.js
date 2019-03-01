import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanySearch from './CompanySearch';
import {searchCompany, setCompanyChosen} from '../../actions';

const mapStateToProps = (state) => {
  return {
    isLoading: state.search.isLoading,
    companies: state.search.companies,
    companyChosen: state.search.companyChosen
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchCompany, setCompanyChosen}, dispatch);
};

const CompanySearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySearch);

export default CompanySearchContainer;
