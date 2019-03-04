import React from 'react';
import Button from '../Button/Button';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
    listItemText: {
        fontSize: "20px",
        marginLeft: 15
    }
}

const RestaurantListItem = (props) => {
    const { classes } = props;
    return (
        <ListItem >
            <ListItemText primary={props.restaurantName} classes={{ primary: classes.listItemText }} />
            <Button />
        </ListItem>
    );
};

export default withStyles(styles)(RestaurantListItem);