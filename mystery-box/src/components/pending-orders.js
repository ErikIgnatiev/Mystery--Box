import React, { Fragment, Component } from 'react';
import OrdersTable from './order-table';
import OrdersService from '../services/admin-service';

class PendingOrders extends Component {
    state = {
        orders: [],
        isLoading: false,
    }

    static service = new OrdersService();

    render() {
        const { orders } = this.state;

        // if (isLoading) {
        //     return <Loading />
        // }

        // if (!orders.length && !isLoading) {
        //     return (
        //         <div>
        //             <h2>No books!</h2>
        //         </div>
        //     )
        // }

        if (!orders.length) {
            return (
                <div>
                    <h2>No orders</h2>
                </div>
            )
        }

        const style = {
            width:'100%'
        };

        return (

            <Fragment>
                <h2>Orders List</h2>
                <div className="row">
                <table style={style}>
                <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Telephone</th>
                            <th>Comments</th>
                            <th>Approval</th>
                        </tr>
                        {
                            orders.map(order => (
                                <OrdersTable key={order.id} {...order} />
                            ))
                        }
                        </tbody>
                        </table>
                    </div>

            </Fragment>
        )
    }

    async componentDidMount() {
        try {
            const orders = await PendingOrders.service.getPendingOrders();

            this.setState({ orders });
        } catch (error) {
            console.log('Problematic orders - ' + error);
        }
    }
}

export default PendingOrders;