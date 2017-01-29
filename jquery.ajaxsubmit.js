(function($){
	/**
	 * $(selector).ajaxSubmit() 方法用来将表单的提交方式更改为 ajax 提交
	 * @param {mixed} arg 当设置为回调函数时，表单提交成功时将触发回调函数。
	 *                    当设置为对象时，支持下面的属性：
	 *                    success: 回调函数（内部可用 $(this) 指向表单），表单提交成功时触发
	 *                    beforeSend: 回调函数（内部可用 $(this) 指向表单），用于提交前进行验证表单，当返回 false 时将阻止表单提交
	 *                    setSelector: 子集选择器名称，用于分组提交数据，通常在表单内使用 <fieldset> 标签进行分组
	 *                    once: 当设置为 true 时，分组提交仅触发一次 success 回调函数；
	 *                    		你可以将服务器成功/失败的返回值设置为 1/0，表单提交完成后，success 的参数将被填充为提交成功的次数
	 *                    除了上面的这些参数，其他参数与 $.ajax 相同，但是 url 和 type 会在优先从表单中中获取。
	 * @return this
	 */
	$.fn.ajaxSubmit = function(arg){
		var $this = $(this),
			defaults = {
				setSelector: null,
				beforeSend: null,
				success: null,
				once: true,
			};
		if(typeof arg == 'function'){
			arg = {success: arg};
		}
		if(typeof arg == 'object'){
			arg = $.extend(defaults, arg);
		}
		var _arg = $.extend({}, arg);
		delete _arg.setSelector;
		delete _arg.beforeSend;
		delete _arg.success;
		delete _arg.once;
		var options = $.extend({}, _arg);
		$this.submit(function(event){
			event.preventDefault();
			options.url = $this.attr('action') || options.url;
			options.type = $this.attr('method') || options.type;
			if(typeof arg.beforeSend == 'function' && arg.beforeSend.call($this, options) === false){
				return false;
			}
			var isCallable = typeof arg.success == 'function';
			if(arg.setSelector && $this.find(arg.setSelector).length){
				var i = t = 0, length = $this.find(arg.setSelector).length;
				options.success = function(result){
					if(isNaN(result)){
						t = result;
					}else{
						t += parseInt(result);
					}
					if(isCallable){
						if(!arg.once || i == length) arg.success.call($this, t);
					}
					i++;
				};
				$this.find(arg.setSelector).each(function(){
					options.data = $(this).children().serialize();
					$.ajax(options);
				});
			}else{
				options.data = $this.serialize();
				options.success = function(result){
					if(isCallable) arg.success.call($this, result);
				};
				$.ajax(options);
			}
		});
		return this;
	}
})(jQuery || $);
