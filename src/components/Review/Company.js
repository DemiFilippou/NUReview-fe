import React from 'react';
import './company.scss';
import {Container} from 'semantic-ui-react';

class Company extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.props.getCompany(id);
    this.state = {};
  }

  render() {
    return <Container text>{this.props.company.name}</Container>;
  }
}

export default Company;
