// 1 导入react
import React from 'react'
import ReactDOM from 'react-dom'

// 引入css
import './index.css'
import Hello from './Hello'
// 2 创建react元素
// const title = React.createElement('h1', null, 'Hello React 脚手架')

// 4 jsx的基本使用
//   React元素的属性名使用驼峰命名法
//   建议使用小括号包裹jsx
//   没有子节点的元素可以写单标签
//   jsx节点可以插入数据 使用{} 单大括号 而且可以执行表达式 但是不能出现语句和对象
// const name = 'jimmy'
// const age = 27

// 函数调用表达式
// const sayHi = () => 'Hi~'

// jsx自身也是一个表达式
// const isdiv = (<div>我是一个div</div>)

// const title = (
//   <h1 className="title">
//     Hello JSX, {name}, 年龄 {age + 1} {sayHi()} {isdiv}
//     <span />
//   </h1> 
// )
// 条件渲染 
// const isLoading = true
// if/else 或者三元运算符
// const loadData = () => {
//   if (isLoading) {
//     return <div>loading ...</div>
//   }
//   return <div>loading end 数据加载完成</div>
// }

// 逻辑与可以达成隐藏与现实
// const loadData1 = () => {
//   return isLoading && (<div>loading ...</div>)
// }
// const title1 = (
//   <h1>
//     条件渲染:
//     {loadData()}
//     {loadData1()}
//   </h1>
// )

// 列表渲染
// const songs = [
//   {id: 1, name: '痴心绝对'},
//   {id: 2, name: '像我这样的人'},
//   {id: 3, name: '南山南'}
// ]

// const list = (
//   <ul>
//     {songs.map(item => <li key={item.id}>{item.name}</li>)}
//   </ul>
// )
// // 样式处理 行内样式 类名
// const styleh1 = (
//   <h1 style={{color: 'red'}}>
//     行内样式
//   </h1>
// )

// const styleh2 = (
//   <h2 className="title">
//     类名样式
//   </h2>
// )

// jsx 总结
//   1.jsx 是react的核心
//   2.jsx 在js中写html
//   3.jsx js表达式 条件渲染 列表渲染 可以写任何ui
//   4.jsx 用className写样式
//   5.jsx 完全利用js语言自身的能力

// 函数组件(使用函数创建的组件)
//   函数名必须以大写字母开头
//   函数中必须有返回值
// function Hello () {
//   return (
//     <div>这是我的第一个函数组件</div>
//   )
// }

// 使用类创建组件
//   类名称也必须以大写字母开始
//   类组件必须继承React.Component父类 从而可以使用父类中提供的方法或属性
//   类组件必须提供render()方法
//   render()方法必须有返回值 表示该组件的结构
// 组件作为一个独立的个体 一般都会放到一个单独的js文件中
// class Hello extends React.Component {
//   render () {
//     // return <div>这是我的第一个类组件</div>
//     return null
//   }
// }

// 3 渲染react元素
ReactDOM.render(<Hello/>, document.getElementById('root'))
