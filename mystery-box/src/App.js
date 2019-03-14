import React, { Component, Fragment } from 'react';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import LoginWithContext from './views/login'
import Register from './views/register'
import NotFound from './views/not-found';
import Header from './components/header';
import Footer from './components/footer';
import { UserProvider, defaultUserState } from './components/contexts/user-context';

// import logo from './logo.svg';
import './style/style.css';

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

    return (
      <div >
        <Router>
          <UserProvider value={ user }>
            <div id="header">
              <div id="logo">
                <div id="logo_text">
                  {/* <!-- class="logo_colour", allows you to change the colour of the text --> */}
                  <h1><a href="index.html">Mystery<span className="logo_colour">box</span></a></h1>
                  <h2>Your monthly bundle full of surprises.</h2>
                </div>
              </div>
              <div id="menubar">
                <ul id="menu">
                  {/* <!-- put class="selected" in the li tag for the selected page - to highlight which page you're on --> */}
                  <li className="selected"><NavLink className="test" to="/">Home</NavLink></li>
                  <li><NavLink to="/order">Order</NavLink></li>
                  <li><NavLink to="/orders">List of orders</NavLink></li>
                  {/* <li><a onClick={this.logout.bind(this)} href="#">Logout </a></li> */}
                  <li><NavLink to="/login">Login</NavLink></li>
                  <li><NavLink to="/register">Register</NavLink></li>
                </ul>
              </div>
            </div>


            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Route path="/create" exact component={Order} />
            <Route path="/orders" exact component={Orders} /> */}
              <Route path="/login" component={LoginWithContext} />
              <Route path="/register" component={() => <Register registerUser={this.registerUser.bind(this)} />} />
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
