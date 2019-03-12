import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login'
import Register from './views/register'
import NotFound from './views/not-found';
import Header from './components/header'
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
            <div id="footer">
              Copyright &copy; simplestyle_1 | <a href="http://validator.w3.org/check?uri=referer">HTML5</a> | <a href="http://jigsaw.w3.org/css-validator/check/referer">CSS</a> | <a href="http://www.html5webtemplates.co.uk">Website templates</a>
            </div>

          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
