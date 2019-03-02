import React from 'react';
import {Redirect} from 'react-router-dom';
import {Search} from 'semantic-ui-react';
import './companySearch.scss';
import _ from 'lodash';

class CompanySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      redirect: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }

  handleResultSelect(e, {result}) {
    // TODO: Redirect
    this.props.setCompanyChosen({name: result.title, id: result.id});
    this.setState({redirect: true});
  }

  handleSearchChange(e, {value}) {
    this.setState({query: value});
    this.props.setCompanyChosen('');
    if (value) {
      this.props.searchCompany(value);
    }
  }

  render() {
    // this is a bit of a hack until we get around to custom rendering
    // of the search results, which can then be a list of links.
    if (this.state.redirect) {
      return <Redirect to={`/company/${this.props.companyChosen.id}`} />;
    }
    const companies = this.props.companies.map((c) => ({title: c.name, id: c.id}));
    return (
      <Search
        loading={this.props.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
        results={companies}
        value={(this.props.companyChosen && this.props.companyChosen.name) || this.state.query}
        {...this.props}
      />
    );
  }
}

export default CompanySearch;
