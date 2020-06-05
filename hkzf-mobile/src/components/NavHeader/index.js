import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import styles from './index.module.css'
import PropTypes from 'prop-types'
function NavHeader({ children, history, onLeftClick, className, rigthContent }) {
  const defaultHandler = () => history.go(-1)
  return (
    <NavBar
      className={[styles.navbar, className || ''].join(' ')}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      rigthcontent={rigthContent}
      onLeftClick={onLeftClick || defaultHandler}
    >
      {children}
    </NavBar>
  )
}

NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  className: PropTypes.string,
  rigthContent: PropTypes.array,
}
// withRouter 函数的返回值也是一个组件
export default withRouter(NavHeader)