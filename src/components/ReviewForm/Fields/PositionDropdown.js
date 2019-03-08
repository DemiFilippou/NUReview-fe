import React, {Component} from 'react';
import {Dropdown, Popup, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPosition, enterPosition} from '../../../actions';
import Filter from 'bad-words';

class PositionDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.filter = new Filter();
  }

  handleAddition = (e, {value}) => {
    if (this.filter.isProfane(value)) {
      this.setState({error: 'Woah! No profanity please.'});
      // disable the weird auto selecting
      this.props.enterPosition('');
    } else {
      this.setState({error: ''});
      this.props.addPosition(value);
    }
  };

  handleChange = (e, {value}) => {
    this.setState({error: ''});
    this.props.enterPosition(value);
  };

  render() {
    const positions = this.props.positions.map((position) => ({
      key: position.id,
      value: position.id,
      text: position.title
    }));

    const dropdown = (
      <Dropdown
        error={this.state.error.length > 0}
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

    return (
      <Popup
        className="position-error"
        open={this.state.error.length > 0}
        content={
          <div className="dismissable-popup">
            {this.state.error}
            <button onClick={() => this.setState({error: ''})} className="popup-dismiss-btn unstyled-btn">
              <Icon name="x" />
            </button>
          </div>
        }
        trigger={dropdown}
        position="bottom left"
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    positions: state.nuReview.positions,
    positionId: state.nuReview.newReview.positionId
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
