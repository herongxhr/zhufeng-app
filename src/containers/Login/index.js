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
