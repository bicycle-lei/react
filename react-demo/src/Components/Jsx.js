import React from 'react'
/*
  jsx 是createElement方法的语法糖
  通过插件@bable/preset-react插件编译为createElement

  组件更新机制
  父组件重新渲染时 也会重新渲染子组件及其后代组件

  组件性能优化
  减轻state: 只存储跟组件渲染相关的数据 其他数据可以放在this中
  避免不必要的重新渲染(shouldComponentUpdate(nextProps, nextState)) shouldComponentUpdate --> render 如果在这个函数中返回false render就不执行
  纯组件 PureComponent 自动实现了shouldComponentUpdate
  内部的比较方式是shallow compare 浅层对比
  浅层对比 比较简单类型用的是全等比较 包括值和类型 比较引用类型时 只比较存储的指针地址 所以需要用新对象修改setState中的值
  
  DOM Diff
  只要state变化就重新渲染视图
  理想状态 部分更新 只更新变化的地方
*/
// class Hello extends React.Component {
//   state = {
//     count: 0
//   }
//   addCount = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log(nextProps)
//     console.log('更新前的状态：' + this.state)
//     console.log('更新后的状态：' + nextState)
//     return true // true 重新渲染 false 不渲染 更新state触发
//   }
//   render () {
//     return (
//       <div>
//         <h1>{this.state.count}</h1>
//         <button onClick={this.addCount}>点击按钮+1</button>
//       </div>
//     )
//   }
// }
class Randomm extends React.Component {
  state = {
    count: 0
  }
  handleClick = () => {
    this.setState(() => {
     return {
       count: '0'
     }
    })
  }
  // 因为两次生成的随机数相同 此时不需要重新渲染
  // shouldComponentUpdate 必须有明确的true or false 返回
  // shouldComponentUpdate (nextProps, nextState) {
    // if (nextState.count === this.state.count) {
    //   return false
    // } else {
    //   return true
    // }
    // 优化
    // return nextState.count !== this.state.count
    // 使用nextProps
  // }
  // render方法的调用并不意味着浏览器中重新渲染
  // rander方法要使用diff比较虚拟DOM是否有变化
  // 如果有变化只更改变化的部分到页面
  render () {
    // console.log('render执行了')
    return (
      <div>
        <NumberBox count={this.state.count}/>
        <NumberBox1 count={this.state.count}/>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
class NumberBox extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.count !== this.props.count
  }
  render () {
    // console.log('子组件')
    return (<h1>随机数：{this.props.count}</h1>)
  }
}
// 纯组件
class NumberBox1 extends React.PureComponent {
  render () {
    console.log('自动实现不必要更新')
    return (<h1>随机数：{this.props.count}</h1>)
  }
}
class App extends React.Component {
  render () {
    return (
      <div>
        {/* <Hello a={1}/> */}
        <Randomm/>
      </div>
    )
  }
}
export default App 