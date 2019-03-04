import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {enterSemester} from '../../../actions';

class SemesterDropdown extends Component {
  handleChange = (e, {value}) => this.props.enterSemester(value);

  render() {
    const semesters = [
      {key: 'Summer', text: 'Summer', value: 'Summer'},
      {key: 'Soring', text: 'Spring', value: 'Spring'},
      {key: 'Fall', text: 'Fall', value: 'Fall'}
    ];

    return (
      <Dropdown
        clearable
        options={semesters}
        placeholder="Choose Semester"
        search
        selection
        fluid
        value={this.props.semester}
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    semester: state.newReview.semester
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enterSemester}, dispatch);
};

const SemesterDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SemesterDropdown);

export default SemesterDropdownContainer;
