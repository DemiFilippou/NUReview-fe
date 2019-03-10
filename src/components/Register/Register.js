import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Form, Message} from 'semantic-ui-react';
import './register.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: []
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.error.length && !prevProps.error.length) {
      this.setState({errors: this.state.errors.concat(this.props.error)});
    }
  }

  register() {
    // reset the errors
    if (this.state.password !== this.state.password_confirmation) {
      this.setState({errors: ['Password confirmation must match password']});
      return;
    }
    this.props.register(this.state);
    this.setState({errors: []});
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={{pathname: '/'}} />;
    }

    const errorsLength = this.state.errors.length;
    const errorMessageProps = {
      error: errorsLength > 0,
      header: errorsLength === 1 ? 'Error' : 'Errors',
      content: errorsLength === 1 ? this.state.errors[0] : undefined,
      list: errorsLength > 1 ? this.state.errors : undefined,
      color: 'red'
    };

    return (
      <div className="login-form">
        {errorsLength > 0 && <Message {...errorMessageProps} />}
        <Form className="register-form">
          <Form.Input
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
            label="Name"
            required
          />
          <Form.Input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            required
            label="Email"
          />
          <Form.Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            label="Password"
            required
          />
          <Form.Input
            id="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            onChange={this.handleChange}
            error={this.state.password !== this.state.password_confirmation}
            required
          />
          <Form.Button onClick={this.register}>Register</Form.Button>
        </Form>
        <Link to="/login">Back to login</Link>
      </div>
    );
  }
}

export default Register;
