import React from 'react'

import { Flex } from 'antd-mobile'

import { withRouter } from 'react-router-dom'

import './index.scss'

import PropTypes from 'prop-types'

function SearchHeader({ cityName, history, className }) {
  return (
    <Flex className={["search-box", className || ''].join(' ')}>
      <Flex className="search">
        <div className="location" onClick={() => history.push('/citylist')}>
          <span className="name">{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>
        <div className="form" onClick={() => history.push('/search')}>
          <i className="iconfont icon-search" />
          <span className="text">请输入小区或地址</span>
        </div>
      </Flex>
      <i className="iconfont icon-map" onClick={() => history.push('/map')} />
    </Flex>
  )
}

SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default withRouter(SearchHeader)