import React from 'react';
import './reviewCard.scss';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Label, Icon, Popup} from 'semantic-ui-react';

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
      case average >= 4:
        icon = 'fa-smile-beam';
        break;
      case average >= 2:
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

  renderAward = () => {
    const userUpvotes = this.props.review.user.total_upvotes;

    // lowest reward requires 10 upvotes
    if (userUpvotes < 10) return;

    let awardColor, minUpvotes;
    switch (true) {
      case userUpvotes >= 50:
        awardColor = 'gold';
        minUpvotes = 50;
        break;
      case userUpvotes >= 20:
        awardColor = 'silver';
        minUpvotes = 20;
        break;
      default:
        awardColor = 'bronze';
        minUpvotes = 10;
    }

    const icon = (
      <span class="fa-stack fa-lg award-container">
        <i className={classNames(awardColor, 'award', 'fas fa-trophy', 'fa-stack-2x')} />
        <i className="fa fa-stack-1x award-label">{awardColor[0].toUpperCase()}</i>
      </span>
    );
    return (
      <Popup
        className="award-popup"
        trigger={icon}
        position="right center"
        on={['hover', 'click', 'focus']}
        content={`This user has ${minUpvotes}+ total upvotes on their reviews`}
        inverted
      />
    );
  };

  render() {
    const {review} = this.props;
    const sliderProps = {
      min: 1,
      max: 5,
      marks: {
        1: {label: 'Strongly\nDisagree'},
        3: {label: 'Neutral'},
        5: {label: 'Strongly Agree'}
      }
    };
    const upvoteClassnames = classNames({chevron: true, up: true, grow: true, active: review.user_vote === 1});
    const downvoteClassnames = classNames({chevron: true, down: true, grow: true, active: review.user_vote === -1});

    let wageText = '';
    if (review.wage === 0) wageText = 'Unpaid';
    if (review.wage) wageText = `$${review.wage}/hour`;

    return (
      <div className="review-card slide-in">
        <div className="header">
          <div className="row">
            <span> {review.position.title} </span>
            <span> {`${review.semester} ${review.year}`}</span>
          </div>
          <div className="row">
            <span>
              {' '}
              {review.anonymous ? 'Anonymous' : review.user && review.user.name}
              {this.renderAward()}
            </span>
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
