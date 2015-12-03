(function($){
	$.fn.extend({
		/*
			$(selector).ajaxSubmit(param, callfore, callback) 用于将绑定的表单元素默认的提交事件转换为 ajax 方式提交, 并支持同时提交多组数据。
			selector: 绑定的表单元素(必须);
			param: 绑定表单中的 input 元素的名称(name 的值, 多个之间用 "," 分隔, 必须);
			callfore: 表单提交前执行的函数, 通常用来验证表单的输入, 当验证结果不为真(return false)时阻止表单的提交(可选)。
			callback: 回调函数, 当表单成功提交时执行的函数(可选, 带有返回值);
			当存在回调函数时, 如果不验证表单, 请将 callfore 设置为 null。
			提交多组数据时不需要特别设置, 也不需要修改后台代码(为了方便获得提交结果, 最后将后台验证的返回值设置为 0 或 1), 只需要将每个分组的 name 值设为相同即可。
		*/
		ajaxSubmit: function(param, callfore, callback){
			$(this).submit(function(event){
				event.preventDefault();
				if(callfore!=undefined && $.isFunction(callfore) && callfore()==false) return false;
				var url=$(this).attr('action');
				var method=$(this).attr('method');
				var a=$.trim(param).split(',');
				var b=$(this).find('input[name="'+$.trim(a[0])+'"]').length;
				var c=a.length;
				var d='';
				var e=0;
				for(var i=0;i<b;i++){
					for(var j=0;j<c;j++){
						d+=$.trim(a[j])+'='+$(this).find('input[name="'+$.trim(a[j])+'"]').eq(i).val()+'&';
					}
					$.ajax({
						type: method,
						url: url,
						cache: false,
						data: d,
						async:false,
						success: function(msg){
							if(isNaN(msg)){
								e=msg;
							}else{
								e+=parseInt(msg);
							}				
						}
					});
					d='';
				}
				if(callback!=undefined && $.isFunction(callback)) callback(e);
			});
		}
	});
})($);
