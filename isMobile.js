(function($){
  $.extend({
    /*
			$.isMobile(agent, callback) 判断客户端浏览器是否为手机浏览器。
			agent: 客户端, 包括 Android, BlackBerry, iOS, Windows 和 all。
			callback: 回调函数, 但判断结果为真时执行的函数。
		*/
    isMobile: function(agent, callback){
			switch(agent){
				case 'Android':
					if(navigator.userAgent.match(/Android/i)){
						if(callback !=undefined && $.isFunction(callback)) callback();
					}
				break;
				case 'BlackBerry':
					if(navigator.userAgent.match(/BlackBerry/i)){
						if(callback !=undefined && $.isFunction(callback)) callback();
					}
				break;
				case 'iOS':
					if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
						if(callback !=undefined && $.isFunction(callback)) callback();
					}
				break;
				case 'Windows':
					if(navigator.userAgent.match(/IEMobile/i)){
						if(callback !=undefined && $.isFunction(callback)) callback();
					}
				break;
				case 'all':
					if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile/i)){
						if(callback !=undefined && $.isFunction(callback)) callback();
					}
				break;
				default:
				break;
			}
		}
	});
});
