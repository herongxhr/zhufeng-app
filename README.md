## 1. 初始化项目
```js
mkdir zhufeng-app
cd zhufeng-app
yarn init -y
```

## 2. 安装依赖
```js
yarn add react react-dom react-router-dom
yarn add yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react
yarn add redux react-redux redux-logger redux-promise redux-thunk 
yarn add  style-loader css-loader less-loader less url-loader
yarn add webpack webpack-cli webpack-dev-server
```

## 3. 说明
### 3.1 项目目录结构 
- src 项目源码目录
- main 入口文件
- containers 容器
- components 组件
- common 公共样式

### 3.2 存入Redux
- 服务端接口
- 用fetch获取接口方法
- 通过action将获取的数据发送到reducer
- 通过reducer改变redux中的状态


## 4.配置webpack.config.js
```js
const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
	mode:'development',
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: resolve('./dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:["@babel/preset-env","@babel/preset-react"]
					}
				},
				exclude: /node_modules/,
				
			},
			{test: /\.css$/,use: ['style-loader','css-loader']},
			{test: /\.less$/,use: ['style-loader','css-loader','less-loader']},
			{test: /\.(jpg|png|gif)$/,use: 'url-loader'},
		]
	},
	devtool: 'sourcemap',
	plugins: [
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		})
	]
}
```

## 5. 首页导航 
### 5.1 index.html
/src/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	 <link rel="stylesheet" href="http://at.alicdn.com/t/font_pgg5jafnob51m7vi.css">
	<title>珠峰课堂</title>
</head>
<body>
	<div id="root"></div>
</body>
</html>
```

### 5.2 index.less
```less
*{
	margin: 0;
	padding: 0;
}
ul,li{
	list-style: none;
}
a{
	text-decoration: none;
}
html,body{
	widows: 100%;
	height:100%;
	overflow: hidden;
}
```


### 5.3 src/main.js
src/main.js
```js
import React,{Component} from 'react';
import {render} from 'react-dom';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import Lesson from './containers/Lesson';
import Profile from './containers/Profile';
render(<Router>
	<Switch>
		<App>
			<Route exact path="/" component={Home} />
			<Route path="/lesson" component={Lesson}/>
			<Route path="/profile" component={Profile}/>
		</App>
	</Switch>
</Router>,document.querySelector('#root'));
```

### 5.4 containers/App.js
containers/App.js
```js
import React,{Component} from 'react';
import Tab from '../components/Tab';
import '../common/index.less'
export default class App extends Component {
	render() {
		return (
			<div>
				{this.props.children}
				<Tab/>
			</div>
		);
	}
}
```

### 5.5 Home/index.js
src/containers/Home/index.js
```js
import React,{Component} from 'react';
export default class Home extends Component{
	render() {
		return (
			<div>Home</div>
		)
	}
}
```
### 5.6 Tab/index.js
components/Tab/index.js
```js
import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './index.less'
export default class Tab extends Component {
	render() {
		return (
			<nav className="footer">
				<NavLink exact to="/" activeClassName="active">
					<i className="iconfont icon-xingqiu"></i>
					首页
					</NavLink>
				<NavLink to="/lesson" activeClassName="active">
					<i className="iconfont icon-react"></i>
					我的课程
					</NavLink>
				<NavLink to="/profile" activeClassName="active">
					<i className="iconfont icon-xiaolian"></i>
					个人中心</NavLink>
			</nav>
		);
	}
}
```

### 5.7 Tab/index.less
components/Tab/index.less
```less
.footer {
	position:fixed;
	width:100%;
	height:53px;
	bottom:0;
	display:flex;
	background:#FFF;
	border-top:1px solid #D5D5D5;
	a{
		display: flex;
		flex:1;
		justify-content: center;
		align-items: center;
		color:#b5b5b6;
		flex-direction: column;
		i{
			font-size:20px;
		}
		&.active{
			color:#198ae4;
		}
	}
}
```

## 6. 下拉菜单动画
### 6.1  /Home/index.js
src/containers/Home/index.js
```js
import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
export default class Home extends Component{
	render() {
		return (
			<div>
				<HomeHeader></HomeHeader>
			</div>
		)
	}
}
```

### 6.2 HomeHeader/index.js
 src/components/HomeHeader/index.js
```js
import React, { Component } from 'react';
import logo from '../../common/images/logo.png';
import './index.less'
import {CSSTransition,TransitionGroup} from 'react-transition-group';
export default class HomeHeader extends Component {
	constructor(props) {
		super(props);
		this.state={
			showList:false
		}
	}
	render() {
		return (
			<div className="home-header">
				<div className="header-menu">
					<img src={logo} alt="logo" />
					<div onClick={() => this.setState({showList:!this.state.showList})}>
						{
							this.state.showList?<i className="iconfont icon-guanbi"></i>:<i className="iconfont icon-uilist"></i>
						}
					</div>
				</div>
				<TransitionGroup>
						{
							this.state.showList&&<CSSTransition
							timeout={500}
							classNames="fade"
							  ><ul className="menu-list">
									<li type="1">Node课程培训</li>
									<li type="2">HTML课程培训</li>
									<li type="3">视频课程</li>
									<li type="4">文档课件</li>
								</ul></CSSTransition>
						}
				</TransitionGroup>	

			</div>
		);
	}
}
```

### 6.3 HomeHeader/index.less
 src/components/HomeHeader/index.less
```less
.home-header{
	background:#2A2A2A;
	height:56px;
	width:100%;
	position:fixed;
	top:0;
	left:0;
	.header-menu{
		display:flex;
		height:56px;
		justify-content: space-between;
		align-items: center;
		img{
			height:30px;
			width:105px;
			margin-left:10px;
		}
		i{
			color:#FFF;
			margin-right:10px;
		}
	}
	.menu-list{
		position: absolute;
		top:56px;
		left:0;
		width:100%;
		background-color:#000;
		li{
			border-top:1px solid #464646;
			height:43px;
			line-height:43px;
			text-align: center;
			color:#FFF;
			border-top:1px solid #464646;
			&.active{
				color:green;
			}
		}
	}
}
.fade-enter {
	opacity: 0.01;
}
.fade-enter-active {
	opacity: 1;
	transition: opacity 500ms ease-in;
}
.fade-exit {
	opacity: 1;
}
.fade-exit-active {
	opacity: 0.01;
	transition: opacity 500ms ease-in;
}

```

## 7. 使用redux修改状态
### 7.1 Home/index.js
src/containers/Home/index.js
```js
import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
class Home extends Component{
	render() {
		return (
			<div>
				<HomeHeader
					currentCategory={this.props.currentCategory}
					setCurrentCategory={this.props.setCurrentCategory}></HomeHeader>
			</div>
		)
	}
}
export default connect(state => state.home,actions)(Home);
```

### 7.2 containers/App.js
src/containers/App.js
```js
import React,{Component,Fragment} from 'react';
import Tab from '../components/Tab';
import '../common/index.less'
import  {Provider} from 'react-redux';
import store from '../store';
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Fragment>
				  {this.props.children}
				  <Tab/>
				</Fragment>
			</Provider>
		);
	}
}
```

### 7.3 Home/index.js
src/containers/Home/index.js
```js
import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
class Home extends Component{
	render() {
		return (
			<div>
				<HomeHeader
					currentCategory={this.props.currentCategory}
					setCurrentCategory={this.props.setCurrentCategory}></HomeHeader>
			</div>
		)
	}
}
export default connect(state => state.home,actions)(Home);
```

### 7.4 store/index.js
store/index.js
```js
import {createStore} from 'redux';
import reducers from './reducers';
let store=createStore(reducers);
export default store;
```

### 7.5 store/action-types.js
store/action-types.js
```js
export const SET_CURRENT_CATEGORY='SET_CURRENT_CATEGORY';
```

### 7.6 actions/home.js
store/actions/home.js
```js
import * as types from '../action-types';
export default {
	setCurrentCategory(currentCategory) {
		return {type:types.SET_CURRENT_CATEGORY,currentCategory};
	}
}
```

### 7.7 reducers/index.js
store/reducers/index.js
```js
import home from './home';
import {combineReducers} from 'redux';
export default combineReducers({
	home
});
```

### 7.8 reducers/home.js
store/reducers/home.js
```js
import * as types from '../action-types';
let initState={
	currentCategory : 0
}

export default function (state=initState,action) {
	switch (action.type) {
		case types.SET_CURRENT_CATEGORY:
			return {...state,currentCategory:action.currentCategory};
	}
	return state;
}
```

## 8.轮播图
### 8.1 Home/index.less
src/containers/Home/index.less
```js
.home{
	.main-content{
		position: fixed;
		top:56px;
		bottom:54px;
		overflow: hidden;
		overflow-y: scroll;
		width:100%;
	}
}
```

### 8.2 Home/index.js
containers/Home/index.js
```js
import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './index.less';

export default class Swiper extends Component {
	constructor(props) {
		super(props);
		this.state={index:0};
	}
	render() {
		let options={
			continuous: true,
			callback:(index)=> {
				this.setState({index});
			}
		}
		let swiper=(
			<ReactSwipe className="carousel" swipeOptions={options}>
						{this.props.sliders.map((item,index) => (
							<div key={index}><img src={item}/></div>
						))}
			</ReactSwipe>
		)
		return (
			<div className="home-sliders">
				{this.props.sliders.length>0? swiper:null}
				<div className="dots">
					{
						this.props.sliders.map((item,index) => (
							<span key={index} className={`dot ${this.state.index ==index?'active':''}`}></span>
						))
					}
				</div>
			</div>
		);
	}
}
```

### 8.3 /Home/index.less
containers/Home/index.less
```less
.home-sliders{
	position: relative;
	img{
		width:100%;
	}
	.dots{
		width:100%;
		position: absolute;
		bottom:7px;
		display: flex;
		justify-content: center;
		align-items: center;
		.dot{
			width:8px;
			height:8px;
			border-radius: 5px;
			background-color:#FFF;
			margin-left:5px;
			&.active{
				background-color:salmon;
			}
		}
	}
}
```

### 8.4 /api/index.js
/api/index.js
```less
const API_HOST='http://localhost:3000';
export const get=(url) => {
	return fetch(API_HOST+url,{
		method: 'GET',
		credentials: 'include',//跨域携带cookie
		headers: {
			accept:'application/json'
		}
	}).then(res=>res.json());
}
export const post=(url,data) => {
	return fetch(API_HOST+url,{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Accept':'application/json'
		}
	});
}
```

### 8.5 /api/home.js
/api/home.js
```less
import {get} from './index';
export const getSliders=() => {
	return get('/sliders');
}
```

### 8.6 /server/app.js
/server/app.js
```js
let express=require('express');
let app=express();
app.use(function (req,res,next) {
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Origin','http://localhost:8080');
	res.header('Access-Control-Allow-Credentials','true');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});
app.listen(3000);
let sliders=require('./mock/sliders');
app.get('/sliders',function (req,res) {
	res.json(sliders);
});
```


## 参考
- [transition-group](https://reactcommunity.org/react-transition-group/transition-group)
- [react-swipe](https://github.com/voronianski/react-swipe)