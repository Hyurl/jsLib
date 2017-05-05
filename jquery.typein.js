(function($){
	/**
	 * $(selector).typeIn() 方法用来将 html 文本逐字打印显示出来
	 * @param  string|int       speed       打印速度，可以设置为字符串 'slow', 'normal', 'fast', 或者数值
	 * @param  string|function  placeholder 占位符, 如果设置为回调函数，则使用默认值 '_'
	 * @param  function         callback    回调函数
	 * @return this
	 */
	$.fn.typeIn = function(speed, placeholder, callback){
		speed = speed || 100;
		switch(speed){
			case "slow":
				speed = 150;
				break;
			case "normal":
				speed = 100;
				break;
			case "fast":
				speed = 50;
				break;
		}
		placeholder = placeholder || '_';
		if(typeof placeholder == 'function'){
			callback = placeholder;
			placeholder = '_';
		}
		var $this = $(this),
			html = $this.html(),
			i = 0;
		$(this).html('');
		$(this).each(function(){
			var int = setInterval(function(){
				if(html.substr(i, 1) == '<'){
					i = html.indexOf('>', i) + 1;
				}else{
					i++;
				}
				$this.html(html.substring(0, i) + (i & 1 ? placeholder : ''));
				if(i >= html.length){
					clearInterval(int);
					if(typeof callback == 'function'){
						callback.call($this, $this);
					}
				}
			}, speed);
		});
		return this;
	}
})($);
