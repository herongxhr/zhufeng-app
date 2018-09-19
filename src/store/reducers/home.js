import * as types from '../action-types';
let initState={
	currentCategory: 'all',
	sliders: [],
	lessons: {
		hasMore: true,
		list: [],
		loading: false,
		offset: 0,
		limit:5
	}
}

export default function (state=initState,action) {
	switch (action.type) {
		case types.SET_CURRENT_CATEGORY:
			return {...state,currentCategory: action.currentCategory};
		case types.SET_SLIDERS:
			return {...state,sliders: action.sliders};
		case types.SET_LOADING_LESSONS:
			return {...state,lessons: {...state.lessons,loading: action.payload}};
		case types.SET_LESSONS:
			let {list,hasMore}=action.payload;
			return {
				...state,
				lessons: {
					...state.lessons,
					loading: false,
					hasMore,
					list: [...state.lessons.list,...list],
					offset:state.lessons.offset+list.length
				}
			};
	}
	return state;
}