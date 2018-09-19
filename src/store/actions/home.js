import * as types from '../action-types';
import {getSliders,getLessons} from '../../api/home';
export default {
	setCurrentCategory(currentCategory) {
		return {type:types.SET_CURRENT_CATEGORY,currentCategory};
	},
	getSliders(){
		return (dispatch) => {
			getSliders().then(sliders => {
				dispatch({
					type: types.SET_SLIDERS,
					sliders
				});
			});
		}
	},
	getLessons(){
		return (dispatch,getState) => {
			let {currentCategory,lessons:{offset,limit,loading}} = getState().home;
			if (!loading) {
				dispatch({type:types.SET_LOADING_LESSONS,payload:true});
				getLessons(currentCategory,offset,limit).then(payload => {
					dispatch({
						type: types.SET_LESSONS,
						payload
					});
				});
			}
			
		}
	}
}