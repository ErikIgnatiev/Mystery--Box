import React from 'react'

const Header = () => {
    return(
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
            <li className="selected"><a href="/">Home</a></li>
            <li><a href="/order">Order</a></li>
            <li><a href="/orders">List of orders</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        </div>
    )
}

export default Header;
