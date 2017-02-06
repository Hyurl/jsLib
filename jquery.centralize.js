(function($){
	/**
	 * $(selector).centralize() 居中选中的元素
	 * @param  {Function} callback 居中后执行的回调函数
	 * @return {[type]}            当前对象
	 */
	$.fn.centralize = function(callback){
		var $this = $(this),
			paddingTop = parseInt($this.css('padding-top')),
			paddingRight = parseInt($this.css('padding-right')),
			paddingBottom = parseInt($this.css('padding-bottom')),
			paddingLeft = parseInt($this.css('padding-left')),
			top = $(window).height()/2 - ($this.height() + paddingTop + paddingBottom)/2,
			left = $(window).width()/2 - ($this.width() + paddingLeft + paddingRight)/2;
		$this.css({
			'position': 'absolute',
			'top': top,
			'left': left
		});
		if(typeof callback == 'function') callback.call($this);
		return this;
	};
}(jQuery || $));