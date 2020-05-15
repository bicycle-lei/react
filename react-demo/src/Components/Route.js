import React from 'react'

/*
  路由的使用方法
  1.npm install react-router-dom
  Router组件：包裹整个应用 一个React应用只需要使用一次
*/
// 2.导入组件
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
// import {HashRouter as Router, Route, Link} from 'react-router-dom'
// 3.使用Router组件包裹整个组件

// const First = () => (
//   <div>页面一的内容</div>
// )
// const Home = () => (
//   <div>这是Home组件</div>
// )
// const Root = () => (
//   <Router>
//     <div>
//       <h1>React 路由基础</h1>
//       {/*4. 路由入口 */}
//       <Link to="/first">页面一</Link><br/>
//       <Link to="/home">Home</Link>

//       {/*5. 路由出口 */}
//       <Route path="/first" component={First}></Route>
//       <Route path="/home" component={Home}></Route>
//     </div>
//   </Router>
// )
class Login extends React.Component {
  handleLogin = () => {
    // 编程式导航实现路由跳转
    this.props.history.push('/home')
  }
  render () {
    return (
      <div>
        <p>登录页面：</p>
        <button onClick={this.handleLogin}>登录</button>
      </div>
    )
  }
}

const Home = (props) => {
  const handleBack = () => {
    // 编程式导航实现路由跳转
    props.history.go(-1)
  }
  return (
    <div>
      <h2>我是后台首页</h2>
      <button onClick={handleBack}>返回登录也</button>
    </div>
  )
}
// 默认路由 进入页面时就会匹配的路由
// 默认路由path为 /

// 模糊匹配模式 
// 只要pathname 能匹配到path 就会匹配成功

// 精确匹配
// 给Route 组件添加exact 属性 让其变成精确匹配模式
// 只有当path和pathname完全匹配时才会匹配成功
class App extends React.Component {
  render () {
    return (
      <Router>
        <Link to="/login">去登陆页面</Link>

        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/" component={Login}></Route>
      </Router>
    )
  }
}
export default App 