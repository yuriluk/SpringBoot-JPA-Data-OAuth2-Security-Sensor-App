import React, {Component} from 'react'
import {localizedStrings} from '../../util/localization'
import {Button, notification, Popconfirm} from 'antd'
import { withRouter } from 'react-router-dom'

import {deleteSensor} from '../../util/utilsAPI'
import {isAdmin} from '../../../app/App'
import {ERROR} from "../../../constants";


class DeleteModal extends Component {
    state = {
        sensorId: this.props.sensorId,
    };


    submitDelete = (sensorId) => {
        deleteSensor(sensorId)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertDeleteSensorSuccessfully
                })
                this.props.loadList()
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/', ERROR, localizedStrings.alertLoggedOut);
            } else if (error.status === 404) {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: 'Sensor does not found!'
                });
            } else {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: error.message || localizedStrings.alertException
                });
            }
        });

    };

    confirm = (e) => {
        this.submitDelete(this.state.sensorId)
    };

    cancel = (e) => {
        console.log(e);
    };


    render() {

        return (
            <div>
                <Popconfirm
                    title={localizedStrings.helpDeleteModal}
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText={localizedStrings.helpOk}
                    cancelText={localizedStrings.helpCancel}
                >
                    <Button type="primary"
                            htmlType="submit"
                            size={'middle'}
                            className="basic-form-button"
                            disabled={!isAdmin(this.props.currentUser)}
                    >
                        {localizedStrings.delete}
                    </Button>
                </Popconfirm>
            </div>
        );
    }

}

export default withRouter(DeleteModal);
