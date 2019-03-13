import { Route } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import React from 'react'

const dashboard = ({component: Component, ...rest}) => {
  console.log('dashboard')
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  )
}

export default dashboard;