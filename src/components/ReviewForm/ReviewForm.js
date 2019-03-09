import React from 'react';
import './reviewForm.scss';
import {Modal, Button, Form, Confirm, Popup} from 'semantic-ui-react';
import PositionDropdownContainer from './Fields/PositionDropdown';
import SemesterDropdownContainer from './Fields/SemesterDropdown';
import YearDropdownContainer from './Fields/YearDropdown';
import WageFieldContainer from './Fields/WageField';
import SliderGroupContainer from './Fields/SliderGroup';
import BodyFieldContainer from './Fields/BodyField';
import AnonymousCheckboxContainer from './Fields/AnonymousCheckbox';
import TagsContainer from './Fields/Tags';
import ErrorMessage from '../ErrorMessage';
import {forOwn} from 'lodash';
import newReviewTemplate from '../../newReviewTemplate';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCloseConfirmationOpen: false,
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.isFormIncomplete = this.isFormIncomplete.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.errorRef = React.createRef();
  }

  // when the form is opened, we load data
  openModal() {
    this.props.getPositions();
    this.props.getTags();
    this.props.setCompanyId(this.props.companyId);
    this.setState({isModalOpen: true});
  }

  // when the modal is closed, we check if the user has filled out anything on the form
  // if they have, we render a confirmation modal to make sure they do not accidentally abandon their changes
  onModalClose() {
    let isFormDirty = false;
    forOwn(this.props.newReview, (value, key) => {
      if (key === 'companyId') return;
      if (key === 'tagIds' && !this.props.newReview['tagIds'].length) return;
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

  // called when a user confirms they are closing the form
  handleConfirmClose() {
    this.props.clearNewReviewForm();
    this.setState({isCloseConfirmationOpen: false, isModalOpen: false});
  }

  // called when a user cancels closing the form in order to stay on the form
  handleCancelClose = () => this.setState({isCloseConfirmationOpen: false, isModalOpen: true});

  submitReview() {
    this.props.addReview(this.props.newReview);
  }

  // returns true if the required fields are not all filled out
  isFormIncomplete() {
    // the sliders are also required, but they start with a value of 1 so
    // they are never technically empty
    const requiredFields = ['positionId', 'semester', 'year'];
    let isIncomplete = false;

    for (let key of requiredFields) {
      if (this.props.newReview[key] === newReviewTemplate[key]) {
        isIncomplete = true;
        break;
      }
    }
    return isIncomplete;
  }

  renderSubmitButton() {
    // need a custom disabled class as opposed to the normal disabled class
    // in order to be able to use the semantic pop-up on hover to explain why
    // the button it disabled
    if (this.isFormIncomplete()) {
      return (
        <Popup
          trigger={
            <Button type="submit" className="submit-review-btn custom-disabled">
              Submit
            </Button>
          }
          position="right center"
          on={['hover', 'click', 'focus']}
          content="Fill out the required fields"
        />
      );
    } else {
      return (
        <Button type="submit" onClick={this.submitReview} className="submit-review-btn">
          Submit
        </Button>
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errorMessage && !prevProps.errorMessage) {
      this.errorRef.current.scrollIntoView();
    }
    if (this.props.successMessage && !prevProps.successMessage) {
      this.props.clearNewReviewForm();
      this.setState({isCloseConfirmationOpen: false, isModalOpen: false});
    }
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
            {this.props.errorMessage && (
              <div ref={this.errorRef} className="add-review-error">
                <ErrorMessage header="Error Saving Review" message={this.props.errorMessage} />
              </div>
            )}
            <Form>
              <div className="row">
                <Form.Field className="position" required>
                  <label>Position</label>
                  <PositionDropdownContainer />
                </Form.Field>
                <AnonymousCheckboxContainer label="Remain Anonymous" />
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
                <SliderGroupContainer sliderProps={sliderProps} />
              </Form.Field>
              <BodyFieldContainer />
              <Form.Field>
                <label>Choose Tags</label>
              </Form.Field>
              <div className="tags">
                <TagsContainer />
              </div>
              {this.renderSubmitButton()}
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
