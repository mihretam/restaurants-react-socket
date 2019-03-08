import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
//import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
//import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { logoutUser } from '../../store/actions/authentication'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './styles'


class Header extends Component {

  onLogout (e) {
    e.preventDefault()
    this.props.logoutUser(this.props.history)
  }

  render () {
    const {classes, handleToggleDrawer} = this.props
    return (
      <AppBar position='fixed'>
        <Toolbar disableGutters={true} classes={{root: classes.toolbarRoot}}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={handleToggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
         
          <Typography
            variant='title'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Restaurants
          </Typography>
          <IconButton onClick={this.onLogout.bind(this)} color='inherit'>
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

export default connect(null, {logoutUser})(withRouter(withStyles(styles)(Header)))
