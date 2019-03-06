import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { connect, Provider } from 'react-redux'
import PropTypes from 'prop-types'
import store from './store'
import setAuthToken from './services/SetAuthToken'
import jwt_decode from 'jwt-decode'
import { logoutUser, setCurrentUser } from './store/actions/authentication'
import RoutesList from './components/Routes/Routes'

class App extends Component {

  componentWillMount () {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken)
      const decoded = jwt_decode(localStorage.jwtToken)
      store.dispatch(setCurrentUser(decoded))
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())
        window.location.href = '/signin'
      }
    }
  }

  render () {
    const {settings,auth} = this.props
    return (
      <MuiThemeProvider theme={settings.theme}>
        <Provider store={store}>
          <CssBaseline />
          <div style={{height: '100vh'}}>
            <RoutesList isAuthenticated={auth.isAuthenticated}/>
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(
  mapStateToProps, null
)(App)
