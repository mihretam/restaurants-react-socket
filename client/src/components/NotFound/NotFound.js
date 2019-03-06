import React, { Component } from 'react';
import Colors from '../../utils/Colors';

const styles = {
    messageContainer: {
        height: 250
    },
    message404: {
        fontSize: 150,
        color: Colors.secondary,
        margin: 0
    },
    messageNotFound: {
        fontSize: 48,
        color: Colors.secondary,
        margin: 0
    }
};

class NotFound extends Component {


    render() {
        return (
            <div className="container-full align-center-full">
                <div style={styles.messageContainer} className="align-center-full flex-wrap">
                    <p className="full-width text-center" style={styles.message404}>
                        404
                    </p>
                    <p className="full-width text-center" style={styles.messageNotFound}>
                        Page not found
                    </p>
                </div>
            </div>
        );
    }
}

export default NotFound;
