import React from 'react';
import './reviewForm.scss';
import {Modal, Button, Form, Label} from 'semantic-ui-react';
import PositionDropdownContainer from './Fields/PositionDropdown';
import SemesterDropdownContainer from './Fields/SemesterDropdown';
import YearDropdownContainer from './Fields/YearDropdown';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.onModalOpen = this.onModalOpen.bind(this);
    this.handleWageChange = this.handleWageChange.bind(this);
    this.state = {
      errors: {
        wage: ''
      }
    };
  }

  onModalOpen() {
    this.props.getPositions();
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
      <Modal
        trigger={<Button className="add-review">Add a review</Button>}
        closeIcon
        className="review-form"
        onOpen={this.onModalOpen}
      >
        <Modal.Header>Writing a review for {this.props.company.name}</Modal.Header>
        <Modal.Content>
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
      </Modal>
    );
  }
}

export default ReviewForm;
