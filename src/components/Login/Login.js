import React from 'react';
import './login.scss';
import {Redirect, Link} from 'react-router-dom';
import {Form, Message} from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
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

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={{pathname: '/'}} />;
    }

    return (
      <div className="login-form">
        <Form>
          <Message error={!this.props.error.length} header="Error" content={this.props.error} color="red" />
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
          <Form.Button onClick={() => this.props.login(this.state)}>Login</Form.Button>
        </Form>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Login;
