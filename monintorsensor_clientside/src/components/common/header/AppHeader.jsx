import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd'
import { getAvatarColor } from '../../util/colors'

import { localizedStrings } from '../../util/localization'
import './AppHeader.css'
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import CaretDownOutlined from '@ant-design/icons/lib/icons/CaretDownOutlined'

const Header = Layout.Header

class AppHeader extends Component {

  state = {
    language: this.props.language
  }

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.handleLogout()
    }
    if (key === 'profile') {
      this.props.history.push('/profile')
    }
  }

  makeMenuForUser = () => {
    return [
      <Menu.Item key="/sensors">
        <Link to="/sensors">
          <HomeOutlined style={{ fontSize: '20px' }}/>
        </Link>
      </Menu.Item>,

      <Menu.Item key="/profile" className="profile-menu">
        <ProfileDropdownMenu
          currentUser={this.props.currentUser}
          handleMenuClick={this.handleMenuClick}
        />
      </Menu.Item>
    ]
  }

  updateLanguage = lang => {
    this.setState({
      language: lang
    })
    this.props.handleLanguageChange(lang)
  }

  render () {
    let menuItems

    if (this.props.currentUser) {
      menuItems = this.makeMenuForUser()
    }

    return (
      <Header>
        <div className='logo'>
          <Link to="/"> {localizedStrings.appName}</Link>
        </div>

        <div className='appLanguage'>
          <Button
            className={this.state.language === 'en' ? 'langStyle selected' : 'langStyle'}
            onClick={() => this.updateLanguage('en')}>
            EN
          </Button>
          <Button
            className={this.state.language === 'ru' ? 'langStyle selected' : 'langStyle'}
            onClick={() => this.updateLanguage('ru')}>
            RU
          </Button>
        </div>

        <Menu
          className="app_menu"
          mode="horizontal"
          selectedKeys={[this.props.location.pathname]}
          style={{ lineHeight: '60px' }}>
          {menuItems}
        </Menu>
      </Header>

    )
  };
}

function ProfileDropdownMenu (props) {
  const image = props.currentUser.imageUrl ? (
    <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
  ) : (
    <div className="text-avatar">
      <span>{props.currentUser.name && props.currentUser.name[0]}</span>
    </div>
  )

  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <Avatar className="user-avatar-circle"
                icon={image}
                style={{ backgroundColor: getAvatarColor(props.currentUser.name) }}>
          {props.currentUser.name[0].toUpperCase()}
        </Avatar>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="profile" className="dropdown-item">
        {localizedStrings.profile}
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        {localizedStrings.logout}
      </Menu.Item>
    </Menu>
  )


  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>

      <Button type="link" className="ant-dropdown-link" onClick={event => event.preventDefault()}>
        <UserOutlined style={{ marginRight: 0, fontSize: '20px' }}/>
        <CaretDownOutlined/>
      </Button>
    </Dropdown>
  )
}

export default withRouter(AppHeader)
