(function($){
	/**
	 * $(selector).showDate() 将在绑定元素上动态显示格式化的当前日期和/或时间
	 * @param  string  format  日期/时间格式
	 * @return this 
	 */
	$.fn.showDate = function(format){
		var $this = $(this);
		setInterval(function(){
			$this.text(date(format));
		}, 1000);
		return this;
	}

	/**
	 * $(selector).countDown() 方法在绑定元素上动态显示格式化的两个时间差
	 * @param  string      format  日期/时间格式
	 * @param  int|string  end     结束日期/时间的时间戳或可以转换为时间戳的日期/时间格式
	 * @param  int|string  start   开始日期/时间的时间戳或可以转换为时间戳的日期/时间格式
	 * @return this
	 */
	$.fn.countDown = function(format, end, start){
		var $this = $(this),
			_Date = new Date(),
			time,
			days,
			hours,
			mins,
			secs,
			text;
		start = start || _Date.getTime();
		if(parseInt(start) != start){
			start = Date.parse(start);
		}
		if(parseInt(end) != end){
			end = Date.parse(end);
		}
		var int = setInterval(function(){
			time = (end - start)/1000;
			days = Math.floor(time/(24*3600));
			hours = Math.floor(time%(24*3600)/3600);
			if(hours < 10) hours = '0'+hours;
			mins = Math.floor(time%(24*3600)%3600/60);
			if(mins < 10) mins = '0'+mins;
			secs = Math.floor(time%(24*3600)%3600%60);
			if(secs < 10) secs = '0'+secs;
			if(end <= start){
				clearInterval(int);
			}else{
				end -= 1000;
			}
			text = format.replace(/\bd\b/g, days)
						   .replace(/\bH\b/g, hours)
						   .replace(/\bi\b/g, mins)
						   .replace(/\bs\b/g, secs);
			$this.text(text);
		}, 1000);
		return this;
	}
})($);