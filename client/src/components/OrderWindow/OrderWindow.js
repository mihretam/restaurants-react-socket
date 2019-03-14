import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Order from './Order/Order';

const styles = theme => ({
    paper: {
        height: 'auto',
        width: 250,
        margin: 10,
        padding: 20
    }
});

const orderWindow = (props) => {
    const { classes } = props;
    const currentOrders = props.orderList.map(order => {
        return (
            <Order>{order}</Order>
        );
    });

    return (
        <div>
            <Grid key={props.key} item>
                <Paper className={classes.paper}>
                    <h2>RestaurantName</h2>
                    {currentOrders}
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="New Item"
                            margin="normal"
                        />
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(orderWindow);