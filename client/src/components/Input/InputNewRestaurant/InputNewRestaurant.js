import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '../Input';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    
});


const InputNewRestaurant = (props) => {
    const { classes } = props
    return (
        <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">New restaurant name:</Typography>
            <Input label="Restaurant names" type="" />
            <Button variant="contained"  className={classes.root} onClick={() => props.clicked(this.state)}>Add </Button>
        </div>
    );
}


export default withStyles(styles)(InputNewRestaurant);
