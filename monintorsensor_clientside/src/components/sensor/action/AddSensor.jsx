import React, {PureComponent} from 'react'
import {localizedStrings} from '../../util/localization'
import SensorLogic from '../SensorLogic'
import s from './EditSensor.module.css'
import {createSensor} from '../../util/utilsAPI'
import {notification} from 'antd'
import {ERROR} from '../../../constants'

class AddSensor extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      sensor: {
        id: '',
        name: {
          text: '',
          validateStatus: ''
        },
        model: {
          text: '',
          validateStatus: ''
        },
        rangeFrom: {
          text: '',
          validateStatus: ''
        },
        rangeTo: {
          text: '',
          validateStatus: ''
        },
        type: {
          id: '',
          text: '',
          validateStatus: ''
        },
        unit: {
          id: '',
          text: '',
          validateStatus: ''
        },
        location: {
          text: '',
          validateStatus: ''
        },
        description: {
          text: '',
          validateStatus: ''
        }
      }
    }

  }

  handleSubmit = (sensorData) => {
    createSensor(sensorData)
      .then(() => {
        notification.success({
          message: localizedStrings.alertAppName,
          description: localizedStrings.alertAddSensorSuccessfully
        })
        this.props.history.push('/sensors')
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.handleLogout('/', ERROR, localizedStrings.alertLoggedOut)
        } else {
          notification.error({
            message: localizedStrings.alertAppName,
            description: error.message || localizedStrings.alertException + error.message
          })
        }
      })
  }

  render () {
    return (
      <div className={s.container}>
        <h1 className={s.title}>
          {localizedStrings.addEditSensors}
        </h1>
        <SensorLogic
          sensor={this.state.sensor}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default AddSensor
