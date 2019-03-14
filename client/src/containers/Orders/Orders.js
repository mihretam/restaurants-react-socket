import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import OrderWindow from '../../components/OrderWindow/OrderWindow';


class Orders extends Component {
    state = {
        listOfOrders: [
            {
                _id: '101',
                restaurantID: '201',
                orders: ['cevapi', 'grah','salata','pomfrit'],
                date: ''
            },
            {
                _id: '102',
                restaurantID: '202',
                orders: ['palacinci'],
                date: ''
            }
        ]
    }

    render() {
        const orderWindows = this.state.listOfOrders.map(order => {
            return (
                <OrderWindow key={order._id} restaurantName={order.restaurantID} orderList={order.orders} />
            )
        });
        return (
            <Grid container justify="center" spacing={16}>
                {orderWindows}
            </Grid>
        );
    }
}

export default Orders;