import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterService from '../services/register-service';
import { UserConsumer, defaultUserState } from '../components/contexts/user-context';

class Register extends Component {

  static service = new RegisterService();

  state = {
    email: '',
    password: '',
    error: '',
    // isLoggedin: !!window.localStorage.getItem('auth_token'),
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    // const { updateUser } = this.props;

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

            if (!result.success) {
                const errors = Object.values(result.errors).join(' ');
                throw new Error(errors);
            }

            window.localStorage.setItem('auth_token', result.token);

            // console.log(result);

            // updateUser({
            //     isLoggedin: true,
            //     ...result.user
            // });

            // this.setState({
            //     isLoggedin: true
            // })
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

export default Register;

//previous version
//-------------------------
/* <div id="site_content">
<div className="Register">
<h1>Register</h1>
<form onSubmit={() => {
this.props.registerUser({
 username: document.getElementById('username').value,
 email: document.getElementById('email').value,
 password: document.getElementById('password').value,
})
}} action="/">
<label>Username</label>
<input type="text" id="username"/>
<label>Email</label>
<input type="text" id="email"/>
<label>Password</label>
<input type="password" id="password"/>
<input type="submit" value="Register"/>
</form></div></div>
) */