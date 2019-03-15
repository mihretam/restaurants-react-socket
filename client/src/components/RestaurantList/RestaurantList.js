import React from 'react';
import RestaurantListItem from './RestaurantListItem/RestaurantListItem';
import List from '@material-ui/core/List';

const restaurantList = (props) => {
    console.log(props.listOfRestaurants[0])
    return (
        <List component="ol">
            {props.listOfRestaurants.map(restaurant => (
                <RestaurantListItem
                    {...props}
                    key={restaurant._id}
                    restaurantName={restaurant.restaurantName}
                />
            ))}
        </List>
    )

}



export default restaurantList;