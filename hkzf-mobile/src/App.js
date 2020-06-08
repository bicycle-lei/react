import React from 'react';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 导入首页和城市选择两个组件(页面)
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'
import AuthRoute from './components/AuthRoute'
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
        <Route path="/map" component={Map}></Route>
        <Route path="/detail/:id" component={HouseDetail}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/profile" component={Profile}></Route>
        <AuthRoute exact path="/rent" component={Rent}></AuthRoute>
        <AuthRoute path="/rent/add" component={RentAdd}></AuthRoute>
        <AuthRoute path="/rent/search" component={RentSearch}></AuthRoute>

      </div>
    </Router>
  );
}

export default App;
