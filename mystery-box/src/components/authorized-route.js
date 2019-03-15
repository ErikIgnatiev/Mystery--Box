import React from 'react';
import { Route } from 'react-router-dom';
import { UserConsumer } from './contexts/user-context';
import NotFound from '../views/not-found'

const AuthorizedRoute = ({ isLoggedin, allowedRoles = [], roles, ...otherProps }) => {
    const roleIsAllowed = (!allowedRoles.length) || (roles
        .map(role => role.toLowerCase())
        .some(role => allowedRoles.includes(role))
        );
    
    if (!isLoggedin || !roleIsAllowed) {
        // return <Redirect to="/login" />
        return <NotFound />
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