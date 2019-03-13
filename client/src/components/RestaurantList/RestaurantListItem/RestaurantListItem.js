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
        const { classes } = this.props;
        return (
            <ListItem button onClick={this.props.clicked}  >
                <ListItemText primary={this.props.restaurantName} classes={{ primary: classes.listItemText }} />
            </ListItem>
        );
    };
};

export default withStyles(styles)(RestaurantListItem);