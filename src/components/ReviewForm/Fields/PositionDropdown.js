import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPosition, enterPosition} from '../../../actions';

class PositionDropdown extends Component {
  handleAddition = (e, {value}) => {
    this.props.addPosition(value);
  };

  handleChange = (e, {value}) => this.props.enterPosition(value);

  render() {
    const positions = this.props.positions.map((position) => ({
      key: position.id,
      value: position.id,
      text: position.title
    }));

    return (
      <Dropdown
        clearable
        options={positions}
        placeholder="Choose Job Title"
        search
        selection
        fluid
        allowAdditions
        value={this.props.positionId}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    positions: state.positions,
    positionId: state.newReview.positionId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addPosition, enterPosition}, dispatch);
};

const PositionDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionDropdown);

export default PositionDropdownContainer;
