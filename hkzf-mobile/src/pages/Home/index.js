import React from 'react'
import {Route} from 'react-router-dom'

import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

import { TabBar } from 'antd-mobile'
// 导入组件样式
import './index.css'

// TabBar 数据
const TabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  },
]

export default class Home extends React.Component {
  state = {
    selectedTab: this.props.location.pathname, // 默认选中tab栏
  }
  // 渲染TabBar.Item
  renderTabBarItem () {
    return TabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.path}
        icon={
          <i className={`iconfont ${item.icon}`}/>
        }
        selectedIcon={
          <i className={`iconfont ${item.icon}`}/>
        }
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          })
          // 路由切换
          this.props.history.push(item.path)
        }}
      >
      </TabBar.Item>
    ))
  }
  // 监听路由变化
  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // 路由发生切换
      this.setState({
        selectedTab: this.props.location.pathname,
      })
    }
  }
  render () {
    return (
      <div className="home">
        {/* 设置子路由 */}
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/list" component={HouseList}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>

        {/* TabBar */}
        <TabBar
          unselectedTintColor="#888"
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent={true}
        >
          {
            this.renderTabBarItem()
          }
        </TabBar>
      </div>
    )
  }
}