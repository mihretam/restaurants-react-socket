import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const AppBarWrapper = (props) => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    Photos
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWrapper;



