import React, {Component} from 'react'
import {localizedStrings} from '../../util/localization'
import SensorLogic from '../SensorLogic'
import s from './EditSensor.module.css'
import {editSensor} from '../../util/utilsAPI'
import {notification} from 'antd'
import {ERROR, SUCCESS} from '../../../constants'

class EditSensor extends Component {
  constructor (props) {
    super(props)

    const sensor =
      this.props.location.sensor === undefined
        ? JSON.parse(sessionStorage.getItem('sensorEdit'))
        : this.props.location.sensor

    if (this.props.location.sensor !== undefined) {
      const sensorEdit = JSON.parse(JSON.stringify(this.props.location.sensor))
      sessionStorage.setItem('sensorEdit', JSON.stringify(sensorEdit))
    }

    this.state = {
      sensor: {
        id: sensor.id,
        name: {
          text: sensor.name,
          validateStatus: SUCCESS
        },
        model: {
          text: sensor.model,
          validateStatus: SUCCESS
        },
        rangeFrom: {
          text: sensor.rangeFrom,
          validateStatus: SUCCESS
        },
        rangeTo: {
          text: sensor.rangeTo,
          validateStatus: SUCCESS
        },
        type: {
          id: sensor.type.id,
          text: sensor.type.name,
          validateStatus: SUCCESS
        },
        unit: {
          id: sensor.type.units[0].id,
          text: sensor.type.units[0].name,
          validateStatus: SUCCESS
        },
        location: {
          text: sensor.location.name,
          validateStatus: SUCCESS
        },
        description: {
          text: sensor.description,
          validateStatus: SUCCESS
        }
      }
    }
  }


  handleSubmit = (sensorData) => {
    editSensor(sensorData)
      .then(() => {
        notification.success({
          message: localizedStrings.alertAppName,
          description: localizedStrings.alertEditSensorSuccessfully
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

export default EditSensor
