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
	setCurrentCategory = (event)=> {
		this.setState({
			showList:false
		},() => {
			this.props.setCurrentCategory(event.target.dataset.type);
		});
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
						><ul className="menu-list" onClick={this.setCurrentCategory}>
								<li data-type="react" className={currentCategory == "1"?"active":""}>React课程</li>
								<li data-type="vue" className={currentCategory=="2"? "active":""}>Vue课程</li>
								</ul></CSSTransition>
						}
				</TransitionGroup>	

			</div>
		);
	}
}