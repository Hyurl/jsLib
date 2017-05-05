/*
 这个 js 插件包含了有关客户端操作和响应事件的函数和方法
 */

Agent = {
	/* fullScreen(exit) 方法使浏览器进入或退出全屏状态 */
	fullScreen: function(exit){
		if(exit == undefined){
			var de = document.documentElement;
			if (de.requestFullscreen){
				de.requestFullscreen();
			} else if (de.mozRequestFullScreen){
				de.mozRequestFullScreen();
			} else if (de.webkitRequestFullScreen){
				de.webkitRequestFullScreen();
			}
		}else if( exit === false || exit.match(/exit|quit/i)){
			var de = document;
			if (de.exitFullscreen) {
				de.exitFullscreen();
			} else if (de.mozCancelFullScreen) {
				de.mozCancelFullScreen();
			} else if (de.webkitCancelFullScreen) {
				de.webkitCancelFullScreen();
			}
		}   
	},

	/* 
	isMobile(agent) 用来判断是否为移动设备访问 
	agent: 移动客户端类型，当该参数不存在时判断所有移动客户端类型。
	*/
	isMobile: function(agent){
		if(agent == undefined) return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile/i);
		switch(agent){
			case 'Android':
				return navigator.userAgent.match(/Android/i);
			break;
			case 'BlackBerry':
				return navigator.userAgent.match(/BlackBerry/i);
			break;
			case 'iOS':
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			break;
			case 'Windows':
				return navigator.userAgent.match(/IEMobile/i);
			break;
		}
	}
};