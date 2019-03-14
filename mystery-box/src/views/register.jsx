import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div id="site_content">
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
        )
    }
}

export default Register