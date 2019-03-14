import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import LoginWithContext from './views/login'
import RegisterWithContext from './views/register'
import NotFound from './views/not-found';
import Logout from './views/logout';
import HeaderWithContext from './components/header';
import Footer from './components/footer';
// import Orders from './views/orders';
import Completed from './views/completed';
import { UserProvider, defaultUserState } from './components/contexts/user-context';
import './style/style.css';
import AuthorizedRoute from './components/authorized-route';
import NewOrder from './views/new-order';
import 'react-toastify/dist/ReactToastify.css';
import PendingOrders from './components/pending-orders';
// import { ToastContainer, toast } from 'react-toastify';


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

  updateUser = (user) => {
    this.setState({ user });
  }


  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        <Router>
          <UserProvider value={user}>
            <HeaderWithContext />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={LoginWithContext} />
              <Route path="/register" component={RegisterWithContext} />
              <AuthorizedRoute path="/orders" component={PendingOrders} allowedRoles={['admin']} />
              <AuthorizedRoute path="/order" component={NewOrder} />
              <AuthorizedRoute path="/logout" component={Logout} />
              <AuthorizedRoute path="/completed" component={Completed} />
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
