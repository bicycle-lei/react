import React from 'react'

// 导入组件
import { Carousel, Flex, Grid } from 'antd-mobile'
import axios from 'axios'

// 导入图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导入样式
import './index.scss'

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/home/list'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/home/list'
  },
]

export default class Index extends React.Component {
  state = {
    // 轮播图状态数据
    swipers: [],
    isSwiperLoaded: false,
    groups: []
  }
  // 轮播图出现问题是因为动态加载数据
  async getSwipers () {
    const res = await axios.get('http://118.190.160.53:8009/home/swiper')
    this.setState(() => {
      return {
        swipers: res.data.body,
        isSwiperLoaded: true
      }
    })
  }
  // 
  async getGroups () {
    const res = await axios.get('http://118.190.160.53:8009/home/groups?area=88cff55c-aaa4-e2e0')
    this.setState(() => {
      return {
        groups: res.data.body
      }
    })
  } 
  componentDidMount() {
    this.getSwipers()
    this.getGroups()
  }
  // 渲染轮播图结构
  renderSwipers () {
    return this.state.swipers.map(item => (
      <a 
        key={item.id}
        href="http://itcast.cn"
        style={{
          display: 'inline-block',
          width: '100%',
          height: '212px'
        }}
      >
        <img src={`http://118.190.160.53:8009${item.imgSrc}`} alt="" style={{
          width: '100%',
          verticalAlign: 'top'
          }}/>
      </a>
    ))
  }
  renderNavs () {
    return navs.map(item => (
      <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
        <img src={item.img} alt=""/>
        <h2>{item.title}</h2>
      </Flex.Item>
    ))
  }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
        {
          this.state.isSwiperLoaded?
          <Carousel autoplay infinite>
            {this.renderSwipers()}
          </Carousel>
          : ''
        }
        </div>
        
        {/* 导航栏 */}
        <Flex className="nav">
          {this.renderNavs()}
        </Flex>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
          <Grid data={this.state.groups} columnNum={2} square={false} hasLine={false} renderItem={(item) => (
            <Flex className="group-item" justify="around" key={item.id}>
              <div className="desc">
                <p className="title">{item.title}</p>
                <span className="info">{item.desc}</span>
              </div>
              <img src={`http://118.190.160.53:8009${item.imgSrc}`} alt=""/>
            </Flex>
          )}></Grid>
        </div>
      </div>
    );
  }
}