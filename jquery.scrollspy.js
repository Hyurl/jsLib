/**
 * $(selector).scrollSpy() 滚动监听，绑定监听事件的元素应该是一个集合，并且集合中的每一个
 *                         元素都有一个特别的属性（如 href）指向一个用以高亮显示的元素，
 *                         该属性的值是一个以 # 开头的锚标记。
 * {Object}  options  监听选项
 */
$.fn.scrollSpy = function(options){
	var defaults = {
		top: 0, //顶部偏移高度
		attr: 'href', //绑定的属性
		class: 'active', //类名称
		callback: null, //当监听响应时执行的回调函数
	};
	options = $.extend(defaults, options);
	var targets = $(this).filter(function(){
		var href = $(this).attr(options.attr);
		return href.indexOf('#') === 0 && $(href).length > 0;
	});
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		targets.each(function(){
			var $this = $(this),
				top = $this.offset().top;
			if(scrollTop >= top - options.top){
				var href = $this.attr(options.href);
				$(href).addClass(options.class).siblings().removeClass(options.class);
				if(typeof options.callback == 'function'){
					options.callback.call($this);
				}
			}
		});
	});
};