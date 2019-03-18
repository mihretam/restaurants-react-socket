import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import OrderWindow from '../../components/OrderWindow/OrderWindow';


class Orders extends Component {
    getCurrentRestaurant = (listOfRestaurants, resID) => {
        return listOfRestaurants.filter(restaurant => {
            return restaurant._id === resID;
        });
    }

    render() {        
        const orderWindows = this.props.listOfOrders.map(order => {
            let currentRestaurant = this.getCurrentRestaurant(this.props.listOfRestaurants, order.restaurantID);
            return (
                <OrderWindow
                    key={order._id}
                    orderList={order.meals}
                    restaurant={currentRestaurant[0]}
                    newMealHandler={this.props.newMealHandler}
                />
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