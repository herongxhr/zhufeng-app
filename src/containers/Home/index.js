import React,{Component} from 'react';
import HomeHeader from '../../components/HomeHeader';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
import './index.less';
import Swiper from '../../components/Swiper';
import Loading from '../../components/Loading';

class Home extends Component{
	componentDidMount() {
		this.props.getSliders();
		this.props.getLessons();
	}
	render() {
		const {currentCategory,setCurrentCategory,lessons:{list,loading,hasMore}}=this.props;
		return (
			<div className="home">
				<HomeHeader
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory} />
				<div className="main-content">
					<Swiper sliders={this.props.sliders} />
					<div className="lesson-list">
						<div><i className="iconfont icon-kecheng-copy"></i>全部课程</div>
						{
							list.map(lesson => (
								<div key={lesson.id} className="lesson">
									<img src={lesson.poster} />
									<p>{lesson.title}</p>
									<p>{lesson.price}</p>
								</div>
							))
						}
					</div>
					{
						loading? <Loading />:(hasMore?<div className="load-more" onClick={this.props.getLessons}>{hasMore?'点击加载更多':'到底了'}</div>:null)
					}
				</div>
				
			</div>
		)
	}
}
export default connect(state => state.home,actions)(Home);
