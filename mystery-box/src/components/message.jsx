import React from 'react';

const Message = ({ message, children }) => {
    return (
        <div>
            <h1>{message}</h1>
            {children}
        </div>
    )
}

export default Message;