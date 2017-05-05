$.fn.toTop = function(options, callback){
	var defaults = {
			id: 'back-to-top',
			title: '返回顶部',
			html: '<i class="fa fa-chevron-up"></i><span class="sr-only">返回顶部</span>',
			style: 'display:none;text-align:center;padding:5px;width:32px;height:32px;background-color:#fff;opacity:0.7;border:1px solid #ccc;border-radius:50%;position:fixed;right:10px;bottom:10px;',
			speed: 200,
			scrollTop: 0
		},
		$this = $(this);
	if(typeof options == 'object'){
		options = $.extend({}, defaults, options);
	}else if(typeof options == 'function'){
		callback = options;
		options = defaults;
	}else{
		options = defaults;
	}
	$('<a href="javascript:;" id="'+options.id+'" title="'+options.title+'" style="'+options.style+'">'+options.html+'</a>').appendTo($this[0]);
	$(window).scroll(function(){
		if($(window).scrollTop() > 100){
			$('#'+options.id).fadeIn(500);
		}else{
			$('#'+options.id).fadeOut(500);
		}
	});
	$(document).on('click', '#'+options.id, function(){
		$this.animate({scrollTop: options.scrollTop}, options.speed, 'linear', function(){
			if(typeof callback == 'function') callback.call($this);
		});
	});
}