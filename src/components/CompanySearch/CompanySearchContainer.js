import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanySearch from './CompanySearch';
import {searchCompany, setCompanyChosen} from '../../actions';

const mapStateToProps = (state) => {
  return {
    isLoading: state.nuReview.search.isLoading,
    companies: state.nuReview.search.companies,
    companyChosen: state.nuReview.search.companyChosen
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
