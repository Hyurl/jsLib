(function($){
  $.extend({
    /*
			$.isMobile(agent) 判断客户端浏览器是否为手机浏览器。
			agent: 客户端, 包括 Android, BlackBerry, iOS, Windows 和 any。
		*/
		isMobile: function(agent, callback){
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
				case 'any':
					return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile/i);
				break;
			}
		}
	});
})($);
