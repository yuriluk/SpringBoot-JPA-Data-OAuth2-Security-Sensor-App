import React, { Component } from 'react'
import { Input } from 'antd'
import { localizedStrings } from '../../util/localization'
import s from './SearchLogic.module.css'

const { Search } = Input

class SearchLogic extends Component {

  state = {
    searchString: ''
  }

  updateList = () => {
    const searchString = this.state.searchString
    this.props.loadSearchList(searchString)
  }

  handleSubmitSearch = (value) => {
    this.setState({
      searchString: value
    })
    this.updateList()
  }

  handleFindBySearchStringChange = (event) => {
    const value = event.target.value
    this.setState({
      searchString: value
    })
  }

  render () {

    return (
        <Search placeholder={localizedStrings.helpSearch}
                value={this.state.searchString}
                onChange={this.handleFindBySearchStringChange}
                onSearch={this.handleSubmitSearch}
                enterButton={localizedStrings.search}
                className={s.block}
        />
    )
  }
}

export default SearchLogic
