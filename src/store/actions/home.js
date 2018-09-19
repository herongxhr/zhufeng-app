import * as types from '../action-types';
export default {
	setCurrentCategory(currentCategory) {
		return {type:types.SET_CURRENT_CATEGORY,currentCategory};
	}
}