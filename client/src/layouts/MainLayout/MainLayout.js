import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header/index'
//import Sidebar from '../../components/Sidebar/index'
import { logoutUser } from '../../store/actions/authentication'
import styles from './styles'
//const drawerWidth = 240;

class MainLayout extends Component {
  state = {
    open: false
  }

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return {open: !prevState.open}
    })
  }

  render () {
    const {classes, children} = this.props
    return (
      <Fragment>
        <div className={classes.root}>
          <Header
            logout={this.props.logout}
            handleToggleDrawer={this.handleToggleDrawer}
          />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: this.state.open
            })}
          >
            {children}
          </main>
        </div>
       {/*<Sidebar open={this.state.open} drawerWidth={drawerWidth} /> */}
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser: () => logoutUser()
    },
    dispatch
  )
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MainLayout))
