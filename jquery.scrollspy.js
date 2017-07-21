/**
 * $(selector).scrollSpy() 滚动监听
 * @param  {Integer}  topOffset 顶部偏移高度
 * @param  {Function} callback  回调函数
 * @return {Object}   this      当前对象
 */
$.fn.scrollSpy = function(topOffset, callback){
	if(typeof topOffset == 'function'){
		callback = topOffset;
		topOffset = 0;
	}
	var targets = $(this);
	$(window).scroll(function(event){
		var scrollTop = $(this).scrollTop();
		targets.each(function(){
			var $this = $(this),
				top = $this.offset().top;
			if(scrollTop >= top - topOffset){
				if(typeof callback == 'function'){
					callback.call($this, event);
				}
			}
		});
	});
	return this;
};

/**
 * 示例：高亮菜单项，每一个被绑定的元素都有一个特别的属性（如 href）指向一个用以高亮显
 * 示的元素，该属性的值是一个以 # 开头的锚标记。
 * $('a').filter(function(){
 *     var href = $(this).attr('href');
 *     return href && href.indexOf('#') === 0 && $(href).length > 0;
 * }).scrollSpy(20, function(){
 *     var href = $(this).attr('href');
 *     $(href).addClass('active').siblings().removeClass('active');
 * })
 */