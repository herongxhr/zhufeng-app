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
