import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {enterBody} from '../../../actions';
import {Form} from 'semantic-ui-react';

class BodyField extends Component {
  render() {
    return <Form.TextArea label="Review" onBlur={(e) => this.props.enterBody(e.target.value)} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enterBody}, dispatch);
};

const BodyFieldContainer = connect(
  null,
  mapDispatchToProps
)(BodyField);

export default BodyFieldContainer;
