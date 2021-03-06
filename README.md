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
yarn add redux react-redux redux-logger redux-promise redux-thunk react-router-redux
yarn add  style-loader css-loader less-loader less url-loader
yarn add webpack webpack-cli webpack-dev-server
yarn add express body-parser express-session lodash
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

### 3.3 样式
- [link](http://at.alicdn.com/t/font_pgg5jafnob51m7vi.css)
- .icon-uilist
- .icon-xiaolian
- .icon-xiugaimima
- .icon-book
- .icon-fanhui
- .icon-guanbi
- .icon-guanyuwomen
- .icon-jianjie
- .icon-renturn
- .icon-xingqiu
- .icon-kecheng-copy
- .icon-common-changjianwenti-copy
- .icon-react

![iconfont](http://img.zhufengpeixun.cn/iconfont.png)

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

## 8. 课程列表
### 8.1 HomeHeader/index.js
/components/HomeHeader/index.js
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
	setCurrentCategory=(event) => {
		let type = event.target.dataset.type;
		this.setState({
			showList:false
		},() => {
			this.props.setCurrentCategory(type);
			this.props.fetchLessons();
		});
	}
	render() {
		let currentCategory=this.props.currentCategory;
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
						><ul className="menu-list" onClick={event=>this.setCurrentCategory(event)}>
								<li data-type="react" className={currentCategory == "react"?"active":""}>React课程</li>
								<li data-type="vue" className={currentCategory=="vue"? "active":""}>Vue课程</li>
								</ul></CSSTransition>
						}
				</TransitionGroup>	

			</div>
		);
	}
}
```

### 8.2 Home/index.js
src/containers/Home/index.js
```js
import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
import './index.less';
import Swiper from '../../components/Swiper';
import Loading from '../../components/Loading';
import {upLoadMore} from '../../utils';
class Home extends Component{
	componentDidMount() {
		this.props.getSliders();
		this.props.getLessons();
		upLoadMore(this.mainContent,this.props.getLessons);
	}
	render() {
		const {currentCategory,setCurrentCategory,fetchLessons,lessons:{list,loading,hasMore}}=this.props;
		return (
			<div className="home">
				<HomeHeader
					currentCategory={currentCategory}
					fetchLessons={fetchLessons}
					setCurrentCategory={setCurrentCategory} />
				<div className="main-content" ref={ref=>this.mainContent = ref}>
					<Swiper sliders={this.props.sliders} />
					<div className="lesson-list" >
						<div><i className="iconfont icon-kecheng-copy"></i>全部课程</div>
						{
							list.map(lesson => (
								<div key={lesson.id} className="lesson">
									<img src={lesson.poster} />
									<p>{lesson.title}</p>
									<p>{lesson.price}</p>
								</div>
							))
						}
					</div>
					{
						loading? <Loading />:(hasMore?<div className="load-more" onClick={this.props.getLessons}>{hasMore?'点击加载更多':'到底了'}</div>:null)
					}
				</div>
				
			</div>
		)
	}
}
export default connect(state => state.home,actions)(Home);
```

### 8.3 store/action-types.js
src/store/action-types.js
```js
export const SET_CURRENT_CATEGORY='SET_CURRENT_CATEGORY';

export const SET_SLIDERS='SET_SLIDERS';

export const SET_LOADING_LESSONS = 'SET_LOADING_LESSONS';
export const SET_LESSONS='SET_LESSONS';
export const FETCH_LESSONS='FETCH_LESSONS';
```

### 8.4 actions/home.js
src/store/actions/home.js
```js
fetchLessons() {
		return (dispatch,getState) => {
			let {currentCategory,lessons: {limit,loading}}=getState().home;
			if (!loading) {
				dispatch({type:types.SET_LOADING_LESSONS,payload:true});
				getLessons(currentCategory,0,limit).then(payload => {
					dispatch({
						type: types.FETCH_LESSONS,
						payload
					});
				});
			}
			
		}
	}
```

### 8.5 reducers/home.js
src/store/reducers/home.js
```js
case types.FETCH_LESSONS:
			console.log(action.payload);
			return {
				...state,
				lessons: {
					...state.lessons,
					loading: false,
					hasMore:action.payload.hasMore,
					list: action.payload.list,
					offset:action.payload.list.length
				}
			};
```

### 8.6 src/utils.js
src/utils.js
```js
export function upLoadMore(domEle,loadMore) {
	let timer;
	domEle.addEventListener('scroll',function () {
		if (timer) clearInterval(timer);
		timer=setTimeout(function () {
			let height=domEle.clientHeight;
			let scrollHeight=domEle.scrollHeight;
			let scrollTop=domEle.scrollTop;
			if (scrollTop + height + 10 > scrollHeight) {
				loadMore();
			}
		},100);
	});
}
```

## 9. 记录滚动条位置
### 9.1 src/utils.js
src/utils.js
```js
export const store =  {
	set(key,val) {
		sessionStorage.setItem(key,val);
	},
	get(key) {
		return sessionStorage.getItem(key);
	}
}
```

### 9.2 containers/Home/index.js
containers/Home/index.js
```js
componentDidMount() {
		if (this.props.lessons.list.length == 0) {
			this.props.getSliders();
		    this.props.getLessons();
		} else {
			this.mainContent.scrollTop=store.get('scrollTop');
		}
		upLoadMore(this.mainContent,this.props.getLessons);
	}
	componentWillUnmount() {
		store.set('scrollTop',this.mainContent.scrollTop);
	}
```

## 10.下拉刷新
### 10.1 src/utils.js
src/utils.js
```js
export function downRefresh(domEle,callback) {
	let startY;//开始的纵坐标
	let distance;//纵坐标移动的距离
	let originTop=domEle.offsetTop;//刚开始的距离顶部的偏移量
	domEle.addEventListener('touchstart',touchStart);
	function touchStart(event) {
		startY=event.touches[0].pageY;//按下的那个点的初始值
		//不是处于回弹中并且没有向上滚动的距离
		if (domEle.offsetTop == originTop && domEle.scrollTop == 0) {
			domEle.addEventListener('touchmove',touchMove);
		    domEle.addEventListener('touchend',touchEnd);
		}
		
		function touchMove(event) {
			let pageY=event.touches[0].pageY;
			if (pageY > startY) {//如果是下拉
				distance=pageY-startY;//计算距离
				//新的top值等于最原始的top+触摸移动的距离
				domEle.style.top=originTop+distance+'px';
			} else {
				domEle.removeEventListener('touchmove',touchMove);
				domEle.removeEventListener('touchend',touchEnd);
			}
		}
		function touchEnd(event) {
			domEle.removeEventListener('touchmove',touchMove);
			domEle.removeEventListener('touchend',touchEnd);
			let timer = setInterval(function () {
				domEle.style.top=originTop+(--distance)+'px';
				if (distance<1) {
					domEle.style.top=originTop+'px';
					clearInterval(timer);
				}
			},14);
			if (distance > 50) {
				callback();
			}
		}

	}
}
```

### 10.2 Home/index.js
src/containers/Home/index.js
```diff
+ downRefresh(this.mainContent,this.props.fetchLessons);
```

## 11. 改进Loading
### 11.1 Loading/index.js
components/Loading/index.js
```js
import React, {Component} from 'react';
import './index.less'
export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
         <div className="bars">
           <div className="bar"></div>
           <div className="bar"></div>
           <div className="bar"></div>
           <div className="bar"></div>
           <div className="bar"></div>
           <div className="bar"></div>
           <div className="cover"></div>
         </div>
      </div>
    )
  }
}
```

### 11.2 Loading/index.less
Loading/index.less
```js
.loading{
	position: relative;
	.bars{
	  width:43px;
	  height:43px;
	  position: relative;
	  margin:0 auto;
	  .bar{
		position: absolute;
		top:0;
		left:20px;
		width:3px;
		height:43px;
		&::before{
		  width:3px;
		  content:'';
		  display:block;
		  height:21.5px;
		  background-color: #000;
		  border-radius: 10px;
		}
		&::after{
		  width:3px;
		  content:'';
		  display:block;
		  height:21.5px;
		  background-color: #000;
		  border-radius: 10px;
		}
		&:nth-child(2){
		  transform: rotate(30deg);
		}
		&:nth-child(3){
		  transform: rotate(60deg);
		}
		&:nth-child(4){
		  transform: rotate(90deg);
		}
		&:nth-child(5){
		  transform: rotate(120deg);
		}
		&:nth-child(6){
		  transform: rotate(150deg);
		}
		&:nth-child(1):before{
		  animation: fade 1.2s 0s infinite;
		}
		&:nth-child(2):before{
		  animation: fade 1.2s .1s infinite;
		}
		&:nth-child(3):before{
		  animation: fade 1.2s .2s infinite;
		}
		&:nth-child(4):before{
		  animation: fade 1.2s .3s infinite;
		}
		&:nth-child(5):before{
		  animation: fade 1.2s .4s infinite;
		}
		&:nth-child(6):before{
		  animation: fade 1.2s .5s infinite;
		}
		&:nth-child(1):after{
		  animation: fade 1.2s .6s infinite;
		}
		&:nth-child(2):after{
		  animation: fade 1.2s .7s infinite;
		}
		&:nth-child(3):after{
		  animation: fade 1.2s .8s infinite;
		}
		&:nth-child(4):after{
		  animation: fade 1.2s .9s infinite;
		}
		&:nth-child(5):after{
		  animation: fade 1.2s 1.0s infinite;
		}
		&:nth-child(6):after{
		  animation: fade 1.2s 1.1s infinite;
		}
	  }
	  .cover{
			position: absolute;
			top:50%;
			left:50%;
			margin-left:-10px;
			margin-top:-10px;
			width:20px;
			height:20px;
			border-radius: 50%;
			background-color: #FFF;
	  }
	}
  }
  @keyframes fade {
	0%{opacity:.1}
	100%{opacity: 1}
  }
```

### 11.3 containers/Home/index.js
containers/Home/index.js
```js
import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
import './index.less';
import Swiper from '../../components/Swiper';
import Loading from '../../components/Loading';
import {upLoadMore,store,downRefresh} from '../../utils';
class Home extends Component{
	componentDidMount() {
		if (this.props.lessons.list.length == 0) {
			this.props.getSliders();
		    this.props.getLessons();
		} else {
			this.mainContent.scrollTop=store.get('scrollTop');
		}
		upLoadMore(this.mainContent,this.props.getLessons);
		downRefresh(this.mainContent,this.props.fetchLessons);
	}
	componentWillUnmount() {
		store.set('scrollTop',this.mainContent.scrollTop);
	}
	render() {
		const {currentCategory,setCurrentCategory,fetchLessons,lessons:{list,loading,hasMore}}=this.props;
		console.log('loading',loading,hasMore,'hasMore');
		return (
			<div className="home">
				<HomeHeader
					currentCategory={currentCategory}
					fetchLessons={fetchLessons}
					setCurrentCategory={setCurrentCategory} />
				<div className="main-content" ref={ref=>this.mainContent = ref}>
					<Swiper sliders={this.props.sliders} />
					<div className="lesson-list" >
						<div><i className="iconfont icon-kecheng-copy"></i>全部课程</div>
						{
							list.map(lesson => (
								<div key={lesson.id} className="lesson">
									<img src={lesson.poster} />
									<p>{lesson.title}</p>
									<p>{lesson.price}</p>
								</div>
							))
						}
					</div>
					{
						loading? <Loading />:<div className="load-more" onClick={this.props.getLessons}>{hasMore?'点击加载更多':'到底了'}</div>
					}
				</div>
				
			</div>
		)
	}
}
export default connect(state => state.home,actions)(Home);
```

### 11.4 Home/index.less
containers/Home/index.less
```less
.home{
	.main-content{
		position: fixed;
		top:56px;
		bottom:54px;
		overflow: hidden;
		overflow-y: scroll;
		width:100%;
		.lesson-list{
			padding:10px 7.5px;
			margin:0 auto;
			.lesson{
				border-radius: 5px;
				box-shadow: 1px 1px 2px 1px #c5c5c5,-1px -1px 2px 1px #c5c5c5;
				overflow: hidden;
				text-align:center;
				margin:18px 0;
				img{
					width:100%;
					border-radius: 5px 5px 0px 0px;
				}
				p{
					line-height: 200%;
				}
				p:nth-child(2){
					color:#bbbbbb;
				}
				p:nth-child(3){
					color:#ed3a3a;
				}
			}
		}
		.load-more{
			height:30px;
			line-height:30px;
			width:100%;
			text-align:center;
			border-radius: 5px;
			background-color:green;
		}
	}
}
```

## 12. 课程详情
### 12.1 containers/Detail/index.js
containers/Detail/index.js
```js
import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import './index.less'
export default class Detail extends Component{
	render() {
		return this.props.location.state?<div class="lesson-detail">
			<img src={this.props.location.state.poster} />
			<video src={this.props.location.state} poster={this.props.location.state.poster} controls></video>
			<p>{this.props.location.state.title}</p>
			<p>{this.props.location.state.price}</p>
	    </div>:<Redirect to="/"/>
	}
}

```

### 12.2 Detail/index.less
containers/Detail/index.less
```less
.lesson-detail{
	img,video{
		width:100%;
	}
	p{
		text-align: center;
		line-height: 200%;
		&:nth-of-type(1){
			color:#CCC;
		}
		&:nth-of-type(2){
			color:red;
		}
	}
}
```

## 13. 个人中心
### 13.1 Profile/index.js
src/containers/Profile/index.js
```js
import React,{Component} from 'react';
import './index.less'
import profile from '../../common/images/profile.png';
import {Link} from 'react-router-dom';
export default class Profile extends Component{
	render() {
		return (
			<div className="profile">
				<div className="profile-bg">
					<img src={profile}/>
					<div className="login-btn">
						<Link to="/login">登录</Link>
					</div>
				</div>
			</div>
		)
	}
}

```

### 13.2 Profile/index.less
src/containers/Profile/index.less
```less
.profile{
	.profile-bg{
		width:100%;
		height:223px;
		background-image: url(../../common/images/login_bg.png);
		background-size:contain;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img{
			width:60px;
			height:60px;
			border-radius:50%;
		} 
		.login-btn{
			width:60px;
			height:25px;
			border-radius: 10px;
			background:#FFF;
			color:#188AE4;
			line-height:25px;
			text-align:center;
			font-size:13px;
			font-weight: bold;
			margin-top:10px;
			a{
				text-decoration: none;
				&:link{
					text-decoration: none;
					color:#188AE4;
				}
			}
		}
	}
}
```

### 13.3 src/main.js
src/main.js
```js
<Route path="/detail" component={Detail} />
```

## 14. 导航菜单
### 14.1 NavBar/index.js 
components/NavBar/index.js 
```js
import React, {Component} from 'react';
import './index.less'
import {withRouter} from 'react-router-dom';
class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
			{this.props.title}
			<i className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></i>
      </div>
    )
  }
}
export default withRouter(NavBar);
```

### 14.2 Login/index.js
containers/Login/index.js
```js
import React,{Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
export default class Login extends Component{
	render() {
		return (
			<div className="login-panel">
				<NavBar title="登录"/>

			</div>
		)
	}
}
```

## 15. 登录
### 15.1 Login/index.js
src/containers/Login/index.js
```js
import React,{Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import profile from '../../common/images/profile.png';
export default class Login extends Component{
	render() {
		return (
			<div className="login-panel">
				<NavBar title="登录" />
				<div className="login-logo">
				  <img  src={profile} />
				</div>
				<input type="text" placeholder="手机号" />
				<input type="text" placeholder="密码" />
				<Link to="/reg">前往注册</Link>
			    <button>登&nbsp;录</button>
			</div>
		)
	}
}

```

### 15.2 Login/index.less
src/containers/Login/index.less
```less
.login-panel{
	padding:56px 17px;
	display:flex;
	flex-direction: column;
	position: absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background:#FFF;
	z-index: 20;

	.login-logo{
		display:flex;
		height:223px;
		width:100%;
		justify-content: center;
		align-items: center;
		img{
			height:62px;
			width:62px;
		}
	}
	input{
		width:100%;
		outline:none;
		border:1px solid #CCC;
		border-radius: 5px;
		height:42px;
		margin-bottom:20px;
		padding-left:10px;
		box-sizing: border-box;
	}
	a{
		color:#188AE4;
		margin-bottom:20px;
	}
	button{
		width:100%;
		background-color: #188AE4;
		color:#FFF;
		height:40px;
		line-height: 40px;
		text-align:center;
		font-size:16px;
		border-radius:5px;
	}
}
```

### 15.3 Reg/index.js
containers/Reg/index.js
```js
import React,{Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import profile from '../../common/images/profile.png';
export default class Login extends Component{
	render() {
		return (
			<div className="login-panel">
				<NavBar title="注册" />
				<div className="login-logo">
				  <img  src={profile} />
				</div>
				<input type="text" placeholder="手机号" />
				<input type="text" placeholder="密码" />
				<Link to="/login">前往登录</Link>
			    <button>注&nbsp;册</button>
			</div>
		)
	}
}

```

### 15.4 containers/Reg/index.less
containers/Reg/index.less
```less
.login-panel{
	padding:56px 17px;
	display:flex;
	flex-direction: column;
	position: absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background:#FFF;
	z-index: 20;

	.login-logo{
		display:flex;
		height:223px;
		width:100%;
		justify-content: center;
		align-items: center;
		img{
			height:62px;
			width:62px;
		}
	}
	input{
		width:100%;
		outline:none;
		border:1px solid #CCC;
		border-radius: 5px;
		height:42px;
		margin-bottom:20px;
		padding-left:10px;
		box-sizing: border-box;
	}
	a{
		color:#188AE4;
		margin-bottom:20px;
	}
	button{
		width:100%;
		background-color: #188AE4;
		color:#FFF;
		height:40px;
		line-height: 40px;
		text-align:center;
		font-size:16px;
		border-radius:5px;
	}
}
```

## 16. 实现会话
### 16.1 server/app.js
```js
let express=require('express');
let _=require('lodash');
let bodyParser = require('body-parser');
let session = require('express-session');
let app=express();

app.use(session({
	resave:true,
	secret:'zfpx',
	saveUninitialized:true
}));
app.use(bodyParser.json());
app.use(function (req,res,next) {
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Origin','http://localhost:8080');
	res.header('Access-Control-Allow-Headers','Content-Type,Accept');
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
let lessons=require('./mock/lessons');
app.get('/lessons/:type',function (req,res) {
	setTimeout(function () {
		let type=req.params.type;
		let {offset,limit}=req.query;
		offset=isNaN(offset)? 0:parseInt(offset);
		limit=isNaN(limit)? 5:parseInt(limit);
		let data=_.cloneDeep(lessons);
		if (type!='all') {
			data=data.filter(lesson=>lesson.type==type);
		}
		let list=data.slice(offset,offset+limit);
		list.forEach(item => {
			item.title=item.title+Math.random();
		});
		let hasMore=offset+limit<data.length;
		res.json({
			hasMore,
			list
		});
	},500);
	
});
let users = [];
//users=[{username:'zfpx',password:'123'}]
app.post('/api/reg',function(req,res){
	let user = req.body;//取得请求体
	let oldUser = users.find(item=>item.username == user.username);
	if(oldUser){
	  //两种异常 1.服务异常 2.业务异常
	  res.json({code:1,error:'用户名重复'});//如果失败有一个error
	}else{
	  users.push(user);
	  // code=0表示一切正常成功，非0表示失败
	  res.json({code:0,success:'注册成功',user});//如果成功有一个success
	}
  });
  app.post('/api/login',function(req,res){
	 let user = req.body;//取得登录的请求体
	 let oldUser = users.find(item=>item.username==user.username&&item.password==user.password);
	 if(oldUser){
	   //如果找到了用户名和密码相同的用户，表示登录成功,把用户存放入session中
	   req.session.user = oldUser;
	   res.json({code:0,success:"登录成功",user});
	 }else{
	   res.json({code:1,error:'用户名或密码错误'});
	 }
  });
  app.get('/api/logout',function(req,res){
	 req.session.user = null;
	 res.json({code:0,success:'退出成功'});
  });
  //验证用户是否登录
  app.get('/api/validate',function(req,res){
	 if(req.session.user){
	   res.json({code:0,user:req.session.user});
	 }else{
	   res.json({code:1,error:'此用户未登录'});
	 }
  });
```

### 16.2 src/api/index.js
src/api/index.js
```js
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
	}).then(res=>res.json());
}
```

### 16.3 Login/index.js
src/containers/Login/index.js
```js
import React,{Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import profile from '../../common/images/profile.png';
import {connect} from 'react-redux';
import actions from '../../store/actions/session';
class Login extends Component{
	handleLogin = ()=>{
		let username = this.username.value;
		let password = this.password.value;
		this.props.login({username,password});
	  }
	render() {
		return (
			<div className="login-panel">
				<NavBar title="登录" />
				<div className="login-logo">
				  <img  src={profile} />
				</div>
				<input ref={input=>this.username=input}  type="text" placeholder="手机号" />
				<input ref={input=>this.password=input} type="text" placeholder="密码" />
				<Link to="/reg">前往注册</Link>
				<button onClick={this.handleLogin}>登&nbsp;录</button>
			</div>
		)
	}
}

export default connect(
	state=>state.session,
	actions
)(Login);
```

### 16.4 Profile/index.js
src/containers/Profile/index.js
```js
import React,{Component} from 'react';
import './index.less'
import profile from '../../common/images/profile.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../store/actions/session';
class Profile extends Component{
	render() {
		return (
			<div className="profile">
				<div className="profile-bg">
					<img src={profile}/>
					<div className="login-btn">
						
						{this.props.user?this.props.user.username:<Link to="/login">登录</Link>}
					</div>
				</div>
			</div>
		)
	}
}
export default connect(
	state=>state.session
)(Profile);
```

### 16.5 Reg/index.js
src/containers/Reg/index.js
```js
import React,{Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import profile from '../../common/images/profile.png';
import {connect} from 'react-redux';
import actions from '../../store/actions/session';
class Reg extends Component{
	handleReg = ()=>{
		let username = this.username.value;
		let password = this.password.value;
		this.props.reg({username,password});
	  }
	render() {
		return (
			<div className="login-panel">
				<NavBar title="注册" />
				<div className="login-logo">
				  <img  src={profile} />
				</div>
				<input ref={input=>this.username=input}  type="text" placeholder="手机号" />
				<input ref={input=>this.password=input} type="text" placeholder="密码" />
				<Link to="/login">前往登录</Link>
				<button
					 onClick={this.handleReg}
				>注&nbsp;册</button>
			</div>
		)
	}
}
export default connect(
	state=>state.session,
	actions
  )(Reg);

```

### 16.6 src/store/action-types.js
src/store/action-types.js
```js

export const SET_CURRENT_CATEGORY='SET_CURRENT_CATEGORY';

export const SET_SLIDERS='SET_SLIDERS';

export const SET_LOADING_LESSONS = 'SET_LOADING_LESSONS';
export const SET_LESSONS='SET_LESSONS';
export const FETCH_LESSONS='FETCH_LESSONS';

//注册
export const REG = 'REG';
//登录
export const LOGIN = 'LOGIN';
//退出
export const LOGOUT = 'LOGOUT';

//清空消息
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const VALIDATE = 'VALIDATE';
```

### 16.7 store/index.js
src/store/index.js
```js
import {createStore,applyMiddleware,compose } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {routerMiddleware} from 'react-router-redux';
import history from './history';
let router = routerMiddleware(history);

let store =applyMiddleware(router,thunk,promise,logger)(createStore)(reducers);
window.store = store;
export default store;
```

### 16.8 reducers/index.js
src/store/reducers/index.js
```js
import home from './home';
import session from './session';
import {combineReducers} from 'redux';
export default combineReducers({
	home,
	session
});
```

### 16.9 api/session.js
src/api/session.js
```js
import {get,post} from './index';
//注册
export function reg(user){
  return post('/api/reg',user);//{username,password}
}
//登录
export function login(user){
  return post('/api/login',user);//{username,password}
}
//退出
export function logout(){
  return get('/api/logout');
}

export function validate(){
  return get('/api/validate');
}
```

### 16.10 actions/session.js
src/store/actions/session.js
```js
import * as types from '../action-types';
import {reg,login,logout,validate} from '../../api/session';
import {push} from 'react-router-redux';
export default {
  reg(user){
   return function(dispatch,getState){
     reg(user).then(result=>{
       let {code,success,error} = result;
       dispatch({
         type:types.REG,
         payload:{success,error}
       });
       if (code==0) {//code=0表示成功 成功后跳到登录页
         dispatch(push('/login'));
       }
     })
   }
  },
  login(user){
    return function(dispatch,getState){
      login(user).then(result=>{
        let{code,success,error,user} = result;
        dispatch({
          type:types.LOGIN,
          payload:{success,error,user}
        });
        if(code == 0){
          dispatch(push('/profile'));
        }
      })
    }
  },
  logout(){
     return function(dispatch,getState){
        logout().then(result=>{
          let {code,success,error} = result;
          dispatch({
            type:types.LOGOUT,
            payload:{success,error}
          });
          dispatch(push('/login'));
        });
     }
  },
  clearMessages(){
    return {
      type:types.CLEAR_MESSAGES
    }
  },
  validate(){
    return function(dispatch,getState){
      validate().then(result=>{
        let {code,success,error,user}= result;
        dispatch({
          type:types.VALIDATE,
          payload:{success,error,user}
        });
      });
    }
  }
}
```

### 16.11 history.js
src/store/history.js
```js
import createHashHistory from 'history/createHashHistory';
export default createHashHistory();
```

### 16.11 reducers/session.js
 src/store/reducers/session.js
```js
import * as types from '../action-types';
//会话
let initState = {
  error: '',//错误消息
  success: '',//成功消息
  user:null,//如果登录成功的话，需要给此属性赋值为登录用户
}
export default function (state = initState, action) {
  switch (action.type) {
    case types.REG:///注册方法调用完成后
      //不需要解构老状态
     return {
       ...action.payload
    };
    case types.LOGIN:///注册方法调用完成后
      return {
        ...action.payload
      };
    case types.LOGOUT:///退出方法调用完成后
      return {
        ...action.payload
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        error: '',
        success:''
      };
    case types.VALIDATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
```

## 参考
- [transition-group](https://reactcommunity.org/react-transition-group/transition-group)
- [react-swipe](https://github.com/voronianski/react-swipe)