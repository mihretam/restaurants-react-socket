import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
    listItemText: {
        fontSize: "20px",
        marginLeft: 15
    }
}

class RestaurantListItem extends Component {


    render() {
        const { classes, restaurantName, openNewOrder, restaurantId } = this.props;
        console.log(this.props.restaurantId);
        return (
            <ListItem button onClick={() => openNewOrder(restaurantId)}  >
                <ListItemText primary={restaurantName} classes={{ primary: classes.listItemText }} />
            </ListItem>
        );
    };
};

export default withStyles(styles)(RestaurantListItem);