import React, {Component} from 'react'
import {Button, Form, Input, InputNumber, Select} from 'antd'

import s from './SensorLogic.module.css'
import {getAllTypes, getAllUnits} from '../util/utilsAPI'
import {localizedStrings} from '../util/localization'
import {
    ERROR,
    SENSOR_DESCRIPTION_MAX_LENGTH,
    SENSOR_LOCATION_MAX_LENGTH,
    SENSOR_MODEL_MAX_LENGTH,
    SENSOR_MODEL_MIN_LENGTH,
    SENSOR_NAME_MAX_LENGTH,
    SENSOR_NAME_MIN_LENGTH,
    SENSOR_RANGE_MAX,
    SENSOR_RANGE_MIN,
    SUCCESS
} from '../../constants'
import {Link} from "react-router-dom";

const {TextArea} = Input
const Option = Select.Option

class SensorLogic extends Component {

    state = {

        isUpdated: false,

        types: [],
        units: [],
        loading: false,

        id: this.props.sensor.id,

        name: {
            text: this.props.sensor.name.text,
            validateStatus: this.props.sensor.name.validateStatus
        },
        model: {
            text: this.props.sensor.model.text,
            validateStatus: this.props.sensor.model.validateStatus
        },
        rangeFrom: {
            text: this.props.sensor.rangeFrom.text,
            validateStatus: this.props.sensor.rangeFrom.validateStatus
        },
        rangeTo: {
            text: this.props.sensor.rangeTo.text,
            validateStatus: this.props.sensor.rangeTo.validateStatus
        },
        type: {
            id: this.props.sensor.type.id,
            text: this.props.sensor.type.text,
            validateStatus: this.props.sensor.type.validateStatus
        },
        unit: {
            id: this.props.sensor.unit.id,
            text: this.props.sensor.unit.text,
            validateStatus: this.props.sensor.unit.validateStatus
        },
        location: {
            text: this.props.sensor.location.text,
            validateStatus: this.props.sensor.location.validateStatus
        },
        description: {
            text: this.props.sensor.description.text,
            validateStatus: this.props.sensor.description.validateStatus
        }
    }

    componentDidMount() {
        this.fetchUnits()
        this.fetchTypes()
    }

    fetchTypes() {
        const types = getAllTypes()
        types
            .then(response => {
                this.setState({
                    types: response
                })
            })
    }

    fetchUnits() {
        const units = getAllUnits()
        units
            .then(response => {
                this.setState({
                    units: response
                })
            })
    }

    onFinish = () => {

        const sensorData = {
            id: this.state.id,
            name: this.state.name.text,
            model: this.state.model.text,
            rangeFrom: this.state.rangeFrom.text,
            rangeTo: this.state.rangeTo.text,
            type: {
                id: this.state.type.id,
                name: this.state.type.text,
                units: [
                    {
                        id: this.state.unit.id,
                        name: this.state.unit.text
                    }
                ]
            },
            location: {
                name: this.state.location.text
            },
            description: this.state.description.text
        }

        this.props.handleSubmit(sensorData)
    }

    handleNameChange = (event) => {
        const value = event.target.value

        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        })
    }

    handleModelChange = (event) => {
        const value = event.target.value

        this.setState({
            model: {
                text: value,
                ...this.validateModel(value)
            }
        })
    }

    handleRangeFromChange = (value) => {
        this.setState({
            rangeFrom: {
                text: value,
                ...this.validateRangeFrom(value)
            }
        })
    }

    handleRangeToChange = (value) => {
        this.setState({
            rangeTo: {
                text: value,
                ...this.validateRangeTo(value)
            }
        })
    }

    handleTypeChange = (key, value) => {
        this.setState({
            type: {
                id: value.key,
                text: key,
                ...this.validateType(key)
            }
        })
    }

    handleUnitChange = (key, value) => {
        this.setState({
            unit: {
                id: value.key,
                text: key,
                ...this.validateUnit(key)
            }
        })
    }

    handleLocationChange = (event) => {
        const value = event.target.value

        this.setState({
            location: {
                text: value,
                ...this.validateLocation(value)
            }
        })
    }

    handleDescriptionChange = (event) => {
        const value = event.target.value

        this.setState({
            description: {
                text: value,
                ...this.validateDescription(value)
            }
        })
    }

    isFormInvalid = () => {
        if (this.state.name.validateStatus !== SUCCESS) {
            return true
        }
        if (this.state.model.validateStatus !== SUCCESS) {
            return true
        }
        if (this.state.rangeFrom.validateStatus !== SUCCESS) {
            return true
        }
        if (this.state.rangeTo.validateStatus !== SUCCESS) {
            return true
        }
        if (this.state.type.validateStatus !== SUCCESS) {
            return true
        }
        if (this.state.unit.validateStatus !== SUCCESS) {
            return true
        }
    }

    render() {

        const typesView = []
        if (this.state.types !== null) {
            this.state.types.forEach((type) => {
                typesView.push(
                    <Option key={type.id} value={type.name}>
                        {type.name}
                    </Option>
                )
            })
        }

        const unitsView = []
        if (this.state.units !== null) {
            this.state.units.forEach((unit) => {
                unitsView.push(
                    <Option key={unit.id} value={unit.name}>
                        {unit.name}
                    </Option>
                )
            })
        }

        const formLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 26,
            },
            size: 'middle',
            style: {
                width: 600
            }
        }

        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 14},
        }

        return (
            <Form {...formLayout} onFinish={this.onFinish} className={s.form}
                  initialValues={{
                      'name': this.state.name.text,
                      'model': this.state.model.text,
                      'type': this.state.type.text,
                      'unit': this.state.unit.text,
                      'location': this.state.location.text,
                  }}
            >

                <Form.Item
                    name={'name'}
                    label={localizedStrings.sensorName}

                    rules={[{required: true}]}
                    validateStatus={this.state.name.validateStatus}
                    help={this.state.name.errorMsg}
                >
                    <Input
                        placeholder={localizedStrings.helpForSensorName}
                        onChange={this.handleNameChange}/>
                </Form.Item>

                <Form.Item
                    name={'model'}
                    label={localizedStrings.model}

                    rules={[{required: true}]}
                    validateStatus={this.state.model.validateStatus}
                    help={this.state.model.errorMsg}
                >
                    <Input
                        placeholder={localizedStrings.helpForSensorModel}
                        onChange={this.handleModelChange}/>
                </Form.Item>


                <Form.Item label={localizedStrings.range}>
                    <Input.Group compact>
                        <Form.Item
                            label={localizedStrings.rangeFrom}
                            validateStatus={this.state.rangeFrom.validateStatus}
                            help={this.state.rangeFrom.errorMsg}

                            {...formItemLayout}
                            style={{display: 'inline-flex', width: '50%'}}
                        >
                            <input id="rangeFrom" value={this.state.rangeFrom.text} hidden={true} readOnly={true}/>
                            <InputNumber id="rangeFrom"
                                         defaultValue={this.state.rangeFrom.text}
                                         min={SENSOR_RANGE_MIN}
                                         max={SENSOR_RANGE_MAX}
                                         size={'middle'}
                                         style={{width: '100%'}}
                                         onChange={this.handleRangeFromChange}/>
                        </Form.Item>


                        <Form.Item
                            label={localizedStrings.rangeTo}
                            validateStatus={this.state.rangeTo.validateStatus}
                            help={this.state.rangeTo.errorMsg}

                            {...formItemLayout}
                            style={{display: 'inline-flex', width: '50%'}}
                        >
                            <input id="rangeTo" value={this.state.rangeTo.text} hidden={true} readOnly={true}/>
                            <InputNumber id="rangeTo"
                                         defaultValue={this.state.rangeTo.text}
                                         min={-1000}
                                         max={1000}
                                         size={'middle'}
                                         style={{width: '100%'}}
                                         onChange={this.handleRangeToChange}/>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>


                <Form.Item
                    name={'type'}
                    label={localizedStrings.type}

                    rules={[{required: true}]}
                    validateStatus={this.state.type.validateStatus}
                    help={this.state.type.errorMsg}
                >
                    <Select onChange={this.handleTypeChange}>
                        {typesView}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'unit'}
                    label={localizedStrings.unit}

                    rules={[{required: true}]}
                    validateStatus={this.state.unit.validateStatus}
                    help={this.state.unit.errorMsg}
                >
                    <Select onChange={this.handleUnitChange}>
                        {unitsView}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={'location'}
                    label={localizedStrings.location}
                    validateStatus={this.state.location.validateStatus}
                    help={this.state.location.errorMsg}
                >
                    <TextArea
                        placeholder={localizedStrings.helpForSensorLocation}
                        style={{fontSize: '16px'}}
                        autosize={{minRows: 3, maxRows: 6}}
                        onChange={this.handleLocationChange}/>
                </Form.Item>

                <Form.Item
                    name={'description'}
                    label={localizedStrings.description}
                    validateStatus={this.state.description.validateStatus}
                    help={this.state.description.errorMsg}
                >
                    <TextArea
                        placeholder={localizedStrings.helpForSensorDescription}
                        style={{fontSize: '16px'}}
                        autosize={{minRows: 3, maxRows: 6}}
                        rows={4}
                        onChange={this.handleDescriptionChange}/>
                </Form.Item>

                <Form.Item className={s.buttonRow}>
                    <div className={s.customHidden}>
                        <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className={s.button}>
                            {localizedStrings.add}
                        </Button>
                    </div>

                    <div className={ s.changeDeleteRow}>
                        <div className={s.buttonPosition}>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="middle"
                                    disabled={this.isFormInvalid()}
                                    className={s.button}>
                                {localizedStrings.save}
                            </Button>
                        </div>
                        <div className={s.buttonPosition}>
                            <Button style={{margin: '0 8px'}}>
                                <Link to={{pathname: `/sensors`}}>
                                    {localizedStrings.cancel}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        )
    }

    validateName = (name) => {
        if (name.length < SENSOR_NAME_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorNameTooShort
            }
        } else if (name.length > SENSOR_NAME_MAX_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorNameTooLong
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null
            }
        }
    }

    validateModel = (model) => {
        if (model.length < SENSOR_MODEL_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorModelTooShort
            }
        } else if (model.length > SENSOR_MODEL_MAX_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorModelTooLong
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null
            }
        }
    }

    validateType = (type) => {
        if (type == null) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorTypeAbsent
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null
            }
        }
    }

    validateUnit = (unit) => {
        if (unit == null) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorUnitAbsent
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null
            }
        }
    }

    validateRangeFrom = (number) => {
        if (this.state.rangeTo.text === '') {
            if (number >= SENSOR_RANGE_MIN && number <= SENSOR_RANGE_MAX) {
                return {
                    validateStatus: SUCCESS,
                    errorMsg: null,
                }
            }
        } else {
            if (number <= this.state.rangeTo.text && (number >= SENSOR_RANGE_MIN && number <= SENSOR_RANGE_MAX)) {
                return {
                    validateStatus: SUCCESS,
                    errorMsg: null,
                }
            }
        }
        return {
            validateStatus: ERROR,
            errorMsg: localizedStrings.alertBadSensorRangeFromBiggerThanRangeTo,
        }
    }

    validateRangeTo = (number) => {
        if (number >= this.state.rangeFrom.text) {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            }
        }
        return {
            validateStatus: ERROR,
            errorMsg: localizedStrings.alertBadSensorRangeToSmallerThanRangeFrom,
        }
    }

    validateLocation = (location) => {
        if (location.length > SENSOR_LOCATION_MAX_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorLocationText
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null
            }
        }
    }

    validateDescription = (description) => {
        if (description.length > SENSOR_DESCRIPTION_MAX_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadSensorDescriptionText
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null
            }
        }
    }
}

export default SensorLogic
