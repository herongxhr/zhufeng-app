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

## 3. 项目目录
- src 项目源码目录
- main 入口文件
- containers 容器
- components 组件
- common 公共样式

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

## 参考
- [transition-group](https://reactcommunity.org/react-transition-group/transition-group)