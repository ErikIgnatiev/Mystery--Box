import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => {
    return(
        <div id="header">
        <div id="logo">
          <div id="logo_text">
            {/* <!-- class="logo_colour", allows you to change the colour of the text --> */}
            <h1><a href="index.html">Mystery<span className="logo_colour">box</span></a></h1>
            {this.state.user ? <h2>Your monthly bundle full of surprises, {this.state.user}.</h2> : <h2>Your monthly bundle full of surprises.</h2>}
          </div>
        </div>
        <div id="menubar">
          <ul id="menu">
            {/* <!-- put class="selected" in the li tag for the selected page - to highlight which page you're on --> */}
            <li className="selected"><NavLink className="test" to="/">Home</NavLink></li>
            <li><NavLink to="/order">Order</NavLink></li>
            <li><NavLink to="/orders">List of orders</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
        </div>
        </div>
    )
}

export default Header;
