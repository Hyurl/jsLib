/**
 * js网页雪花效果jquery插件
 */
(function($){
	$.fn.snow = function(options){
			var $flake 			= $('<div class="snow" />').css({'position': 'absolute', 'z-index': '9999'}).html('&#10052;'),
				documentWidth	= $(document).width(), //文档宽度
				documentHeight 	= $(document).height(), //文档高度
				defaults		= {
									minSize		  : 10,		//雪花的最小尺寸
									maxSize		  : 20,		//雪花的最大尺寸
									newOn		  : 1000,		//雪花出现的频率
									flakeColor 	  : "#FFFFFF",	//雪花颜色
									flakeOpacity  : 0.7, //雪花起始不透明度
									fallDirection : 'right', //雪花飘落的方向
								},
				options			= $.extend({}, defaults, options);
			var interval		= setInterval( function(){
				var startOpacity		= options.flakeOpacity + Math.random(), //雪花出现时的最初不透明度
					flakeSize			= options.minSize + (options.maxSize - options.minSize) * Math.random(), //雪花大小
					startPositionLeft 	= documentWidth * Math.random() - flakeSize, //雪花出现位置的左边距
					fallDuration		= documentHeight * 10 + Math.random() * 5000, //雪花下落的速度
					endOpacity          = startOpacity - 0.3, //雪花消失时的不透明度
					endPositionTop		= documentHeight, //雪花消失时的上边距
					endPositionLeft		= startPositionLeft; //雪花消失时的左边距
				if(options.fallDirection.match(/right/i)){
					endPositionLeft 	= startPositionLeft + documentWidth * Math.random();
					if(endPositionLeft > documentWidth){
						endPositionLeft = documentWidth - flakeSize;
					}
				}else if(options.fallDirection.match(/left/i)){
					endPositionLeft 	= startPositionLeft - documentWidth * Math.random();
					if(endPositionLeft < 0){
						endPositionLeft = flakeSize;
					}
				}
				$('body').css({'overflow':'hidden','max-width':'100%'});
				$flake.clone().appendTo('body').css({
							'font-size' : flakeSize,
							top 		: '-'+flakeSize,
							left 		: startPositionLeft,
							opacity 	: startOpacity,
							color 		: options.flakeColor
						}).animate({
							top 		: endPositionTop,
							left 		: endPositionLeft,
							opacity 	: endOpacity
						},fallDuration,'linear',function(){
							$(this).remove();
						}
					);	
			},options.newOn);
	}
})(jQuery || $);