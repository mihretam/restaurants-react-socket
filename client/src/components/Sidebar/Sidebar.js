import React, { Component } from 'react'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { localize } from '../../services/'
import styles from './styles'

const menuItems = {
  'Brand': [
    {
      name: localize('home'),
      path: '/home'
    },
    {
      name: localize('settings'),
      path: '/setting'
    }
  ],
  'Influencer': {
    name: localize('home'),
    path: '/home'
  },
  'Admin': [{
    name: localize('home'),
    path: '/home'
  },
  {
    name: localize('Restaurants'),
    path: '/restaurants'
  },
  {
    name: localize('settings'),
    path: '/setting'
  }]
}

class Sidebar extends Component {

  render() {
    const { open, classes, auth } = this.props
    const userRole = auth.user.role
    const item = menuItems[userRole]

    return (
      <Drawer
        variant='permanent'
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          )
        }}
        open={open}
      >
        <List>
          {
            Object.keys(item)
              .map(key => {
                return (<Link to={item[key].path} key={key}>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={item[key].name} />
                  </ListItem>
                </Link>)
              })
          }
        </List>
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Sidebar)))