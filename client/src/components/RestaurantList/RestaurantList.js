import React from 'react';
import RestaurantListItem from './RestaurantListItem/RestaurantListItem';
import List from '@material-ui/core/List';

const restaurantList = (props) => {
    return (
        <List component="ol">
            {props.listOfRestaurants.map(restaurant => (
                <RestaurantListItem
                    {...props}
                    key={restaurant.restaurantId}
                    restaurantName={restaurant.restaurantName}
                />
            ))}
        </List>
    )

}



export default restaurantList;