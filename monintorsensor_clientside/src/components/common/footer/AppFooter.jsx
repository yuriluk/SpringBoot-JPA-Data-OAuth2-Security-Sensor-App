import React from 'react'
import { Layout } from 'antd'
import { localizedStrings } from '../../util/localization'
import './AppFooter.css'

const Footer = Layout.Footer

const AppFooter = () => {
  return (
    <Footer className='footer'>
      <div>
        {localizedStrings.footerText}
      </div>
    </Footer>
  )
}

export default AppFooter
