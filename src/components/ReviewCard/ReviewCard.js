import React from 'react';
import './reviewCard.scss';
import {Item} from 'semantic-ui-react';
import classNames from 'classnames';

class ReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.getIcon = this.getIcon.bind(this);
  }

  getIcon() {
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

    return icon;
    //return <i class={icon} />;
  }

  render() {
    const {review} = this.props;

    return (
      <Item className="review-card">
        <Item.Image as="i" size="tiny" className={classNames(this.getIcon(), 'fas')} />
        <Item.Content>
          <Item.Header> {review.position}</Item.Header>
          <Item.Header> {`${review.semester} ${review.year}`}</Item.Header>
          <Item.Meta />
          <Item.Description>{review.body}</Item.Description>
          <Item.Extra>Read More...</Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default ReviewCard;
