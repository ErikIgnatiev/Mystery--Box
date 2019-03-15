import React, { Component } from 'react';

class NotFound extends Component {


    render() {
        return (
            <div id="site_content">
                <img alt="404 Not found, buddy!" src={process.env.PUBLIC_URL + '/404.jpg'} />
            </div>
        )
    }
}

export default NotFound;