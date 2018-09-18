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
