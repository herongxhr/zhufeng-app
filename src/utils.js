export function upLoadMore(domEle,loadMore) {
	let timer;
	domEle.addEventListener('scroll',function () {
		if (timer) clearInterval(timer);
		timer=setTimeout(function () {
			let height=domEle.clientHeight;
			let scrollHeight=domEle.scrollHeight;
			let scrollTop=domEle.scrollTop;
			if (scrollTop + height + 10 > scrollHeight) {
				loadMore();
			}
		},100);
	});
}

export const store =  {
	set(key,val) {
		sessionStorage.setItem(key,val);
	},
	get(key) {
		return sessionStorage.getItem(key);
	}

}