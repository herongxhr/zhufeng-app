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
