import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import './Button.css';

const styles = {
    root: {
        height: 10,
        float: 'right',
        marginRight: 10
    }
}

const Button = (props) => {
    const { classes, children, className, ...other } = props;

    return (
        <Fab size="small" mini className={classNames(classes.root, className)}  {...other} >
            <AddIcon />
        </Fab>
    );
};

export default withStyles(styles)(Button);