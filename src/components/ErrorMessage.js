import React from 'react';
import {Message} from 'semantic-ui-react';

class ErrorMessage extends React.Component {
  render() {
    return (
      <Message negative>
        {this.props.header && <Message.Header>{this.props.header}</Message.Header>}
        <p>{this.props.message}</p>
      </Message>
    );
  }
}

export default ErrorMessage;
