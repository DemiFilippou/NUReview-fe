import React from 'react';
import './company.scss';
import ReviewCard from '../ReviewCard';
import ReviewFormContainer from '../ReviewForm';

class Company extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.props.getCompany(id);
  }

  renderReviewForm() {
    return <ReviewFormContainer companyId={this.props.company.id} companyName={this.props.company.name} />;
  }

  render() {
    const name = this.props.company && this.props.company.name;
    const reviews = this.props.company && this.props.company.reviews;

    return (
      <div className="company">
        <div className="company-content">
          <header className="company-header">
            <h1 className="company-name">{`Reading reviews for ${name}`}</h1>
            {this.renderReviewForm()}
          </header>
          <div className="company-reviews">
            {reviews && reviews.map((review) => <ReviewCard review={review} key={review.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
