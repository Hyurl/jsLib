(function($){
	$.fn.extend({
		/*
			$(selector).ajaxSubmit(callfore, callback, bool) 用于将绑定的表单元素默认的提交事件转换为 ajax 方式提交, 并支持同时提交多组数据。
			selector: 绑定的表单元素(必须);
			callfore: 表单提交前执行的函数, 通常用来验证表单的输入, 当验证结果不为真(return false)时阻止表单的提交(可选)。
			callback: 回调函数, 当表单成功提交时执行的函数(可选, 带有返回值);
			bool: 布尔值 true 或 false, 设置是否成功提交每组数据后都执行回调函数, true 为每次执行, false 或不设置为所有数据提交后执行一次回调函数。
			当存在回调函数时, 如果不验证表单, 请将 callfore 设置为 null。
			提交多组数据时需要为每组数据使用 <fieldset> 标签并赋予一个 class 值为 single-data, 不需要修改后台代码(当 bool 不设置或者设置为 false 时, 为了方便获得提交结果, 应将后台验证的返回值设置为 0 或 1)。
		*/
		ajaxSubmit: function(callfore, callback, bool){
			$(this).submit(function(event){
				event.preventDefault();
				if(callfore!=undefined && $.isFunction(callfore) && callfore()==false) return false;
				var action=$(this).attr('action');
				var method=$(this).attr('method');
				if($(this).find('fieldset.single-data').length>0){
					var data='', e=0;
					$(this).find('fieldset.single-data').each(function(){
						data=$(this).children().serialize();
						$.ajax({
							url: action,
							type: method,
							data: data,
							cache: false,
							async: false,
							success: function(msg){
								if(isNaN(msg)){
									e=msg;
								}else{
									e+=parseInt(msg);
								}
								if(callback!=undefined && $.isFunction(callback) && bool==true) callback(e);
							}
						});
					});
					if(callback!=undefined && $.isFunction(callback) && (bool==false || bool==undefined)) callback(e);
				}else{
					var data=$(this).serialize();
					$.ajax({
						url: action,
						type: method,
						data: data,
						cache: false,
						success: function(msg){
							if(callback!=undefined && $.isFunction(callback)) callback(msg);			
						}
					});
				}
			});
		}
	});
})(jQuery||$);
