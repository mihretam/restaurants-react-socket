import React, { Component } from 'react';

import RestaurantList from '../../components/RestaurantList/RestaurantList';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import Orders from '../Orders/Orders';
import axios from '../../services/RestaurantsAxios';
import './Restaurants.css';

class Restaurants extends Component {
    state = {
        listOfRestaurants: [
            {
                _id: '201',
                restaurantName: 'Sezam',
                phoneNumber: '061-111-111',
                workHours: '08:00-21:00'
            },
            {
                _id: '202',
                restaurantName: 'Sezam1',
                phoneNumber: '061-111-111',
                workHours: '08:00-21:00'
            }
        ],
        listOfOrders: [
            {
                _id: '101',
                restaurantID: '201',
                meals: ['cevapi', 'grah', 'salata', 'pomfrit'],
                date: ''
            },
            {
                _id: '102',
                restaurantID: '202',
                meals: ['palacinci'],
                date: ''
            }
        ]

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
                    <Orders listOfRestaurants={listOfRestaurants} listOfOrders={listOfOrders} newMealHandler={(event) => this.newMealHandler(event)} />
                </div>
            </div>

        );

    }
}

export default Restaurants;