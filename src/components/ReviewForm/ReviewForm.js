import React from 'react';
import './reviewForm.scss';
import {Modal, Button, Form, Label, Confirm, Popup} from 'semantic-ui-react';
import PositionDropdownContainer from './Fields/PositionDropdown';
import SemesterDropdownContainer from './Fields/SemesterDropdown';
import YearDropdownContainer from './Fields/YearDropdown';
import WageFieldContainer from './Fields/WageField';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import {forOwn} from 'lodash';
import newReviewTemplate from '../../newReviewTemplate';
import classNames from 'classnames';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCloseConfirmationOpen: false,
      isModalOpen: null
    };

    this.openModal = this.openModal.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
  }

  openModal() {
    this.props.getPositions();
    this.props.getTags();
    this.props.setCompanyId(this.props.companyId);
    this.setState({isModalOpen: true});
  }

  onModalClose() {
    let isFormDirty = false;

    forOwn(this.props.newReview, (value, key) => {
      if (key === 'companyId') return;
      if (value !== newReviewTemplate[key]) {
        isFormDirty = true;
        return;
      }
    });

    // if the form is dirty, make the user confirm leaving
    if (isFormDirty) {
      this.setState({isCloseConfirmationOpen: true, isModalOpen: true});
    } else {
      // otherwise, just close it
      this.setState({isModalOpen: false});
    }
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      const classes = classNames({tag: true, selected: tag.isSelected});
      return (
        <Label className={classes} key={tag.id} onClick={() => this.props.selectTag(tag.id)}>
          {tag.tag}
        </Label>
      );
    });
  }

  handleConfirmClose() {
    this.props.clearNewReviewForm();
    this.setState({isCloseConfirmationOpen: false, isModalOpen: false});
  }

  handleCancelClose = () => this.setState({isCloseConfirmationOpen: false, isModalOpen: true});

  submitReview() {
    this.props.addReview(this.props.newReview);
  }

  render() {
    const sliderProps = {
      defaultValue: 1,
      min: 1,
      max: 10,
      marks: {
        1: {label: 'Strongly\nDisagree'},
        5: {label: 'Neutral'},
        10: {label: 'Strongly\nAgree'}
      }
    };
    const {newReview} = this.props;

    return (
      <React.Fragment>
        <Button className="add-review" onClick={this.openModal}>
          Add a review
        </Button>
        <Modal
          size="small"
          open={this.state.isModalOpen}
          closeOnDimmerClick={false} // want to add this but the sliders mess it up
          closeIcon
          className="review-form"
          onClose={this.onModalClose}
        >
          <Modal.Header>Writing a review for {this.props.companyName}</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              <div className="row">
                <Form.Field className="position" required>
                  <label>Position</label>
                  <PositionDropdownContainer />
                </Form.Field>
                <Form.Checkbox
                  className="anonymous"
                  label="Remain Anonymous"
                  onChange={(e) => this.props.toggleAnonymous()}
                />
              </div>
              <div className="row">
                <Form.Field className="semester" required>
                  <label>Semester</label>
                  <SemesterDropdownContainer />
                </Form.Field>
                <Form.Field className="year" required>
                  <label>Year</label>
                  <YearDropdownContainer />
                </Form.Field>
                <Form.Field className="wage" error={newReview.wage < 0}>
                  <label>Wage</label>
                  <WageFieldContainer />
                </Form.Field>
              </div>
              <Form.Field required>
                <label>Indicate your agreement towards the following</label>
                <div className="slider-group">
                  <div className="rating">
                    <div className="question"> I enjoyed this co-op </div>
                    <Slider
                      {...sliderProps}
                      value={newReview.enjoyment}
                      onChange={(value) => this.props.enterEnjoyment(value)}
                    />
                  </div>
                  <div className="rating">
                    <div className="question"> I learned a lot on this co-op </div>
                    <Slider
                      {...sliderProps}
                      value={newReview.learning}
                      onChange={(value) => this.props.enterLearning(value)}
                    />
                  </div>
                  <div className="rating">
                    <div className="question"> I would recommend this co-op to a friend </div>
                    <Slider
                      {...sliderProps}
                      value={newReview.recommend}
                      onChange={(value) => this.props.enterRecommend(value)}
                    />
                  </div>
                </div>
              </Form.Field>
              <Form.TextArea label="Review" onBlur={(e) => this.props.enterBody(e.target.value)} />
              <Form.Field>
                <label>Choose Tags</label>
              </Form.Field>
              <div className="tags">{this.renderTags()}</div>
              <Button type="submit" onClick={this.submitReview}>
                Submit
              </Button>
            </Form>
          </Modal.Content>
          <Confirm
            content="Are you sure you want to lose your review?"
            cancelButton="No, I want to stay"
            confirmButton="Yes, I want to go"
            open={this.state.isCloseConfirmationOpen}
            onCancel={this.handleCancelClose}
            onConfirm={this.handleConfirmClose}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ReviewForm;
