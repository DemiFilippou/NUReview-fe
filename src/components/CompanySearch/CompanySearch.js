import React from 'react';
import {Redirect} from 'react-router-dom';
import {Search, Header} from 'semantic-ui-react';
import './companySearch.scss';
import {debounce} from 'lodash';

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
      this.props.history.push({
        pathname: '/'
      });
      return <Redirect to={`/company/${this.props.companyChosen.id}`} />;
    }
    const companies = this.props.companies.map((c) => ({title: c.name, id: c.id}));
    return (
      <div className="search-wrapper">
        <Header>Search for a Company</Header>
        <Search
          className="company-search-bar"
          placeholder="Company Name"
          loading={this.props.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={debounce(this.handleSearchChange, 500, {leading: true})}
          results={companies}
          value={(this.props.companyChosen && this.props.companyChosen.name) || this.state.query}
          {...this.props}
        />
      </div>
    );
  }
}

export default CompanySearch;
