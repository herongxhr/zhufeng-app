const API_HOST='http://localhost:3000';
export const get=(url) => {
	return fetch(API_HOST+url,{
		method: 'GET',
		credentials: 'include',//跨域携带cookie
		headers: {
			accept:'application/json'
		}
	}).then(res=>res.json());
}
export const post=(url,data) => {
	return fetch(API_HOST+url,{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Accept':'application/json'
		}
	});
}