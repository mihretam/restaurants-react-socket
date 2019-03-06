import { Route } from 'react-router-dom'
import EmptyLayout from '../../layouts/EmptyLayout/EmptyLayout'
import React from 'react'

const EmptyRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  )
}

export default EmptyRoute