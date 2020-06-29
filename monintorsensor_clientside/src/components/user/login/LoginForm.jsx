import React, { Component } from 'react'
import { Button, Form, Input, notification } from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { localizedStrings } from '../../util/localization'
import { Link } from 'react-router-dom'
import s from './Login.module.css'
import { ACCESS_TOKEN } from '../../../constants'
import { login } from '../../util/utilsAPI'
import SocialLogin from './SocialLogin'

class LoginForm extends Component {
  state = {
    login: '',
    password: ''
  }

  handleSubmit = () => {
    const loginRequest = {
      login: this.state.login,
      password: this.state.password
    }
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken)
        this.props.onLogin()
      }).catch(() => {
      notification.error({
        message: localizedStrings.alertAppName,
        description: localizedStrings.alertWrongEmailOrPassword
      })
    })
  }

  handleLoginChange = (event) => {
    const value = event.target.value
    this.setState({
      login: value
    })
  }

  handlePasswordChange = (event) => {
    const value = event.target.value
    this.setState({
      password: value
    })
  }

  render () {
    return (
      <Form
        className={s.form}
        onFinish={this.handleSubmit}>
        <Form.Item
          name="login"
          rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
          onChange={this.handleLoginChange}>

          <Input prefix={<UserOutlined/>}
                 size="large"
                 name="login"
                 placeholder={localizedStrings.email}/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
          onChange={this.handlePasswordChange}>

          <Input.Password
            prefix={<LockOutlined/>}
            autoComplete={"current-password"}
            size="large"
            name="password"
            type="password"
            placeholder={localizedStrings.password}/>
        </Form.Item>

        <SocialLogin/>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={s.button}>
            {localizedStrings.login}
          </Button>

          <span>
            {localizedStrings.or}
            <span>
              <Link to="/sign-up">{localizedStrings.loginFormRegisterNow}</Link>
            </span>
          </span>
        </Form.Item>
      </Form>

    )
  }
}

export default LoginForm
