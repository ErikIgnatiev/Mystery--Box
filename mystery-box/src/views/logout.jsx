import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserConsumer, defaultUserState } from '../components/contexts/user-context';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        window.localStorage.removeItem('user');
        window.localStorage.removeItem('auth_token');
        props.updateUser(defaultUserState);
    }

    render() {
        return <Redirect to="/" />
    }
}

const LogoutWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ updateUser }) => (
                    <Logout {...props} updateUser={updateUser} />
                )
            }
        </UserConsumer>
    );
}

export default LogoutWithContext