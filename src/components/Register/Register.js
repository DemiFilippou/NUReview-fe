import React from 'react';
import Api from '../../api.js';
import {Redirect, Link} from 'react-router-dom';
import {Form, Message} from 'semantic-ui-react';
import './register.scss';

// TODO: actually tell user about validation errors.

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
      redirect: false,
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

  async register(e) {
    // reset the errors
    if (this.state.password !== this.state.password_confirmation) {
      this.setState({errors: ['Password confirmation must match password']});
      return;
    }

    this.setState({errors: []});
    let registerSucess;

    try {
      registerSucess = await Api.register({user: this.state});
    } catch (err) {
      this.setState({errors: err});
    }

    if (registerSucess) {
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname: '/home'}} />;
    }

    const errorsLength = this.state.errors.length;
    const errorMessageProps = {
      error: !errorsLength,
      header: errorsLength === 1 ? 'Error' : 'Errors',
      content: errorsLength === 1 ? this.state.errors[0] : undefined,
      list: errorsLength > 1 ? this.state.errors : undefined,
      color: 'red'
    };

    return (
      <div className="login-form">
        <Form className="register-form">
          <Message {...errorMessageProps} />
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
