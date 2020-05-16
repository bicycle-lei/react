import React from 'react'

// class Hello extends React.Component {
//     handleClick () {
//       console.log('点击事件触发')  
//     }
//     render () {
//         return <button onClick={this.handleClick}>我是被抽离出来的组件</button>
//     }
// }
// function Hello () {
//     function handleClick (e) {
//       // react 中的事件对象叫做合成事件
//       console.log('事件对象', e)  
//       console.log('函数事件绑定触发')
//     }
//     return (
//         <button onClick={handleClick}>点击事件</button>
//     )
// }
// 有状态组件(类组件) 和 无状态组件(函数组件)
// 组建中的state 和 setState
// 状态state即数据，是组件内部的私有数据 只能在组件内部使用 值为对象
// setState 参数是对象 只修改你要改的那个数据
// class Hello extends React.Component {
//     constructor () {
//        super()
//        // 初始化state
//        this.state = {
//          count: 0,
//          test: 'a'
//        } 
//     }
//     // 简化语法初始化state
//     // state = {
//     //   count: 0
//     // }
//     render () {
//       return (
//         <div>
//           <button onClick={() => this.setState({count: this.state.count + 1})}>计数器+1</button>  
//           <h1>计算器：{this.state.count}</h1>
//         </div>
//       ) 
//     }
// }

// 从jsx中抽离逻辑到单独的方法中 jsx只负责结构描述
// 解决this指向问题 
class Hello extends React.Component {
  constructor () {
      super()
      this.state = {
       count: 0
      }
      // this.addCount = this.addCount.bind(this) // 第二种使用es5的bind方法解决this问题
  }
  //  addCount () {
  //   // 事件处理函数中没有this
  //   this.setState({
  //     count: this.state.count + 1
  //   })
  //  }
  addCount = () => { // 第三种使用class的实例方法 推荐使用
    this.setState({
      count: this.state.count + 1
    })
  }
  render () {
     return (
         <div>
           {/* <button onClick={() => this.addCount()}>点击</button> 使用箭头函数解决this问题*/}
           <button onClick={this.addCount}>点击</button>
           <h2>{this.state.count}</h2>
         </div>
     )
  }
}
export default Hello