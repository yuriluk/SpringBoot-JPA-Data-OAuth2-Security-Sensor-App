import React, { Component } from 'react'
import s from './SignUp.module.css'
import { checkLoginAvailability, signUp } from '../../util/utilsAPI'
import {
  ERROR,
  LOGIN_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  SUCCESS
} from '../../../constants'
import { Button, Form, Input, notification } from 'antd'
import { localizedStrings } from '../../util/localization'
import { Link } from 'react-router-dom'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'

class Signup extends Component {

  state = {
    name: {
      value: ''
    },
    login: {
      value: ''
    },
    password: {
      value: ''
    },
    confirmedPassword: {
      value: ''
    }

  }

  handleInputChange = (event, validationFun) => {
    const target = event.target
    const inputName = target.name
    const inputValue = target.value

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    })
  }

  handleSubmit = () => {
    const signupRequest = {
      name: this.state.name.value,
      login: this.state.login.value,
      password: this.state.password.value,
      confirmedPassword: this.state.confirmedPassword.value
    }

    console.log(signupRequest)

    signUp(signupRequest)
      .then(() => {
        notification.success({
          message: localizedStrings.alertAppName,
          description: localizedStrings.alertSuccessRegister,
        })
        this.props.history.push('/profile/me')
      }).catch(error => {
      notification.error({
        message: localizedStrings.alertAppName,
        description: error.message || localizedStrings.alertException
      })
    })
  }

  isFormInvalid = () => {
    return !(this.state.name.validateStatus === SUCCESS &&
      this.state.login.validateStatus === SUCCESS &&
      this.state.password.validateStatus === SUCCESS &&
      this.state.confirmedPassword.validateStatus === SUCCESS
    )
  }

  render () {
    return (
      <div className={s.container}>
        <h1 className={s.title}>{localizedStrings.signUp}</h1>
        <div className={s.content}>
          <Form {...layout}
                onFinish={this.handleSubmit} className={s.form}>
            <Form.Item
              className={s.formItem}
              label={localizedStrings.name}
              hasFeedback
              validateStatus={this.state.name.validateStatus}
              help={this.state.name.errorMsg}>
              <Input
                prefix={<UserOutlined/>}
                name="name"
                autoComplete="off"
                placeholder={localizedStrings.name}
                value={this.state.name.value}
                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
            </Form.Item>
            <Form.Item
              className={s.formItem}
              label={localizedStrings.email}
              hasFeedback
              validateStatus={this.state.login.validateStatus}
              help={this.state.login.errorMsg}>
              <Input
                prefix={<UserOutlined/>}
                name="login"
                type="text"
                autoComplete="off"
                placeholder={localizedStrings.emailField}
                value={this.state.login.value}
                onBlur={this.validateLoginAvailability}
                onChange={(event) => this.handleInputChange(event, this.validateLogin)}/>
            </Form.Item>
            <Form.Item
              className={s.formItem}
              label={localizedStrings.password}
              validateStatus={this.state.password.validateStatus}
              help={this.state.password.errorMsg}>
              <Input.Password
                prefix={<LockOutlined/>}
                name="password"
                type="password"
                autoComplete="off"
                placeholder={localizedStrings.helpForPass}
                value={this.state.password.value}
                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
            </Form.Item>
            <Form.Item
              className={s.formItem}
              label={localizedStrings.confPassword}
              validateStatus={this.state.confirmedPassword.validateStatus}
              help={this.state.confirmedPassword.errorMsg}>
              <Input.Password
                prefix={<LockOutlined/>}
                name="confirmedPassword"
                type="password"
                autoComplete="off"
                placeholder={localizedStrings.helpForPass}
                value={this.state.confirmedPassword.value}
                onChange={(event) => this.handleInputChange(event, this.validateConfirmedPassword)}/>
            </Form.Item>
            <Form.Item className={s.formItem} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={s.button}
                disabled={this.isFormInvalid()}>
                {localizedStrings.signUp}
              </Button>
              <br/>
              {localizedStrings.alreadyRegister}
              <Link
                to="/">{localizedStrings.signUpFromLoginNow}
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

  validateName = (name) => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: ERROR,
        errorMsg: localizedStrings.alertBadNameTooShort
      }
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: ERROR,
        errorMsg: localizedStrings.alertBadNameTooLong
      }
    } else {
      return {
        validateStatus: SUCCESS,
        errorMsg: null,
      }
    }
  }

  validateLogin = (login) => {
    if (!login) {
      return {
        validateStatus: ERROR,
        errorMsg: localizedStrings.alertLoginEmpty
      }
    }

    if (login.length > LOGIN_MAX_LENGTH) {
      return {
        validateStatus: ERROR,
        errorMsg: localizedStrings.alertBadLoginTooLong
      }
    }

    return {
      validateStatus: null,
      errorMsg: null
    }
  }

  validateLoginAvailability = () => {
    const loginValue = this.state.login.value
    const loginValidation = this.validateLogin(loginValue)

    if (loginValidation.validateStatus === ERROR) {
      this.setState({
        login: {
          value: loginValue,
          ...loginValidation
        }
      })
      return
    }

    this.setState({
      login: {
        value: loginValue,
        validateStatus: 'validating',
        errorMsg: null
      }
    })

    checkLoginAvailability(loginValue)
      .then(response => {
        if (response.available) {
          this.setState({
            login: {
              value: loginValue,
              validateStatus: SUCCESS,
              errorMsg: null
            }
          })
        } else {
          this.setState({
            login: {
              value: loginValue,
              validateStatus: ERROR,
              errorMsg: localizedStrings.alertLoginAlreadyRegistred
            }
          })
        }
      }).catch(() => {
      this.setState({
        login: {
          value: loginValue,
          validateStatus: SUCCESS,
          errorMsg: null
        }
      })
    })

    this.setState({
      login: {
        value: loginValue,
        validateStatus: SUCCESS,
        errorMsg: null
      }
    })
  }

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: ERROR,
        errorMsg: localizedStrings.alertBadPasswordTooShort
      }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: ERROR,
        errorMsg: localizedStrings.alertBadPasswordTooLong
      }
    } else {
      return {
        validateStatus: SUCCESS,
        errorMsg: null,
      }
    }
  }

  validateConfirmedPassword = (confirmedPassword) => {
    const validRes = this.validatePassword(confirmedPassword)

    if (validRes.validateStatus !== SUCCESS && this.state.confirmedPassword !== this.state.password) {
      return {
        validateStatus: ERROR,
        errorMsg: (validRes.errorMsg ? validRes.errorMsg : '') + localizedStrings.alertBadConfirmedPasswordNotEqual
      }
    } else {
      return {
        validateStatus: SUCCESS,
        errorMsg: null,
      }
    }
  }
}

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 15,
  },
}

export default Signup