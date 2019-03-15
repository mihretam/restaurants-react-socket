import React, { Component } from 'react';

import RestaurantList from '../../components/RestaurantList/RestaurantList';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import Orders from '../Orders/Orders';
import axios from '../../services/Axios';
import './Restaurants.css';

class Restaurants extends Component {
    state = {
        listOfRestaurants: [

        ],
        listOfOrders: [
            // {
            //     _id: '101',
            //     restaurantID: '201',
            //     meals: ['cevapi', 'grah', 'salata', 'pomfrit'],
            //     date: ''
            // },
            // {
            //     _id: '102',
            //     restaurantID: '202',
            //     meals: ['palacinci'],
            //     date: ''
            // }
        ]

    }

    formatName = (newRestaurant) => {
        return newRestaurant.charAt(0).toUpperCase() + newRestaurant.slice(1).toLowerCase();
    }


    newRestaurantHandler = (newRestaurant) => {
        if (newRestaurant.name === "") {
            return;
        }
        axios.post('restaurant/add-restaurant', newRestaurant)
    }

    newOrderHandler = () => {

        let updatedOrders = [...this.state.orders];
        updatedOrders.push(updatedOrders.length + 1);
        console.log(updatedOrders)
        this.setState({ orders: updatedOrders })
    }

    componentDidMount() {
        axios.get('/restaurant/restaurant-list')
            .then(response => {
                console.log(response);
                const currentListOfRestaurants = response.data;
                this.setState({ listOfRestaurants: currentListOfRestaurants });
            })
    }

    render() {
        const { listOfRestaurants, listOfOrders } = this.state;

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
                    <Orders
                        listOfRestaurants={listOfRestaurants}
                        listOfOrders={listOfOrders} 
                    />
                </div>
            </div>

        );

    }
}

export default Restaurants;