import React, { Component } from 'react';

import RestaurantList from '../../components/RestaurantList/RestaurantList';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import moment from 'moment';
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
        axios.post('/restaurant/add-restaurant', newRestaurant)
    }

    newOrderHandler = (id) => {
        console.log("post", id);
        axios.post('/order/add-order-list', id)
            .then(response => {
                this.setState({ listOfOrders: response.data })
            })

    }

    componentDidMount() {
        axios.get('/restaurant/restaurant-list')
            .then(response => {
                const currentListOfRestaurants = response.data;
                this.setState({ listOfRestaurants: currentListOfRestaurants });
            });

        const date = moment(new Date()).format('YYYY-MM-DD');
        axios.get('/order/order-lists/' + date.toString())
            .then(response => {
                const currentListOfOrders = response.data;
                this.setState({ listOfOrders: currentListOfOrders });
            });
    }

    newMealHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value);
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
                        newMealHandler={(event) => this.newMealHandler(event)} />
                </div>
            </div>

        );

    }
}

export default Restaurants;