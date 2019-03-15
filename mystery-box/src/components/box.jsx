import React from 'react';
import { UserConsumer } from './contexts/user-context';
import postBoxService from '../services/box-update-service';

// const Box = ({ text, roles }) => {
//     const isAdmin = roles
//         .map(role => role.toLowerCase())
//         .some(role => ['admin'].includes(role))
//         ;

//     if (isAdmin) {
//         return (<p>Edit the box description</p>
//         )

//     } else {
//         return (
//             <p>{text}</p>
//         )
//     }
// }

class Box extends React.Component {

    static service = new postBoxService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { text } = this.state;

        const data = {
            text
        }

        this.setState({
            error: ''
        }, async () => {

            try {
                const result = await Box.service.box(data);

                if (!result.success) {
                    // const errors = Object.values(result.message).join(' ');
                    const errors = result.message;
                    throw new Error(errors);
                }

                // console.log(result);

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
        const { id, text, roles } = this.props;
        const isAdmin = roles
            .map(role => role.toLowerCase())
            .some(role => ['admin'].includes(role))
            ;

        if (isAdmin) {
            return (
                <div className="form-wrapper"><p>Edit the box description</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="email">E-mail</label> */}
                            <input type="text"
                                name="text"
                                id="text"
                                placeholder={text}
                                value={text}
                                onChange={this.handleChange} />
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            )

        } else {
            return (<div>
                <p>{text}</p>
                <p>{id}</p>
                </div>
            )
        }
    }
}

const BoxWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ roles }) => (
                    <Box {...props} roles={roles} />
                )
            }
        </UserConsumer>
    )
}

export default BoxWithContext;

