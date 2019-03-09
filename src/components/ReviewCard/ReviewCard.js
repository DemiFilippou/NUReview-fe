import React from 'react';
import './reviewCard.scss';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Label, Icon} from 'semantic-ui-react';

class ReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon() {
    const {review} = this.props;
    const average = (review.enjoyment + review.learning + review.recommend) / 3;
    let icon;

    switch (true) {
      case average >= 7:
        icon = 'fa-smile-beam';
        break;
      case average >= 4:
        icon = 'fa-meh';
        break;
      default:
        icon = 'fa-frown';
    }

    return (
      <div className="overall-score">
        <i className={classNames(icon, 'fas')} />
      </div>
    );
  }

  renderTag(tag) {
    return (
      <Label className="tag" key={tag.id}>
        {tag.tag}
      </Label>
    );
  }

  render() {
    const {review} = this.props;
    const sliderProps = {
      min: 1,
      max: 10,
      marks: {
        1: {label: 'Strongly\nDisagree'},
        5: {label: 'Neutral'},
        10: {label: 'Strongly Agree'}
      }
    };
    const upvoteClassnames = classNames({chevron: true, up: true, grow: true, active: review.user_vote === 1});
    const downvoteClassnames = classNames({chevron: true, down: true, grow: true, active: review.user_vote === -1});

    let wageText = '';
    if (review.wage === 0) wageText = 'Unpaid';
    if (review.wage) wageText = `$${review.wage}/hour`;

    return (
      <div className="review-card">
        <div className="header">
          <div className="row">
            <span> {review.position.title} </span>
            <span> {`${review.semester} ${review.year}`}</span>
          </div>
          <div className="row">
            <span> {review.anonymous ? '' : review.user && review.user.name}</span>
            <span>{wageText}</span>
          </div>
        </div>
        <div className="review-ratings-wrapper">
          {this.renderIcon()}
          <div className="review-ratings">
            <div className="review-rating">
              <div className="question"> I enjoyed this co-op </div>
              <Slider className="disabled" {...sliderProps} value={review.enjoyment} />
            </div>
            <div className="review-rating">
              <div className="question"> I learned a lot on this co-op </div>
              <Slider className="disabled" {...sliderProps} value={review.learning} />
            </div>
            <div className="review-rating">
              <div className="question"> I would recommend this co-op to a friend </div>
              <Slider className="disabled" {...sliderProps} value={review.recommend} />
            </div>
          </div>
          <div className="votes">
            <button
              className="unstyled-btn"
              onClick={() => {
                review.user_vote === 1 ? this.props.vote(review.id, 0) : this.props.vote(review.id, 1);
              }}
            >
              <Icon className={upvoteClassnames} />
            </button>
            <div>{review.score}</div>
            <button
              className="unstyled-btn"
              onClick={() => {
                review.user_vote === -1 ? this.props.vote(review.id, 0) : this.props.vote(review.id, -1);
              }}
            >
              <Icon className={downvoteClassnames} />
            </button>
          </div>
        </div>
        {review.body && <div className="review-body">{review.body}</div>}
        <label className="tag-label">Tags:</label>
        <div className="review-tags">
          {review.tags && review.tags.length ? review.tags.map((tag) => this.renderTag(tag)) : 'None'}
        </div>
      </div>
    );
  }
}

export default ReviewCard;
