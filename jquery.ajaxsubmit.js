(function($){
	/**
	 * $(selector).ajaxSubmit() 方法用来将表单的提交方式更改为 ajax 提交，支持文件上传，并且兼容非 HTML5 浏览器(iframe 方式)。
	 * @param {mixed} options 当设置为回调函数时，表单提交成功时将触发回调函数。
	 *                        当设置为对象时，支持下面的属性：
	 *                        success: 回调函数（内部可用 $(this) 指向表单），表单提交成功时触发；
	 *                        		   当时用 Iframe 上传时，该函数仅支持第一个参数，并且始终尝试解析 JSON。
	 *                        beforeSend: 回调函数（内部可用 $(this) 指向表单），用于提交前进行验证表单，当返回 false 时将阻止表单提交；
	 *                        	  		  如果返回一个不为空的对象，该对象将会与 options 合并。
	 *                        setSelector: 子集选择器名称，用于分组提交数据，通常在表单内使用 <fieldset> 标签进行分组。
	 *                        once: 当设置为 true 时，分组提交仅触发一次 success 和 beforeSend 回调函数；
	 *                    		    你可以将服务器成功/失败的返回值设置为 1/0，表单提交完成后，success 的参数将被填充为提交成功的次数。
	 *                        除了上面的这些参数，其他参数与 $.ajax 相同，但是 url 和 type 会在优先从表单中中获取。
	 *                        分组提交不支持文件上传，并且，当使用 Iframe 兼容方式上传文件时，类似 error 这类 $.ajax() 所特有的回调函数也不会被触发。
	 *                        如果要同时上传多个文件，你必须要将 input:file 元素的 name 值设置为数组，例如 name="file[]"，并且设置 multiple 属性。
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
		var successCallable = typeof options.success == 'function',
			beforeSendCallable = typeof options.beforeSend == 'function',
			success = options.success,
			beforeSend = options.beforeSend,
			setLength = $this.find(options.setSelector).length,
			fileLength = $this.find(':file').length,
			time = (new Date()).getTime(),
			iframeUpload = fileLength && typeof FormData == 'undefined' && !setLength;

		if(iframeUpload){ //针对非 HTML5 浏览器
			var id = 'jquery-upload-iframe-'+time,
				iframe = $('<iframe></iframe>');
			iframe.attr({'id': id, 'name': id}).css('display', 'none').appendTo($('body')).on('load', function(){
				var result = iframe.contents().find("body").text();
				if(result){
					try{
						result = JSON.parse(result);
					}catch(e){}
					iframe.contents().find('body').html('');
				}
				if(successCallable) success.call($this, result);
				if(typeof options.complete == 'function'){
					options.complete.call($this);
				}
			});
			$this.attr({'target': id, 'enctype': 'multipart/form-data'});
		}

		/** AJAX 提交 */
		$this.submit(function(event){ //进行提交操作
			event.preventDefault();
			options.url = $this.attr('action') || options.url; //优先使用表单 action 属性
			options.type = $this.attr('method') || options.type; //优先使用表单 method 属性
			options.data = {};
			$.each($(this).serializeArray(), function(key, value){
				options.data[this.name] = this.value;
			});
			if(beforeSendCallable && (options.once || !setLength)){
				var result = options.beforeSend.call($this, options),
					_options = $.extend({}, options);
				if(result === false) return false;
				if(typeof result == 'object') options = $.extend(options, result);
			}
			if(options.setSelector && setLength){ //分组提交数据
				var i = t = 0,
					_success = function(result, status, xhr){
					if(isNaN(result)){
						t = result;
					}else{
						t += parseInt(result);
					}
					if(successCallable){
						if(!options.once || i == setLength-1) success.call($this, t, status, xhr);
					}
					i++;
				};
				$this.find(options.setSelector).each(function(){
					options.data = {};
					$.each($(this).children().serializeArray(), function(key, value){
						options.data[this.name] = this.value;
					});
					if(beforeSendCallable && !options.once){
						var result = options.beforeSend.call($this, options);
						if(result === false) return false;
						if(typeof result == 'object') options = $.extend(options, result);
					}
					options.success = function(result, status, xhr){ return _success(result, status, xhr); };
					delete options.beforeSend;
					$.ajax(options);
					options.beforeSend = beforeSend;
				});
			}else if(iframeUpload){ //Iframe 上传
				$this.attr({action: options.url, method: 'post'});
				var fileInput = $this.find(':file');
				fileInput = fileInput.eq(fileInput.length-1);
				$.each(options.data, function(key, value){
					if($this.find('[name="'+key+'"]').length < 1){
						fileInput.after('<input type="hidden" name="'+key+'" value="'+value+'"/>');
					}
				});
				$.each(_options.data, function(key, value){
					if(options.data[key] === undefined){
						$this.find('[name="'+key+'"]').remove();
					}
				});
				this.submit();
			}else{ //简单的提交数据
				options.success = function(result, status, xhr){
					if(successCallable) success.call($this, result, status, xhr);
				};
				delete options.beforeSend;
				if(fileLength){
					var data = new FormData();
					$this.find(':file').each(function(){
						var name = $(this).attr('name');
						for(var i=0; i < this.files.length; i++){
							data.append(name, this.files[i]);
						}
					});
					$.each(options.data, function(key, value){
						data.append(key, value);
					});
					var _options = $.extend({}, options, {
						data: data,
						type: 'post',
						processData : false,
						contentType : false
					});
					$.ajax(_options);
				}else{
					$.ajax(options);
				}
				options.beforeSend = beforeSend;
			}
		});
		return this;
	};

	/**
	 * previewImage() 预览图像
	 * @param  {String}   target   用于预览的元素，设置为一个 CSS 选择器，
	 *                             当预览图片多余元素个数时，将自动进行复制
	 * @param  {Function} callback 预览后的回调函数
	 * @return this
	 */
	$.fn.previewImage = function(target, callback){
		var $this = $(this);
		$this.on('change', function(){
			if($this.val()){
				if(target && $(target).length){
					var $target = $(target),
						isImg = $target.prop('tagName') == 'IMG';
					$target.attr('src', '');
					if(typeof window.URL.createObjectURL == 'function'){
						for(var i=0; i < $this[0].files.length; i++){
							var src = window.URL.createObjectURL($this[0].files[i]);
							if(!$target[i]){
								$target[i] = $target.eq(0).clone(true);
								$target.eq(i-1).after($target[i]);
							}
							if(isImg){
								$($target[i]).attr('src', src);
							}else{
								$($target[i]).find('img').eq(0).attr('src', src);
							}
						}
					}else{
						if(isImg){
							$target.attr('src', $this.val());
						}else{
							$target.find('img').eq(0).attr('src', $this.val());
						}
					}
					$target.filter('[src=""]').remove();
				}
			}
			if(typeof callback == 'function'){
				callback.call($this);
			}
		});
		return this;
	};
})(jQuery || $);
