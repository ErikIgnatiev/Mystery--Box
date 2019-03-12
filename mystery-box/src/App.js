import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login'
import Register from './views/register'
import NotFound from './views/not-found';
import Header from './components/header';
import Footer from './components/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
//import logo from './logo.svg';
import './style/style.css'
//import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div >
        <Header />
        <Router>
          <Fragment>
            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Route path="/create" exact component={Order} />
            <Route path="/orders" exact component={Orders} /> */}
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
