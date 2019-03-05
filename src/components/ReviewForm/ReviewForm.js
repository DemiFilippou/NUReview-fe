import React from 'react';
import './reviewForm.scss';
import {Modal, Button, Form, Label, Confirm} from 'semantic-ui-react';
import PositionDropdownContainer from './Fields/PositionDropdown';
import SemesterDropdownContainer from './Fields/SemesterDropdown';
import YearDropdownContainer from './Fields/YearDropdown';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import {forOwn} from 'lodash';
import newReviewTemplate from '../../newReviewTemplate';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCloseConfirmationOpen: false,
      isModalOpen: null,
      errors: {
        wage: ''
      }
    };

    this.openModal = this.openModal.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleWageChange = this.handleWageChange.bind(this);
  }

  openModal() {
    this.props.getPositions();
    this.setState({isModalOpen: true});
  }

  onModalClose() {
    let isFormDirty = false;

    forOwn(this.props.newReview, (value, key) => {
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
      this.props.clearNewReviewForm();
    }
  }

  handleWageChange(e) {
    const wage = e.target.value;
    this.props.enterWage(wage);

    if (!wage || wage >= 0) {
      // clear wage error message
      this.setState({errors: {...this.state.errors, wage: ''}});
    } else {
      // tell the user negative values are not permitted
      this.setState({errors: {...this.state.errors, wage: 'Please enter a non-negative value'}});
    }
  }

  handleConfirmClose = () => this.setState({isCloseConfirmationOpen: false, isModalOpen: false});
  handleCancelClose = () => this.setState({isCloseConfirmationOpen: false, isModalOpen: true});

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
          open={this.state.isModalOpen}
          closeOnDimmerClick={false} // want to add this but the sliders mess it up
          closeIcon
          className="review-form"
          onClose={this.onModalClose}
        >
          <Modal.Header>Writing a review for {this.props.company.name}</Modal.Header>
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
                <Form.Input
                  label="Wage"
                  labelPosition="right"
                  type="number"
                  className="wage"
                  value={newReview.wage}
                  onChange={this.handleWageChange}
                >
                  <Label basic>$</Label>
                  <input />
                  <Label>/hr</Label>
                </Form.Input>

                {this.state.errors.wage && <Label pointing="left">{this.state.errors.wage}</Label>}
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
              <Button type="submit">Submit</Button>
            </Form>
          </Modal.Content>
          <Confirm
            content="Are you sure you want to leave without saving?"
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
