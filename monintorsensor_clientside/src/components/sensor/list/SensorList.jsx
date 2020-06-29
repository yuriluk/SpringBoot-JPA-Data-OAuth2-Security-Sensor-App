import React, {Component} from 'react'
import {Table} from 'antd'
import s from './SensorList.module.css'
import {getAllSensors} from '../../util/utilsAPI'
import {Link, withRouter} from 'react-router-dom'
import {localizedStrings} from '../../util/localization'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import SearchLogic from './SearchLogic'
import DeleteModal from "../action/DeleteModal";

class SensorList extends Component {

    state = {
        sensors: [],

        page: 1,
        size: 4,
        pagesCount: 0,

        searchString: '',

        totalPages: 0,
        totalElements: 0,

        isLoading: false,
    }

    componentDidMount() {
        //load list
        this.loadList(this.state.page, this.state.size)
    }

    loadSearchList = (searchString) => {
        this.loadList(this.state.page, this.state.size, searchString)
    }

    loadList = (page, size, searchString) => {
        const searchCriteria = {
            page: page,
            size: size,
            searchString: searchString
        }

        const promise = getAllSensors(searchCriteria)
        if (!promise) {
            return
        }
        this.extractPromise(promise)
    }

    extractPromise = (promise) => {

        this.setState({
            isLoading: true
        })

        promise
            .then(response => {
                this.setState({
                    sensors: response.objects.slice(),
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                })
            }).catch(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    loadSensorsAfterDelete = () => {
        this.loadList(this.state.page, this.state.size, this.state.searchString)
    }

    render() {
        const data = []
        this.state.sensors.forEach((sensor) => {
            data.push(
                {
                    key: sensor.id,
                    sensor: sensor
                }
            )
        })

        const columns = [
            {
                title: '', dataIndex: '', key: 'edit', render: (record) =>
                    <Link to={{
                        pathname: `/edit/${record.key}`,
                        sensor: record.sensor
                    }}>

                        <EditOutlined/>
                    </Link>
            },
            {
                title: localizedStrings.sensorName,
                dataIndex: 'sensor',
                key: 'name',
                render: sensor => (<> {sensor.name} </>)
            },
            {
                title: localizedStrings.model,
                dataIndex: 'sensor',
                key: 'model',
                render: sensor => (<> {sensor.model} </>)
            },
            {
                title: localizedStrings.type,
                dataIndex: 'sensor',
                key: 'type',
                render: sensor => (<> {sensor.type.name} </>)
            },
            {
                title: localizedStrings.range,
                dataIndex: 'sensor',
                key: 'range',
                render: sensor => (<> {sensor.rangeFrom} - {sensor.rangeTo} </>)
            },
            {
                title: localizedStrings.unit,
                dataIndex: 'sensor',
                key: 'unit',
                render: sensor => (<> {sensor.type.units[0].name} </>)
            },
            {
                title: localizedStrings.location,
                dataIndex: 'sensor',
                key: 'location',
                render: sensor => (<> {sensor.location.name} </>)
            },
            {
                title: '', dataIndex: '', key: 'delete', render: (record) =>
                    <DeleteModal sensorId={record.key}
                                 currentUser={this.props.currentUser}
                                 loadList={this.loadSensorsAfterDelete}
                    />
            }
        ]

        return (
            <div className={s.container}>
                <SearchLogic
                    loadSearchList={this.loadSearchList}
                />
                <div className={s.content}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            className: [s.paging],
                            loading: this.state.isLoading,
                            showSizeChanger: true,
                            defaultCurrent: Number(this.state.page),
                            defaultPageSize: Number(this.state.size),
                            pageSizeOptions: ['4', '8', '16', '32'],
                            total: this.state.totalElements,
                            onShowSizeChange: this.onSizeChangeHandler,
                            onChange: this.onPageChangeHandler,
                            loadMore: this.loadMore,
                            showTotal: this.showTotalHandler
                        }}
                    />

                    <Link to={{pathname: `/add`}} className={s.button}>
                        {localizedStrings.addSensor}
                    </Link>
                </div>
            </div>
        )
    }


    showTotalHandler = (total) => {
        return (
            <div className={s.block}>
                {localizedStrings.found} {total}
            </div>
        )
    }

    onSizeChangeHandler = (page, size) => {
        this.setState({
            page: page,
            size: size
        })
        this.loadList(page, size)
    }

    onPageChangeHandler = (pageNumber) => {
        this.setState({
            page: pageNumber
        })

        this.loadList(pageNumber, this.state.size)
    }

    loadMore = () => {
        console.log('LOAD MORE WORKS')
        this.loadList(this.state.page + 1, this.state.size)
    }
}

export default withRouter(SensorList)
