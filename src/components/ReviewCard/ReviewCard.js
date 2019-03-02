import React from 'react';
import './reviewCard.scss';
import {Item} from 'semantic-ui-react';

class ReviewCard extends React.Component {
  render() {
    const {review} = this.props;
    return (
      <Item className="review-card">
        <Item.Image size="tiny" src="https://react.semantic-ui.com/images/wireframe/image.png" />
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
