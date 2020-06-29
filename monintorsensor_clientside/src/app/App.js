import React, {Component} from 'react'
import './App.css'
import SensorList from '../components/sensor/list/SensorList'
import PrivateRoute from './util/PrivateRoute'

import {ConfigProvider, Layout, notification} from 'antd'
import {Route, Switch, withRouter} from 'react-router-dom'

import {getCurrentUser} from '../components/util/utilsAPI'
import {localizedStrings} from '../components/util/localization'
import {ACCESS_TOKEN, LANGUAGE, ROLE_ADMIN, ROLE_USER, SUCCESS, USER_ID} from '../constants'
import AppHeader from '../components/common/header/AppHeader'
import LoadingIndicator from '../components/common/util/LoadingIndicator'
import OAuth2RedirectHandler from '../components/user/oauth2/OAuth2RedirectHandler'
import AppFooter from '../components/common/footer/AppFooter'
import NotFound from '../components/common/error/NotFound'
import Profile from '../components/user/profile/Profile'
import AddSensor from '../components/sensor/action/AddSensor'
import EditSensor from '../components/sensor/action/EditSensor'
import SignUp from '../components/user/signup/SignUp'
import Login from '../components/user/login/Login'

import ruRU from 'antd/es/locale/ru_RU'
import enEn from 'antd/es/locale/en_US'

const {Content} = Layout

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,

            language: localStorage.getItem(LANGUAGE) === null ? "en" : localStorage.getItem(LANGUAGE)
        }

        notification.config({
            placement: "topRight",
            top: 70,
            duration: 2,
        })
    }

    handleLanguageChange = (lang) => {
        localStorage.setItem(LANGUAGE, lang)
        this.setState(() => ({
            language: lang
        }))
    }

    loadCurrentUser = () => {

        this.setState({
            isLoading: true
        })
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                })
            }).catch(() => {
            this.setState({
                isLoading: false
            })
        })

    }

    componentDidMount() {
        this.loadCurrentUser()
    }

    handleLogout =
        (redirectTo = '/', notificationType = SUCCESS, description = localizedStrings.alertSuccessLogOut) => {

            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(USER_ID)

            this.setState({
                currentUser: null,
                isAuthenticated: false
            })

            this.props.history.push(redirectTo)

            notification[notificationType]({
                message: localizedStrings.alertAppName,
                description: description,
            })
        }

    handleLogin = () => {
        notification.success({
            message: localizedStrings.alertAppName,
            description: localizedStrings.alertSuccessLogin,
        })
        this.loadCurrentUser()
        this.props.history.push("/sensors")
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }

        localizedStrings.setLanguage(this.state.language)

        return (
            <ConfigProvider locale={this.state.language === "ru" ? ruRU : enEn}>

                <Layout className="app-wrapper">
                    <AppHeader isAuthenticated={this.state.isAuthenticated}
                               currentUser={this.state.currentUser}
                               handleLogout={this.handleLogout}
                               language={this.state.language}
                               handleLanguageChange={this.handleLanguageChange}/>

                    <Content className="app-content">
                        <Switch>

                            <PrivateRoute path="/sensors"
                                          isAuthenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          handleLogout={this.handleLogout}
                                          component={SensorList}/>


                            <Route exact path="/"
                                   render={(props) =>
                                       <Login onLogin={this.handleLogin}
                                              {...props} />}/>


                            <PrivateRoute path="/edit/:id"
                                          isAuthenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          handleLogout={this.handleLogout}
                                          component={EditSensor}/>

                            <PrivateRoute path="/add"
                                          isAuthenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          handleLogout={this.handleLogout}
                                          component={AddSensor}/>


                            <Route path="/sign-up"
                                   render={(props) =>
                                       <SignUp
                                           isAuthenticated={this.state.isAuthenticated}
                                           {...props} />}/>

                            <Route path="/oauth2/redirect"
                                   render={(props) =>
                                       <OAuth2RedirectHandler onLogin={this.handleLogin}
                                                              {...props} />}/>

                            <PrivateRoute path="/profile"
                                          isAuthenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          component={Profile}/>

                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                </Layout>
                <AppFooter/>


            </ConfigProvider>
        )
    }
}

export function isAdmin(currentUser) {
    if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
        const role = currentUser.roles.find(elem => elem.name === ROLE_ADMIN)
        return role === undefined ? false : role.name === ROLE_ADMIN
    }
    return false
}

export function isUser(currentUser) {
    if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
        const role = currentUser.roles.find(elem => elem.name === ROLE_USER)
        return role === undefined ? false : role.name === ROLE_USER
    }
    return false
}

export default withRouter(App)

