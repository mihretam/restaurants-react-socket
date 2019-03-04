import React, { Component } from 'react';
import RestaurantListItem from '../../components/RestaurantListItem/RestaurantListItem';
import NewRestaurantButton from '../../components/Button/NewRestaurantButton/NewRestaurantButton';
import List from '@material-ui/core/List';
import './RestaurantList.css'

class RestaurantList extends Component {
    state = {
        listOfRestaurants: [
            "Zlatnik",
            "Mozaik",
            "NjamNjam",
            "Sezam",
            "Merak",
            "Limenka",
            "Old Story",
            "Bagi"
        ]
    }

    newRestaurantHandler = () => {
        const updatedListOfRestaurants = [...this.state.listOfRestaurants];
        updatedListOfRestaurants.push("Restaurant");
        this.setState({ listOfRestaurants: updatedListOfRestaurants });
        console.log(this.state);
    }

    render() {
        let listOfRestaurants = this.state.listOfRestaurants.map(restaurantName => <RestaurantListItem key={restaurantName} restaurantName={restaurantName} />)
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