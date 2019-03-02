import React from 'react';
import './company.scss';
import ReviewCard from '../ReviewCard';
import {Button} from 'semantic-ui-react';

class Company extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.props.getCompany(id);
  }

  render() {
    const name = this.props.company && this.props.company.name;
    const reviews = this.props.company && this.props.company.reviews;

    return (
      <div className="company">
        <div className="company-content">
          <header className="company-header">
            <h1 className="company-name">{name}</h1>
            <Button className="add-review">Add a review</Button>
          </header>
          <div className="company-reviews">{reviews && reviews.map((review) => <ReviewCard review={review} />)}</div>
        </div>
      </div>
    );
  }
}

export default Company;
