import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './index.less';

export default class Swiper extends Component {
	constructor(props) {
		super(props);
		this.state={index:0};
	}
	render() {
		let options={
			continuous: true,
			callback:(index)=> {
				this.setState({index});
			}
		}
		let swiper=(
			<ReactSwipe className="carousel" swipeOptions={options}>
						{this.props.sliders.map((item,index) => (
							<div key={index}><img src={item}/></div>
						))}
			</ReactSwipe>
		)
		return (
			<div className="home-sliders">
				{this.props.sliders.length>0? swiper:null}
				<div className="dots">
					{
						this.props.sliders.map((item,index) => (
							<span key={index} className={`dot ${this.state.index ==index?'active':''}`}></span>
						))
					}
				</div>
			</div>
		);
	}
}