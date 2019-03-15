import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


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
    root: {
        display: 'block',
        marginLeft: 10,
        marginTop: 10
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        float: 'none',
        margin: 10
    }

});


class InputNewRestaurant extends Component {
    state = {
        restaurantName: "",
        restaurantLink: "",
        workingHours: ""
    }

    handleChange = name => (event) => {
        
        this.setState({
            [name]: event.target.value,
        },);
    };

    render() {
        const { classes, addNewRestaurant, closeHandler } = this.props;
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form>
                    {Object.keys(this.state).map((stateKey, index) => {
                        console.log(stateKey);
                        return <Input
                            key={index}
                            placeholder={stateKey}
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                            onChange={this.handleChange( stateKey )}
                        />
                    })}
                    <Button
                        variant="contained"
                        className={classes.root}
                        onClick={() => {
                            addNewRestaurant(this.state);
                            closeHandler();
                        }}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }

}


export default withStyles(styles)(InputNewRestaurant);
