import React, { Component } from 'react'
import './Profile.css'
import { localizedStrings } from '../../util/localization'

class Profile extends Component {
  state = {
    color: ''
  }

  submitColor = () => {
    console.log(this.state.color)
  }

  changeColor = (event) => {
    console.log('Change on pick by Input' + this.state.color)
    this.setState({
      color: event.target.value
    })
  }

  render () {
    const { currentUser } = this.props

    return (
      <div className="profile-container">
        <div className="container">

          <div className="profile-info">

            <div className="profile-avatar">
              {
                currentUser.imageUrl ? (
                  <img src={currentUser.imageUrl} alt={currentUser.name}/>
                ) : (
                  <div className="text-avatar">
                    <span>{currentUser.name && currentUser.name[0]}</span>
                  </div>
                )
              }
            </div>

            <div className="profile">
              <p className="profile-name">{localizedStrings.yourName} {currentUser.name}</p>
              <p className="profile-email">{localizedStrings.yourLogin} {currentUser.login}</p>
            </div>

            {
              currentUser.imageUrl ? (
                ""
              ) : (
                <div className="color-pick">
                  <form>
                    <label>
                      {localizedStrings.helpForChooseProfileColor}
                      <input type="color" onChange={this.changeColor}/>
                    </label>
                    <button onClick={this.submitColor}>{localizedStrings.chooseColor}</button>
                  </form>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }

}

export default Profile
