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
		let currentCategory = this.props.currentCategory;
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
						><ul className="menu-list" onClick={event=>this.props.setCurrentCategory(event.target.dataset.type)}>
								    <li data-type="1" className={currentCategory == "1"?"active":""}>HTML课程</li>
								<li data-type="2" className={currentCategory=="2"? "active":""}>Node课程</li>
								<li data-type="3" className={currentCategory=="3"? "active":""}>框架课程</li>
								<li data-type="4" className={currentCategory=="4"? "active":""}>架构课程</li>
								</ul></CSSTransition>
						}
				</TransitionGroup>	

			</div>
		);
	}
}