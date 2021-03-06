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
        padding: 15
    },
    paper2: {
        height: 'auto',
        width: 220,
        margin: 0,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 14,
        textAlign: 'center'
    }
});

const orderWindow = (props) => {
    const { classes } = props;
    const currentMeals = props.orderList.map((meal, index) => {
        return (
            <Order key={index}>{meal}</Order>
        );
    });
    console.log(props.restaurant.restaurantLink);
    return (
        <div>
            <Grid key={props.key} item>
                <Paper className={classes.paper}>
                    <Paper className={classes.paper2}>
                        <h2>{props.restaurant.restaurantName}</h2>
                        <p>Work Hours: {props.restaurant.workingHours}</p>
                       <p>URL: <a href={"https://" + props.restaurant.restaurantLink} target="_blank">{props.restaurant.restaurantLink}</a></p>
                    </Paper>
                    <div style={{margin: '30px'}}>
                        {currentMeals}
                    </div>
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={props.newMealHandler}>
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