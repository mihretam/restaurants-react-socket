import React, { Component } from 'react';

import RestaurantList from '../../components/RestaurantList/RestaurantList';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import moment from 'moment';
import Orders from '../Orders/Orders';
import axios from '../../services/Axios';
import Paper from '@material-ui/core/Paper';
import './Restaurants.css';

class Restaurants extends Component {
    state = {
        listOfRestaurants: [],
        listOfOrders: []
    }

    formatName = (newRestaurant) => {
        return newRestaurant.charAt(0).toUpperCase() + newRestaurant.slice(1).toLowerCase();
    }

    newRestaurantHandler = (newRestaurant) => {
        if (newRestaurant.name === "") {
            return;
        }
        axios.post('/restaurant/add-restaurant', { ...newRestaurant })
            .then(response => {
                console.log(response);
                const currentListOfRestaurants = this.state.listOfRestaurants;
                currentListOfRestaurants.push(response.data);
                this.setState({listOfRestaurants: currentListOfRestaurants});
            })
    }

    newOrderHandler = (restaurantId) => {
        axios.post('/order/add-order-list', { restaurantId })
            .then(response => {
                const currentListOfOrders = this.state.listOfOrders;
                currentListOfOrders.push(response.data);
                this.setState({ listOfOrders: currentListOfOrders })
            })
            .catch(error => console.log("error"));

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
                console.log(currentListOfOrders)
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
            <div>
                <Paper className="restaurantList">
                    <RestaurantList
                        listOfRestaurants={listOfRestaurants}
                        openNewOrder={this.newOrderHandler}
                    />
                    <NewRestaurantButton addNewRestaurant={this.newRestaurantHandler} />
                </Paper>
                <div className="flex-container">
                    <div className="orderDisplay">
                        <Orders
                            listOfRestaurants={listOfRestaurants}
                            listOfOrders={listOfOrders}
                            newMealHandler={(event) => this.newMealHandler(event)} />
                    </div>
                </div>
            </div>

        );

    }
}

export default Restaurants;