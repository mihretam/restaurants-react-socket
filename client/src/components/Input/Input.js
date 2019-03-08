import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


const styles = theme => ({

    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
})

class InputWrapper extends Component {

    state = {
        name: ""
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Input
                    placeholder="Restaurant name"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    onChange={this.handleChange('name')}
                />
                <Button
                    variant="contained"
                    className={classes.root}
                    onClick={() => {
                        this.props.clicked(this.state.name);
                        this.props.closeHandler();
                    }}>Add</Button>
            </Fragment>
        );
    }
}


export default withStyles(styles)(InputWrapper);