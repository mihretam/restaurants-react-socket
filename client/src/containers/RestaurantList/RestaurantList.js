import React, { Component } from 'react';
import RestaurantListItem from '../../components/RestaurantListItem/RestaurantListItem';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import List from '@material-ui/core/List';
//<<<<<<< HEAD
import axios from 'axios';
import Orders from '../../components/Orders/Orders'
import axios from '../../services/RestaurantsAxios';
import './RestaurantList.css'

class RestaurantList extends Component {
    state = {
        listOfRestaurants: {
            
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this);
        listOfRestaurants: [],
        orders: []
//>>>>>>> 083b112c3822a505b76444164f7f6eb4dde88385
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
         axios.get('/restaurant/list')
                .then(response => {
                 const currentListOfRestaurants = response.data;
                 this.setState({ listOfRestaurants: currentListOfRestaurants });
             })
    }

    render() {
        const listOfRestaurants = this.state.listOfRestaurants.map(restaurant => <RestaurantListItem
            key={restaurant.restaurantId}
            restaurantName={restaurant.restaurantName}
            clicked={this.newOrderHandler} />)
        return (

            <div className="flex-container">
                <div className="restaurantList">
                    <List component="ol">
                        {listOfRestaurants}
                    </List>
                    <NewRestaurantButton clicked={this.newRestaurantHandler} />
                </div>
                <div className="orderDisplay">
                    <Orders listOfOrders={this.state.orders} />
                </div>
            </div>

        );

    }
}

export default RestaurantList;