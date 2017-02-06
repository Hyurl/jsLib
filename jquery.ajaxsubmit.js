(function($){
	/**
	 * $(selector).ajaxSubmit() 方法用来将表单的提交方式更改为 ajax 提交
	 * @param {mixed} options 当设置为回调函数时，表单提交成功时将触发回调函数。
	 *                        当设置为对象时，支持下面的属性：
	 *                        success: 回调函数（内部可用 $(this) 指向表单），表单提交成功时触发
	 *                        beforeSend: 回调函数（内部可用 $(this) 指向表单），用于提交前进行验证表单，当返回 false 时将阻止表单提交
	 *                        			  如果返回一个不为空的对象，该对象将会与 options 合并。
	 *                        setSelector: 子集选择器名称，用于分组提交数据，通常在表单内使用 <fieldset> 标签进行分组
	 *                        once: 当设置为 true 时，分组提交仅触发一次 success 和 beforeSend 回调函数；
	 *                    		    你可以将服务器成功/失败的返回值设置为 1/0，表单提交完成后，success 的参数将被填充为提交成功的次数
	 *                        除了上面的这些参数，其他参数与 $.ajax 相同，但是 url 和 type 会在优先从表单中中获取。
	 * @return this
	 */
	$.fn.ajaxSubmit = function(options){
		var $this = $(this),
			defaults = {
				setSelector: null,
				beforeSend: null,
				success: null,
				once: true,
			};
		if(typeof options == 'function'){
			options = {success: options};
		}
		options = $.extend(defaults, typeof options == 'object' ? options : {});
		$this.submit(function(event){
			event.preventDefault();
			options.url = $this.attr('action') || options.url;
			options.type = $this.attr('method') || options.type;
			options.data = $(this).serialize().replace(/\+/g, '%20');
			var successCallable = typeof options.success == 'function',
				beforeSendCallable = typeof options.beforeSend == 'function',
				length = $this.find(options.setSelector).length;
			if(beforeSendCallable && (options.once || !length)){
				var result = options.beforeSend.call($this, options);
					if(!result || typeof result != 'object') return false;
					options = $.extend(options, result);
			}
			if(options.setSelector && length){
				var i = t = 0,
					success = function(result){
					if(isNaN(result)){
						t = result;
					}else{
						t += parseInt(result);
					}
					if(successCallable){
						if(!options.once || i == length-1) options.success.call($this, t);
					}
					i++;
				};
				$this.find(options.setSelector).each(function(){
					options.data = $(this).children().serialize().replace(/\+/g, '%20');
					if(beforeSendCallable && !options.once){
						var result = options.beforeSend.call($this, options);
						if(!result || typeof result != 'object') return false;
						options = $.extend(options, result);
					}
					options.success = function(result){ return success(result); };
					delete options.beforeSend;
					$.ajax(options);
				});
			}else{
				options.success = function(result){
					if(successCallable) options.success.call($this, result);
				};
				delete options.beforeSend;
				$.ajax(options);
			}
		});
		return this;
	}
})(jQuery || $);