import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterService from '../services/register-service';
import AuthenticationService from '../services/auth-service'
import { UserConsumer } from '../components/contexts/user-context';

class Register extends Component {

  static service = new RegisterService();
  static login = new AuthenticationService();

  state = {
    email: '',
    password: '',
    error: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const { updateUser } = this.props;

    const credentials = {
      email,
      password,
      username
    }

    this.setState({
      error: ''
    }, async () => {

      try {
        const result = await Register.service.login(credentials);
        console.log(result);

        if (!result.success) {
          const errors = Object.values(result.errors).join(' ');
          throw new Error(errors);
        }

        const autoLogin = await Register.login.login(credentials);
        console.log(autoLogin);

        window.localStorage.setItem('auth_token', autoLogin.token);

        if (autoLogin.success) {

          updateUser({
            isLoggedin: true,
            updateUser,
            ...autoLogin.user
        });
        }

      } catch (error) {
        this.setState({
          error: error.message,
        })
      }
    })
  }

  render() {
    const { username, email, password, confirmPassword, error } = this.state;
    const { isLoggedin } = this.props;


    if (isLoggedin) {
      return (
        <Redirect to="/" />
      );
    }


    return (
      <div className="form-wrapper">
        {
          error.length
            ? <div>Something went wrong: {error}</div>
            : null
        }
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter e-mail"
              value={email}
              onChange={this.handleChange} /></div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={this.handleChange} /></div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={this.handleChange} /></div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password" name="confirmPassword"
              id="confirmPassword" placeholder="Enter your password again" value={confirmPassword} /></div>
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

const RegisterWithContext = (props) => {
  return (
    <UserConsumer>
      {
        ({ isLoggedin, updateUser }) => (
          <Register
            {...props}
            isLoggedin={isLoggedin}
            updateUser={updateUser}
          />
        )
      }
    </UserConsumer>
  )
}

export default RegisterWithContext;
