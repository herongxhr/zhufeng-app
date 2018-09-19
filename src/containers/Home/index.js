import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
class Home extends Component{
	render() {
		return (
			<div>
				<HomeHeader
					currentCategory={this.props.currentCategory}
					setCurrentCategory={this.props.setCurrentCategory}></HomeHeader>
			</div>
		)
	}
}
export default connect(state => state.home,actions)(Home);
