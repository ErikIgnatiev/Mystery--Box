import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../services/auth-service';
import { UserConsumer } from '../components/contexts/user-context';

class Login extends Component {
    static service = new AuthenticationService();

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
        const { email, password } = this.state;
        const { updateUser } = this.props;

        const credentials = {
            email,
            password
        }

        this.setState({
            error: ''
        }, async () => {

            try {
                const result = await Login.service.login(credentials);

                if (!result.success) {
                    // const errors = Object.values(result.message).join(' ');
                    const errors = result.message;
                    throw new Error(errors);
                }

                window.localStorage.setItem('auth_token', result.token);

                // console.log(result);

                updateUser({
                    isLoggedin: true,
                    updateUser,
                    ...result.user
                });

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
        const { email, password, error } = this.state;
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
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text"
                            name="email"
                            id="email"
                            placeholder="Enter e-mail"
                            value={email}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.handleChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedin, updateUser }) => (
                    <Login
                        {...props}
                        isLoggedin={isLoggedin}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    )
}

export default LoginWithContext;
