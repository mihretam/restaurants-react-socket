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
        const { classes, restaurantName, openNewOrder, key } = this.props;
        return (
            <ListItem button onClick={() => openNewOrder(key)}  >
                <ListItemText primary={restaurantName} classes={{ primary: classes.listItemText }} />
            </ListItem>
        );
    };
};

export default withStyles(styles)(RestaurantListItem);