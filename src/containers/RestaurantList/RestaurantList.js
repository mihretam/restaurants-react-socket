import React, { Component } from 'react';
import RestaurantListItem from '../../components/RestaurantListItem/RestaurantListItem';
import Button from '@material-ui/core/Button';
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

    }

    render() {
        let listOfRestaurants = this.state.listOfRestaurants.map(restaurantName => <RestaurantListItem key={restaurantName} restaurantName={restaurantName} />)
        return (
            <div className="restaurantList">
                <ol>
                    {listOfRestaurants}
                </ol>
                <Button variant="contained" > Add  </Button>
            </div>

        );

    }
}

export default RestaurantList;