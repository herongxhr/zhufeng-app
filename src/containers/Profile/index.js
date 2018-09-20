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