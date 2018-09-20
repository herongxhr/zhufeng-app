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
