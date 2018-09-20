import React,{Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
export default class Login extends Component{
	render() {
		return (
			<div className="login">
				<NavBar title="登录"/>
			</div>
		)
	}
}
