import React from 'react';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

// 导入首页和城市选择两个组件(页面)
import Home from './pages/Home'
import CityList from './pages/CityList'

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由 */}
        {/* 默认路由实现重定向 */}
        <Route exact path="/" render={() => <Redirect to="/home" />}></Route>

        {/* 父路由 */}
        <Route path="/home" component={Home}></Route>
        
        <Route path="/citylist" component={CityList}></Route>
      </div>
    </Router> 
  );
}

export default App;
