import React from 'react';
import RestaurantListItem from './RestaurantListItem/RestaurantListItem';
import List from '@material-ui/core/List';

const restaurantList = (props) => {
    const listOfRestaurants = props.listOfRestaurants.map(restaurant => <RestaurantListItem
        key={restaurant.restaurantId}
        restaurantName={restaurant.restaurantName}
        openNewOrder={props.openNewOrder} />);

    return (
        <List component="ol">
            {listOfRestaurants}
        </List>
    )

}



export default restaurantList;