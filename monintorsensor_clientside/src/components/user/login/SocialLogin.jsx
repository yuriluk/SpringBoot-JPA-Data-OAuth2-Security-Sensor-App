import React from 'react'
import { Form } from 'antd'
import { localizedStrings } from '../../util/localization'
import s from './Login.module.css'

import { FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '../../../constants'
import fbLogo from '../../../img/fb-logo.png'
import googleLogo from '../../../img/google-logo.png'
import githubLogo from '../../../img/github-logo.png'

function SocialLogin () {
  return (
    <>
      <div className={s.separator}>
        <span className={s.text}>{localizedStrings.useSocial}</span>
      </div>

      <Form.Item className={s.socialRow}>
        <a className={s.google} href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt={localizedStrings.logInWithGoogle}/>
          {localizedStrings.logInWithGoogle}
        </a>
      </Form.Item>
      <Form.Item className={s.socialRow}>
        <a className={s.github} href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt={localizedStrings.logInWithGithub}/>
          {localizedStrings.logInWithGithub}
        </a>
      </Form.Item>
      <Form.Item className={s.socialRow}>

        <a className={s.facebook} href={FACEBOOK_AUTH_URL}>
          <img src={fbLogo} alt={localizedStrings.logInWithFacebook}/>
          {localizedStrings.logInWithFacebook}
        </a>
      </Form.Item>
    </>
  )
}

export default SocialLogin
