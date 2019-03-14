import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OrderService from '../services/order-service';
import FormErrors from '../components/form-errors';


class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            address: '',
            telephone: '',
            comments: '',
            error: '',
            formErrors: { email: '', address: '', telephone: '' },
            emailValid: false,
            addressValid: false,
            telephoneValid: false,
            formValid: false,
        }
    }

    static service = new OrderService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        }, () => { this.validateField(target.name, target.value) })
    }

    //------------------------------ VALIDATOR --------------------------

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let telephoneValid = this.state.telephoneValid;
        let addressValid = this.state.addressValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'telephone':
                telephoneValid = value.length > 8;
                fieldValidationErrors.telephone = telephoneValid ? '' : ' is incomplete';
                break;
            case 'address':
                addressValid = value.length > 0;
                fieldValidationErrors.address = addressValid ? '' : ' must be provided';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            telephoneValid: telephoneValid,
            addressValid: addressValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.telephoneValid && this.state.addressValid});
    }


    //===================== /VALIDATOR ==========================



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
        const { email, telephone, address, comments, completed } = this.state;

        if (completed) {
            return (
                <Redirect to="/completed" />
            );
        }

        return (
            <div className="form-wrapper">
                <div className="errors">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
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
                            placeholder="Enter your telephone"
                            value={telephone}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Your address</label>
                        <input type="address"
                            name="address"
                            id="address"
                            placeholder="Enter your address"
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

                    <button type="submit" className="btn btn-primary"
                        disabled={!this.state.formValid}>Order away!</button>
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