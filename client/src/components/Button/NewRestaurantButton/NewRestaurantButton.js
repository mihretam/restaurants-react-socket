import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import InputNewRestaurant from '../../Input/InputNewRestaurant/InputNewRestaurant';




const styles = {
    root: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        marginTop: '10px'

    }
};

class AddRestaurantButton extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={this.handleOpen} className={classes.root} variant="contained">Add new restaurant</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <InputNewRestaurant closeHandler={this.handleClose} addNewRestaurant={this.props.addNewRestaurant}  />
                </Modal>
            </div>
        )
    }
}


export default withStyles(styles)(AddRestaurantButton);