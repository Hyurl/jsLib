/**
 * $(selector).pin() 将元素固定到浏览器顶端
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
$.fn.pin = function(options){
	defaults = {
		minWidth: 460, //支持的最小屏幕宽度
		top: 0, //顶端偏移高度
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
			}else{
				css = {
					'position': position,
					'top': _top,
				}
				$this.css(css);
			}
		}
	});
}