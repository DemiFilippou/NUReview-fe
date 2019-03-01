import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Search} from 'semantic-ui-react';
import './company_search.scss';
import _ from 'lodash';

class CompanySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }

  handleResultSelect(e, {result}) {
    this.props.setCompanyChosen({name: result.title, id: result.id});
  }

  handleSearchChange(e, {value}) {
    this.setState({query: value});
    this.props.setCompanyChosen('');
    if (value) {
      this.props.searchCompany(value);
    }
  }

  render() {
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
