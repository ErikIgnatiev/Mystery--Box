import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div id="site_content">
                <div id="content">         <h1>Login</h1>
                    <form onSubmit={() => {
                        this.props.loginUser({
                            username: document.getElementById('usernameLogin').value,
                            password: document.getElementById('passwordLogin').value
                        })
                    }} action="/">
                        <label>Username</label>
                        <input type="text" id="usernameLogin" />
                        <label>Password</label>
                        <input type="password" id="passwordLogin" />
                        <input type="submit" value="Login" />
                    </form></div></div>
        )
    }
}

export default Login;