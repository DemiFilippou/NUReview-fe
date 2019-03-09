import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleAnonymous} from '../../../actions';

class AnonymousCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.toggleAnonymous();
  }

  render() {
    return <Form.Checkbox className="anonymous" label={this.props.label} onChange={this.handleChange} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({toggleAnonymous}, dispatch);
};

const AnonymousCheckboxContainer = connect(
  null,
  mapDispatchToProps
)(AnonymousCheckbox);

export default AnonymousCheckboxContainer;
