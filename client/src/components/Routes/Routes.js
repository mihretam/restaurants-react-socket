import HomeScreen from '../../containers/HomeScreen/HomeScreen'
import SettingScreen from '../../containers/SettingScreen/SettingScreen'
import NotFound from '../NotFound/NotFound'
import LoginScreen from '../../containers/LoginScreen/LoginScreen'
import RegistrationScreen from '../../containers/RegistrationScreen/RegistrationScreen'
import { LayoutType } from '../../config/Constants'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import EmptyRoute from '../EmptyRoute/EmptyRoute'
import RestaurantApp from '../../RestaurantApp';

const routesList = [
  {
    path: '/app',
    exact: true,
    component: RestaurantApp,
    layoutType: LayoutType.dashboard,
    authenticate: true
  },
  {
    path: '/',
    exact: true,
    component: LoginScreen,
    layoutType: LayoutType.empty,
    authenticate: false

  },
  {
    path: '/index.html',
    exact: true,
    component: LoginScreen,
    layoutType: LayoutType.empty,
    authenticate: false
  },
  {
    path: '/registration',
    component: RegistrationScreen,
    layoutType: LayoutType.empty,
    authenticate: false
  },
  {
    path: '/home',
    component: RestaurantApp,
    layoutType: LayoutType.dashboard,
    authenticate: true
  },
  {
    path: '/signin',
    exact: false,
    component: LoginScreen,
    layoutType: LayoutType.empty,
    authenticate: false
  },
  {
    path: '/setting',
    exact: false,
    component: SettingScreen,
    layoutType: LayoutType.dashboard,
    authenticate: true
  },
  {
    component: NotFound,
    layoutType: LayoutType.empty,
    authenticate: false
  },
  {
    component: NotFound,
    layoutType: LayoutType.empty,
    authenticate: true
  }
]

const RoutesList = (props) => {
  const {isAuthenticated} = props
  return (
    <Router>
      <Switch>
        {routesList.map((route, index) => (

            (route.authenticate === isAuthenticated) ? (
              (route.layoutType !== LayoutType.empty) ?
                (
                  <Dashboard key={index} path={route.path} exact={route.exact} component={route.component} />
                ) : (
                  <EmptyRoute key={index} path={route.path} exact={route.exact} component={route.component} />
                )
            ) : null
          )
        )}
      </Switch>
    </Router>
  )
}

export default RoutesList