import React from 'react';
import './login.scss';
import LoginApi from '../../loginApi.js';
import {Redirect, Link} from 'react-router-dom';
import {Form, Message} from 'semantic-ui-react';

// TODO: Tell user when login fails

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false,
      error: ''
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async login(e) {
    this.setState({error: ''});

    let loginSuccess;
    try {
      loginSuccess = await LoginApi.login({user: this.state});
    } catch (err) {
      this.setState({error: err});
    }
    if (loginSuccess) {
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname: '/'}} />;
    }

    return (
      <div className="login-form">
        <Form>
          <Message error={!this.state.error} header="Error" content={this.state.error} color="red" />
          <Form.Input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
            size="medium"
            label="Email"
            required
          />
          <Form.Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            size="medium"
            label="Password"
            required
          />
          <Form.Button onClick={this.login}>Login</Form.Button>
        </Form>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Login;
