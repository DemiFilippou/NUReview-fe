import React from 'react';
import './company.scss';
import ReviewCardContainer from '../ReviewCard';
import ReviewFormContainer from '../ReviewForm';
import NoMatch from '../NoMatch';
import {Message} from 'semantic-ui-react';

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.handleMessageDismiss = this.handleMessageDismiss.bind(this);
  }

  componentDidMount() {
    this.props.getCompany(this.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.successMessage && !prevProps.successMessage) {
      this.props.getCompany(this.id);
    }
  }

  renderNoReviewsMsg(name) {
    return (
      <Message className="no-reviews">
        <Message.Header>No Reviews</Message.Header>
        <p>{`Hmm. It seems like there are no reviews for ${name} yet. Did you work here? Be the first to review!`}</p>
      </Message>
    );
  }

  handleMessageDismiss() {
    this.props.setSuccessMessage('');
  }

  renderReviewForm() {
    return <ReviewFormContainer companyId={this.props.company.id} companyName={this.props.company.name} />;
  }

  render() {
    if (this.props.error.code === 404) {
      return <NoMatch />;
    }
    const name = this.props.company && this.props.company.name;
    const reviews = this.props.company && this.props.company.reviews;

    return (
      <div className="company">
        <div className="company-content">
          {this.props.successMessage && (
            <Message success onDismiss={this.handleMessageDismiss} className="review-success-msg">
              <span>{this.props.successMessage}</span>
            </Message>
          )}
          <header className="company-header">
            <h1 className="company-name">{`Reading reviews for ${name}`}</h1>
            {this.renderReviewForm()}
          </header>
          <div className="company-reviews">
            {reviews && reviews.length
              ? reviews.map((review) => <ReviewCardContainer review={review} key={review.id} />)
              : this.renderNoReviewsMsg(name)}
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
