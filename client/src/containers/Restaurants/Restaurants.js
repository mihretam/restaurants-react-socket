import React, { Component } from 'react';

import RestaurantList from '../../components/RestaurantList/RestaurantList';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import Orders from '../../components/Orders/Orders';
import axios from '../../services/RestaurantsAxios';
import './Restaurants.css';

class Restaurants extends Component {
    state = {

        listOfRestaurants: [
            {restaurantId: 2, restaurantName: 'asdas'}
        ],
        orders: [1, 2]
    }

    formatName = (newRestaurant) => {
        return newRestaurant.charAt(0).toUpperCase() + newRestaurant.slice(1).toLowerCase();
    }

    newRestaurantHandler = (newRestaurant) => {
        if (newRestaurant === "") {
            return;
        }
        const updatedListOfRestaurants = [...this.state.listOfRestaurants];
        updatedListOfRestaurants.push({ restaurantId: newRestaurant, restaurantName: this.formatName(newRestaurant) })
        this.setState({ listOfRestaurants: updatedListOfRestaurants });
    }

    newOrderHandler = () => {

        let updatedOrders = [...this.state.orders];
        updatedOrders.push(updatedOrders.length + 1);
        console.log(updatedOrders)
        this.setState({ orders: updatedOrders })
    }

    componentDidMount() {
         axios.get('/restaurants/list')
                .then(response => {
                 const currentListOfRestaurants = response.data;
                 this.setState({ listOfRestaurants: currentListOfRestaurants });
             })
    }

    render() {
      const { listOfRestaurants, orders } = this.state
        return (
            <div className="flex-container">
                <div className="restaurantList">
                   <RestaurantList 
                        listOfRestaurants={listOfRestaurants} 
                        openNewOrder={this.newOrderHandler} 
                   />
                   <NewRestaurantButton addNewRestaurant={this.newRestaurantHandler} /> 
                </div>
                <div className="orderDisplay">
                    <Orders listOfOrders={orders} />
                </div>
            </div>

        );

    }
}

export default Restaurants;