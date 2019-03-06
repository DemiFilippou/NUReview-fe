import React, {Component} from 'react';
import {Input, Label, Popup, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {enterWage} from '../../../actions';

class WageField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({error: ''});
    const wage = e.target.value;
    this.props.enterWage(wage);

    if (!wage || wage >= 0) {
      // clear wage error message
      this.setState({error: ''});
    } else {
      // tell the user negative values are not permitted
      this.setState({error: 'Please enter a non-negative value'});
    }
  };

  render() {
    const field = (
      <Input
        labelPosition="right"
        type="number"
        value={this.props.wage}
        onChange={this.handleChange}
        error={this.state.error.length > 0}
      >
        <Label basic>$</Label>
        <input />
        <Label>/hr</Label>
      </Input>
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
        trigger={field}
        position="bottom left"
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wage: state.newReview.wage
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enterWage}, dispatch);
};

const WageFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WageField);

export default WageFieldContainer;
