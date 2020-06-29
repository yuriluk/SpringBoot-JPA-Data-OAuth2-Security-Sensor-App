import React from 'react'
import { Route } from 'react-router-dom'
import NoPermission from '../../components/common/error/NoPermission'
import { isAdmin } from '../App'

const PrivateAdminRoute = ({ component: Component, isAuthenticated, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && isAdmin(currentUser) ? (
        <Component {...rest} {...props} />
      ) : (
        <NoPermission/>
      )
    }
  />
)

export default PrivateAdminRoute
