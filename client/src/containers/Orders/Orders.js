import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import OrderWindow from '../../components/OrderWindow/OrderWindow';


class Orders extends Component {

    render() {
        const orderWindows = this.props.listOfOrders.map(order => {
            return (
                <OrderWindow
                    key={order._id}
                    orderList={order.meals}
                    restaurant={this.props.listOfRestaurants[order.restaurantID]} />
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