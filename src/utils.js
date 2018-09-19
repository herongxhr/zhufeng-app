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
export function downRefresh(domEle,callback) {
	let startY;//开始的纵坐标
	let distance;//纵坐标移动的距离
	let originTop=domEle.offsetTop;//刚开始的距离顶部的偏移量
	domEle.addEventListener('touchstart',touchStart);
	function touchStart(event) {
		startY=event.touches[0].pageY;//按下的那个点的初始值
		//不是处于回弹中并且没有向上滚动的距离
		if (domEle.offsetTop == originTop && domEle.scrollTop == 0) {
			domEle.addEventListener('touchmove',touchMove);
		    domEle.addEventListener('touchend',touchEnd);
		}
		
		function touchMove(event) {
			let pageY=event.touches[0].pageY;
			if (pageY > startY) {//如果是下拉
				distance=pageY-startY;//计算距离
				//新的top值等于最原始的top+触摸移动的距离
				domEle.style.top=originTop+distance+'px';
			} else {
				domEle.removeEventListener('touchmove',touchMove);
				domEle.removeEventListener('touchend',touchEnd);
			}
		}
		function touchEnd(event) {
			domEle.removeEventListener('touchmove',touchMove);
			domEle.removeEventListener('touchend',touchEnd);
			let timer = setInterval(function () {
				domEle.style.top=originTop+(--distance)+'px';
				if (distance<1) {
					domEle.style.top=originTop+'px';
					clearInterval(timer);
				}
			},14);
			if (distance > 50) {
				callback();
			}
		}

	}
}
export const store =  {
	set(key,val) {
		sessionStorage.setItem(key,val);
	},
	get(key) {
		return sessionStorage.getItem(key);
	}

}