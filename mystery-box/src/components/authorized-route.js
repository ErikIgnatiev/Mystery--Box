import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from './contexts/user-context';

const AuthorizedRoute = ({ isLoggedin, allowedRoles = [], roles, ...otherProps }) => {
    const roleIsAllowed = (!allowedRoles.length) || (roles
        .map(role => role.toLowerCase())
        .some(role => allowedRoles.includes(role))
        );
    
    if (!isLoggedin || !roleIsAllowed) {
        return <Redirect to="/login" />
    }

    return (
        <Route {...otherProps} />
    )
}

const AuthorizedRouteWithContext = (props) => {
    return (
        <UserConsumer>
            {
            ({isLoggedin, roles}) => (
        <AuthorizedRoute 
        {...props}
        roles={roles}
        isLoggedin={isLoggedin}
         />
            )
        }
    </UserConsumer>
    )
}

export {
    AuthorizedRoute
}

export default AuthorizedRouteWithContext;