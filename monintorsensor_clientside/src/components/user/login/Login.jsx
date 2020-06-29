import React, { Component } from 'react'
import { notification } from 'antd'
import { localizedStrings } from '../../util/localization'
import s from './Login.module.css'
import LoginForm from './LoginForm'

class Login extends Component {
  componentDidMount () {
    if (this.props.location.state && this.props.location.state.error) {
      this.showAlertMessage()
    }
  }

  showAlertMessage = () => {
    setTimeout(() => {
      notification.error({
        message: localizedStrings.alertAppName,
        description: this.props.location.state.error,
        duration: 5000
      })
      this.props.history.replace({
        pathname: this.props.location.pathname,
        state: {}
      })
    }, 100)
  }

  render () {
    return (
      <>
        <div className={s.container}>
          <h1 className={s.title}>{localizedStrings.appName}</h1>
          <div className={s.content}>
            <LoginForm onLogin={this.props.onLogin}/>
          </div>
        </div>
      </>
    )
  }
}

export default Login
