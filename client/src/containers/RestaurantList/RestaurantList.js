import React, { Component } from 'react';
import RestaurantListItem from '../../components/RestaurantListItem/RestaurantListItem';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import List from '@material-ui/core/List';
import axios from 'axios';
import './RestaurantList.css'

class RestaurantList extends Component {
    state = {
        listOfRestaurants: {
            
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this);
    }

    formatName = (newRestaurant) => {
        return newRestaurant.charAt(0).toUpperCase() + newRestaurant.slice(1).toLowerCase();
    }

    newRestaurantHandler = (newRestaurant) => {
        if (newRestaurant === "") {
            return;
        }
        const updatedListOfRestaurants = {...this.state.listOfRestaurants};
        updatedListOfRestaurants[newRestaurant] = {
            orders: [],
            openWindow: false
        };
        this.setState({ listOfRestaurants: updatedListOfRestaurants });
    }

    componentDidMount() {
        axios.get('someURL')
            .then(request => {
                const currentListOfRestaurants = request.data;
                this.setState({listOfRestaurants: currentListOfRestaurants});
            })
    }

    render() {
        let listOfRestaurants = Object.keys(this.state.listOfRestaurants).map(restaurantName => <RestaurantListItem key={restaurantName} restaurantName={restaurantName} />)
        return (
            <div className="restaurantList">
                <List component="ol">
                    {listOfRestaurants}
                </List>
                <NewRestaurantButton clicked={this.newRestaurantHandler} />
            </div>

        );

    }
}

export default RestaurantList;