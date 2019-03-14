import React, { Component, Fragment } from 'react';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import LoginWithContext from './views/login'
import Register from './views/register'
import NotFound from './views/not-found';
import Logout from './views/logout';
import HeaderWithContext from './components/header';
import Footer from './components/footer';
import Orders from './views/orders';
import { UserProvider, defaultUserState } from './components/contexts/user-context';

// import logo from './logo.svg';
import './style/style.css';
import AuthorizedRoute from './components/authorized-route';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        ...defaultUserState,
        updateUser: this.updateUser,
      }
    };

  }


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: null,
  //     isAdmin: false,
  //   }
  // }

  // loginUser(user) {
  //   fetch('http://localhost:9999/auth/signin', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user)
  //   })
  //     .then(res => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       this.setState({
  //         user: data.username
  //       })
  //       sessionStorage.setItem('isAdmin', data.isAdmin);
  //       sessionStorage.setItem('userId', data.userId);
  //       sessionStorage.setItem('username', data.username);
  //       sessionStorage.setItem('token', data.token);
  //     })
  // }

  // registerUser(user) {
  //   fetch('http://localhost:9999/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user)
  //   })
  //     .then(res => res.json())
  //     .then((data) => {
  //       this.loginUser({ username: user.username, password: user.password })
  //     })
  // }

  // logout() {
  //   this.setState({
  //     user: null,
  //     isAdmin: false
  //   })
  //   sessionStorage.removeItem('userId');
  //   sessionStorage.removeItem('username');
  //   sessionStorage.removeItem('token');
  //   sessionStorage.removeItem('isAdmin');
  // }

  // componentWillMount() {
  //   if (sessionStorage.getItem('username')) {
  //     this.setState({
  //       user: sessionStorage.getItem('username'),
  //       isAdmin: sessionStorage.getItem('isAdmin'),
  //     })
  //   }
  // }

  updateUser = (user) => {
    this.setState({ user });
  }


  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
      <Router>
        <UserProvider value={ user }>
<HeaderWithContext />
            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Route path="/create" exact component={Order} />
            <Route path="/orders" exact component={Orders} /> */}
              <Route path="/login" component={LoginWithContext} />
              <Route path="/register" component={Register} />
              <AuthorizedRoute path="/orders" component={Orders} allowedRoles={[ 'admin' ]} />
              <AuthorizedRoute path="/logout" component={Logout} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </UserProvider>
        </Router>
      </div>
    );
  }
}

export default App;
