import React from 'react';
import Button from '../Button/Button';

const RestaurantListItem = (props) => {
    return (
        <li>
            {props.restaurantName}
            <Button buttontype="Add"/>
        </li>
    );
};

export default RestaurantListItem;