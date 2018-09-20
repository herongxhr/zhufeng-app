import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import './index.less'
export default class Detail extends Component{
	render() {
		return this.props.location.state?<div class="lesson-detail">
			<img src={this.props.location.state.poster} />
			<video src={this.props.location.state} poster={this.props.location.state.poster} controls></video>
			<p>{this.props.location.state.title}</p>
			<p>{this.props.location.state.price}</p>
	    </div>:<Redirect to="/"/>
	}
}
