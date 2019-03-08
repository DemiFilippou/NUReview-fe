import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {enterYear} from '../../../actions';

class YearDropdown extends Component {
  handleChange = (e, {value}) => this.props.enterYear(value);

  render() {
    const yearStart = 2000;
    let yearEnd = new Date().getFullYear();
    // make a list of empty values and fill them with this year to 2000
    let years = Array(yearEnd - yearStart + 1)
      .fill()
      .map(() => ({key: yearEnd, text: yearEnd, value: yearEnd--}));

    return (
      <Dropdown
        clearable
        options={years}
        placeholder="Year"
        search
        selection
        fluid
        value={this.props.year}
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    semester: state.nuReview.newReview.semester
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enterYear}, dispatch);
};

const YearDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(YearDropdown);

export default YearDropdownContainer;
