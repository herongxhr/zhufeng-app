import {get} from './index';

export const getSliders=() => {
	return get('/sliders');
}

export const getLessons=(type,offset,limit) => {
	return get(`/lessons/${type}?offset=${offset}&limit=${limit}`);
}