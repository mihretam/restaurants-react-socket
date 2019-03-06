import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

const AppBarWrapper = (props) => {
    const { classes } = props;
    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Restaurants
                    </Typography>
                    <Button color="inherit" className={classes.goRight}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(AppBarWrapper);



