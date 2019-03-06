import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';


const styles = theme => ({

    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
})

class InputWrapper extends Component {
  

    render() {
        const { classes } = this.props;
        return (
            <Input
                placeholder="Placeholder"
                className={classes.input}
                inputProps={{
                    'aria-label': 'Description',
                }}
            />

        );
    }
}


export default withStyles(styles)(InputWrapper);