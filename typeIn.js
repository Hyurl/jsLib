(function($){
  $.fn.extend({
		/* $(element).typeIn(placeholder,speed,callback) 用于将制定元素的内容显示为打印出现的动画效果。
			element: 绑定事件的元素(必须);
			placeholder: 打印文字效果出现时的替代光标(必须);
			speed: 打印每个字的速度, 支持 "slow", "fast", "normal", 毫秒, 以及不定义(可选);
			callback: 打印效果完成后的回调函数*(可选)。
			注意：使用时将绑定元素的 display 值设置为 none。
		*/
		typeIn: function(placeholder,speed,callback){
			$(this).show();
			var d=$(this), c=d.html(), b=0, s; d.html("");
			if(speed!=undefined && !$.isFunction(speed)){
				switch(speed){ case "slow": s=120; break; case "normal": s=75; break; case "fast": s=35; break; default: s=speed; break; }
			}else{ s=75; }
			$(this).each(function(){
				var e=setInterval(function(){
					var f=c.substr(b, 1);
					if(f=="<"){ b=c.indexOf(">", b) + 1;
					}else{ b++; }
					d.html(c.substring(0, b) + (b & 1 ? placeholder : ""));
					if(b>=c.length){
						clearInterval(e);
						if(callback!=undefined && $.isFunction(callback)) callback();
					}
				}, s);
			});
		});
	})($);
