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
