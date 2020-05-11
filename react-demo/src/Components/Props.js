import React from 'react'
import PropTypes from 'prop-types'
/*
  props 
    可以给组件传递任意类型数据
    props是只读对象
    使用类组件时如果写了构造函数construction 要将props传递给super() 否则构造函数中获取不到props
  组件之间的通讯
    1. 父组件传递给子组件
    2. 子组件传递给父组件
    3. 子组件传递给子组件 (状态提升)
*/
// 函数组件的props 通过参数获取一个对象
// const Props = (props) => {
//   //props 是一个对象
//    return (
//      <div>
//        <h1>props: 姓名：{props.name}, 年龄：{props.age}</h1>
//      </div>
//     )
// }

// 类组件的props 通过this获取传递数据
// class Props extends React.Component {
//   render () {
//     return (
//       <div>
//         <h1>props: 姓名：{this.props.name} 年龄：{this.props.age}</h1>
//       </div>
//     )
//   }
// }

// 使用类组件时如果写了构造函数construction 要将props传递给super() 否则构造函数中获取不到props
// class Props extends React.Component {
//   // 如果写了构造函数 推荐使用props作为constructor的参数
//   constructor (props) {
//     // 如果不传参这里就获取不到
//     super (props)
//   }
//   render () {
//     return (
//       <div>
//         <h1>props: 姓名：{this.props.name} 年龄：{this.props.age}</h1>
//       </div>
//     )
//   }
// }

// 子组件
//  const Child = (props) => {
//    return (
//      <div>
//       子组件接收父组件传参：{props.name}
//      </div>
//    )
//  }

 // 子组件
//  class Child extends React.Component {
//     state = {name: 'jimmy'}
//     handleClick = () => {
//       // 子组件调用父组件回调函数
//       this.props.callBackFuncton('我是你的子组件:'+ this.state.name)
//     }
//     render () {
//       return (
//         <button onClick={this.handleClick}>点击我给父组件传参</button>
//       )
//     }
//  }

// class Child1 extends React.Component {
//   render () {
//     return (
//     <div>计数器：{this.props.count}</div>
//     )
//   }
// }
// class Child2 extends React.Component {
//   handleClick = () => {
//     let count = this.props.count
//     this.props.setCount(++count)
//   }
//   render () {
//     return (
//       <div>
//         <button onClick={this.handleClick}>计数器+1</button>
//       </div>
//     )
//   }
// }
// context 跨组件传递数据
// 创建context 获取两个组件 Provider提供数据 Consumer消费数据
// const {Provider, Consumer} = React.createContext()
// class Node extends React.Component {
//   render () {
//     return (
//     <div>
//       <SubNode/>
//     </div>
//     )
//   }
// }

// class SubNode extends React.Component {
//   render () {
//     return (
//     <div>
//        <Child/>
//     </div>
//     )
//   }
// }

// class Child extends React.Component {
//   render () {
//     return (
//       <div>
//         <Consumer>
//           {data => <h1>data参数表示接收到的数据：{data}</h1> }
//         </Consumer>
//       </div>
//     )
//   }
// }

// // props的 children  值为组件的子节点
// class Hello extends React.Component {
//   render () {
//     return (
//     <div>{this.props.children}</div>
//     )
//   }
// }

// props的校验
// 安装prop-types(yarm add prop-typs / npm i props-types)
// 导入prop-types包
// 使用 组件名.propTypes= {} 添加校验规则
// 规则常见类型 array bool func number object string
// 或React元素类型 element
// 必填项 isRequired   PropTypes.array.isRequired
// 特定的对象结构 shaps() PropTypes.shape({})
const PropType =  (props) => {
  return (
  <h1>Hi, {props.colors[1]} {props.default} 这是对象{props.filter.price}</h1>
  )
}
// 约定colors的属性为array 如果不是就报错
PropType.propTypes = {
  colors: PropTypes.array,
  a: PropTypes.number.isRequired,
  fn: PropTypes.func,
  tag: PropTypes.element,
  filter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number.isRequired
  }).isRequired
}
// props 的默认值
PropType.defaultProps = {
   default: '我是组件默认值'
}

// 父组件
class App extends React.Component {
  state = {
    name: 'jimmy',
    age: 27,
    childName: '',
    count: 0,
    fil: {price: 5}
  }
  //提供回调函数 用于接收子组件传递过来的数据
  getChildMst = (res) => {
    this.setState({
      childName: res
    })
  }

  //Child2改变count 传给 Child1
  setCount = (res) => {
    this.setState({
      count: res
    })
  }
  render () {
    return (
      <div>
        {/* <Props name={this.state.name} age={this.state.age}/> */}
        {/* 父组件传递参数name */}
        <br/>
        {/* <Child name={this.state.name} callBackFuncton={this.getChildMst}/>  */}
        <br/>
        {/* 父组件获取子组件名称: */}
        {/* {this.state.childName} */}
        {/* <Child1 count={this.state.count}/>
        <Child2 count={this.state.count} setCount={this.setCount}/> */}
        {/* <Provider value="我是根组件App">
          <Node/>
        </Provider>
        <Hello>我是有子节点的组件</Hello> */}
        <PropType colors={['red', 'yellow']} a={1} filter={this.state.fil}/>
      </div>
    )
  }
}
export default App