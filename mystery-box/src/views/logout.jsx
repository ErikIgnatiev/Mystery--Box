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
        window.location.reload();
        return <Redirect to="/"/>
    }
}

// const Logout2 = (props) => {
//     const { updateUser } = props;
//     window.localStorage.removeItem('user');
//     window.localStorage.removeItem('auth_token');
//     updateUser(defaultUserState);

//     return <Redirect to="/" />
// }

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

export default LogoutWithContext;