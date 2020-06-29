import React, { Component } from 'react'
import { ACCESS_TOKEN, ERROR, TOKEN } from '../../../constants'
import { Redirect, withRouter } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {

  getUrlParameter (name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(this.props.location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  };

  render () {
    const token = this.getUrlParameter(TOKEN)
    const error = this.getUrlParameter(ERROR)
    if (token) {
      return this.setTokenAndRedirect(token)
    } else {
      return this.redirectToLogin(error)
    }
  }

  redirectToLogin = error => <Redirect to={{
    pathname: '/',
    state: {
      from: this.props.location,
      error: error
    }
  }}/>

  setTokenAndRedirect = token => {
    localStorage.setItem(ACCESS_TOKEN, token)
    this.props.onLogin()
    return <Redirect to={{
      pathname: '/sensors',
      state: { from: this.props.location }
    }}/>
  }

}

export default withRouter(OAuth2RedirectHandler)
