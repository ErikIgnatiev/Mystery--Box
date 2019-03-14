import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserConsumer } from '../components/contexts/user-context';

const Header = ({ isLoggedin, username, roles }) => {
  const isAdmin = roles
    .map(role => role.toLowerCase())
    .some(role => ['admin'].includes(role))
    ;

  return (
    <div id="header">
      <div id="logo">
        <div id="logo_text">
          {/* <!-- class="logo_colour", allows you to change the colour of the text --> */}
          <h1><a href="index.html">Mystery<span className="logo_colour">box</span></a></h1>
          {isLoggedin ? <h2>Your monthly bundle full of surprises, {username}.</h2> : <h2>Your monthly bundle full of surprises.</h2>}
        </div>
      </div>
      <div id="menubar">
        <ul id="menu">
          {/* <!-- put class="selected" in the li tag for the selected page - to highlight which page you're on --> */}
          <li className="selected"><NavLink className="test" to="/">Home</NavLink></li>
          {
            isLoggedin
              ? <React.Fragment><li><NavLink to="/order">Order</NavLink></li>
                {
                  isAdmin
                    ? <li><NavLink to="/orders">List of orders</NavLink></li>
                    : null
                }
                <li><NavLink to="/logout">Logout</NavLink></li></React.Fragment>
              : <React.Fragment><li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li></React.Fragment>
          }
        </ul>
      </div>
    </div>
  )
}

const HeaderWithContext = (props) => {
  return (
    <UserConsumer>
      {
        ({ isLoggedin, username, roles }) => (
          <Header {...props} isLoggedin={isLoggedin} username={username} roles={roles} />
        )
      }
    </UserConsumer>
  )
}

export default HeaderWithContext;
