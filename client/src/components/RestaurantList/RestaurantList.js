import React from 'react';
import RestaurantListItem from './RestaurantListItem/RestaurantListItem';
import List from '@material-ui/core/List';

const restaurantList = (props) => {
    console.log(props);
    return (
        <List component="ol">
            {props.listOfRestaurants.map(restaurant => (
                <RestaurantListItem
                    {...props}
                    restaurantId={restaurant._id}
                    key={restaurant._id}
                    restaurantName={restaurant.restaurantName}
                />
            ))}
        </List>
    )

}



export default restaurantList;