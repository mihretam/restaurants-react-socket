import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import './Button.css';

let styles = {
    root: {
        height: 10,
        float: 'right',
        marginRight: 10
    }
}

const Button = (props) => {
    const { classes, children, className, ...other } = props;
    let variant = "round";
    return (
        <Fab size="small" className={classNames(classes.root, className)} variant={variant} {...other} >
            <AddIcon />
        </Fab>
    );
};

export default withStyles(styles)(Button);