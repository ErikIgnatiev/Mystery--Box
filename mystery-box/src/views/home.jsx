import React, { Component } from 'react';

class Home extends Component {


  render() {
    return (
      <div id="main">
      <div id="content_header"></div>
      <div id="site_content">
        <div id="content">
          {/* <!-- insert the page content here --> */}
          <h1>Order your Mysterybox now!</h1>
          <p>The Mysterybox is our way of providing you with the products you need but don't know you want. Get a bunch of items that won't be known to you until you open the box - and that's the charm of it! No, we won't tell what we've prepared for you, but we can give you a hint - it will be worth it!</p>
          <p>This template is written entirely in <strong>HTML5</strong> and <strong>CSS</strong>, and can be validated using the links in the footer.</p>
          <p>You can view more free HTML5 web templates.</p>
          <p>This template is a fully functional 5 page website, with an page that gives examples of all the styles available with this design.</p>
          {/* <h2>Browser Compatibility</h2>
          <p>This template has been tested in the following browsers:</p>
          <ul>
            <li>Internet Explorer 8</li>
            <li>Internet Explorer 7</li>
            <li>FireFox 3.5</li>
            <li>Google Chrome 6</li>
            <li>Safari 4</li>
          </ul> */}
        </div>
      </div>
  
    </div>
    )
  }
}

export default Home;