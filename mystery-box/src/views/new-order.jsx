import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OrderService from '../services/order-service';
import { UserConsumer } from '../components/contexts/user-context';

class NewOrder extends Component {
    static service = new OrderService();

    state = {
        email: '',
        address: '',
        telephone: '',
        comments: '',
        error: '',
    };

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, address, telephone, comments } = this.state;

        const data = {
            email,
            address,
            telephone,
            comments,
        }

        this.setState({
            error: ''
        }, async () => {

            try {
                const result = await NewOrder.service.order(data);
                console.log(result);

                if (!result.success) {
                    // const errors = Object.values(result.message).join(' ');
                    const errors = result.message;
                    throw new Error(errors);
                } else {
                    this.setState({
                        completed: true
                    })
                }

                // window.localStorage.setItem('auth_token', result.token);

                // console.log(result);

                // updateUser({
                //     isLoggedin: true,
                //     updateUser,
                //     ...result.user
                // });

                // this.setState({
                //     isLoggedin: true
                // })
            } catch (error) {
                this.setState({
                    error: error.message,
                })
            }
        })
    }

    render() {
        const { email, telephone, address, error, comments, completed } = this.state;
        const { isLoggedin } = this.props;


        if (completed) {
            return (
                <Redirect to="/completed" />
            );
        }

        return (
            <div className="form-wrapper">
                {
                    error.length
                        ? <div>Something went wrong: {error}</div>
                        : null
                }
                <h1>New Order</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Your e-mail</label>
                        <input type="text"
                            name="email"
                            id="email"
                            placeholder="Enter e-mail"
                            value={email}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Your telephone</label>
                        <input type="telephone"
                            name="telephone"
                            id="telephone"
                            placeholder="Enter password"
                            value={telephone}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Your address</label>
                        <input type="address"
                            name="address"
                            id="address"
                            placeholder="Enter password"
                            value={address}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <textarea type="comments"
                            name="comments"
                            id="comments"
                            placeholder="Comments"
                            value={comments}
                            onChange={this.handleChange} />
                    </div>

                    <button type="submit">Order away!</button>
                </form>
            </div>
        )
    }
}

// const LoginWithContext = (props) => {
//     return (
//         <UserConsumer>
//             {
//                 ({ isLoggedin, updateUser }) => (
//                     <Login
//                         {...props}
//                         isLoggedin={isLoggedin}
//                         updateUser={updateUser}
//                     />
//                 )
//             }
//         </UserConsumer>
//     )
// }

export default NewOrder;