(function($){
  $.fn.extend({
    /*
			$(element).ajaxSubmit(callfore, callback) 用于将绑定的表单元素默认的提交事件转换为 ajax 方式提交。
			element: 绑定的表单元素(必须);
			callfore: 表单提交前执行的函数, 通常用来验证表单的输入, 当验证结果不为真(return false)时阻止表单的提交(可选)。
			callback: 回调函数, 当表单成功提交时执行的函数(可选, 带有返回值);
			当存在回调函数时, 如果不验证表单, 请将 callfore 设置为 null。
		*/
		ajaxSubmit: function(callfore, callback){
			$(this).submit(function(event){
				event.preventDefault();
				if(callfore!=undefined && $.isFunction(callfore) && callfore()==false) return false;
				var data=$(this).serialize(),
					url=$(this).attr('action'),
					method=$(this).attr('method');
				$.ajax({
					type: method,
					url: url,
					cache: false,
					data: data,
					success: function(msg){
						if(callback!=undefined && $.isFunction(callback)) callback(msg);
					}
				});
			});
		}
	});
})($);
