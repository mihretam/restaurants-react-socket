import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 250,
        width: 200,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


const orders = (props) => {
    const { classes } = props;
    const orderWindows = props.listOfOrders.map(order => {
        return (
            <Grid key={order.orderId} item>
                <Paper className={classes.paper} />
            </Grid>
        )
    });

    return (
        <Grid container className={classes.demo} justify="center" spacing={16}>
            {orderWindows}
        </Grid>
    )
}


export default withStyles(styles)(orders);