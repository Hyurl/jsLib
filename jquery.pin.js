/**
 * $(selector).pin() 将元素固定到浏览器顶端
 * @param  {Object} options 选项参数
 * @return {Object} this    当前对象
 */
$.fn.pin = function(options){
	defaults = {
		minWidth: 460, //支持的最小屏幕宽度
		top: 0, //顶端偏移高度
		start: null, //浮动开始时执行的回调函数
		end: null, //浮动关闭后执行的回调函数
	};
	options = $.extend(defaults, options);
	var $this = $(this);
	var position = $this.css('position');
	var top = $this.offset() ? $this.offset().top : 0;
	var _top = $this.css('top');
	options.top = options.top || _top;
	$(window).scroll(function(){
		if($(this).width() >= options.minWidth){
			if($(this).scrollTop() > top){
				css = {
					'position': 'fixed',
					'top': options.top,
				}
				$this.css(css);
				if(typeof options.start == 'function'){
					options.start.call($this);
				}
			}else{
				css = {
					'position': position,
					'top': _top,
				}
				$this.css(css);
				if(typeof options.end == 'function'){
					options.end.call($this);
				}
			}
		}
	});
	return this;
}