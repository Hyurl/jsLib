/**
 * date() 函数用来获取格式化的日期和/或时间
 * @param  string  format    日期格式，支持的关键字为:
 *                           Y: 4 位数年份
 *                           y: 2 位数年份
 *                           m: 2 位数月份
 *                           Month: 英文月份
 *                           Mon: 英文月份(简写)
 *                           d: 2 位数日期
 *                           H: 24 小时制时
 *                           h: 12 小时制时
 *                           s: 2 位数秒
 *                           t: 1-3 位数毫秒
 *                           Week: 英文星期
 *                           Wk: 英文星期(简写)
 *                           星期: 中文星期
 *                           APM: 大写的 AM 或 PM
 *                           apm: 小写的 am 或 pm
 *                           上下午: 中文的 凌晨, 早上, 上午, 中午, 下午, 晚上
 * @param  int     timestamp 时间戳(精确到毫秒)
 * @return string            格式化的日期和/或时间
 */
function date(format, timestamp){
	var format      = format || 'Y-m-d H:i:s Week',
		_Date       = new Date(); // 实例化一个 Date 对象
	if(timestamp) _Date.setTime(timestamp);
	var year        = [_Date.getFullYear(), _Date.getFullYear().toString().substr(2)], // 年份;
		month       = [['01','02','03','04','05','06','07','08','09','10','11','12'], ['January','February','March','April','May','June','July','August','September','October','November','December'], ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sep.','Oct.','Nov.','Dec.']], // 月份;
		date        = _Date.getDate() >= 10 ? _Date.getDate() : '0' + _Date.getDate(), // 日;
		hour        = _Date.getHours() >= 10 ? _Date.getHours() : '0' + _Date.getHours(), //  时;
		minute      = _Date.getMinutes() >= 10 ? _Date.getMinutes() : '0' + _Date.getMinutes(), // 分;
		second      = _Date.getSeconds() >= 10 ? _Date.getSeconds() : '0' + _Date.getSeconds(), // 秒;
		millisecond = _Date.getMilliseconds(), // 毫秒
		weekday     = [['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], ['Sun.','Mon.','Tues.','Wed.','Thur.','Fri.','Sat.'], ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']], // 星期;
		apm         = hour <= 12 ? ['AM','am'] : ['PM','pm'], // 英文上下午
		apm_cn      = ['凌晨', '早上', '上午', '中午', '下午', '晚上']; // 中文上下午
	if(typeof(format) != 'string') return false;
	format = format.replace(/\bY\b/g, year[0]) // 替换至4位数年份
				   .replace(/\by\b/g, year[1]) // 替换至2位数年份
				   .replace(/\bm\b/g, month[0][_Date.getMonth()]) // 替换至数字月份
				   .replace(/\bMonth\b/g, month[1][_Date.getMonth()]) // 替换至完整月份
				   .replace(/\bMon\b/g, month[2][_Date.getMonth()]) // 替换至缩写月份
				   .replace(/\bd\b/g, date) // 替换至日
				   .replace(/\bH\b/g, hour) // 替换至24时
				   .replace(/\bh\b/g, hour > 12 ? hour - 12 : hour) // 替换至12时
				   .replace(/\bi\b/g, minute) // 替换至分
				   .replace(/\bs\b/g, second) // 替换至秒
				   .replace(/\bt\b/g, millisecond) // 替换至毫秒
				   .replace(/\bWeek\b/g, weekday[0][_Date.getDay()]) // 替换至完整星期
				   .replace(/\bWk\b/g, weekday[1][_Date.getDay()]) // 替换至缩写星期
				   .replace(/星期/g, weekday[2][_Date.getDay()]) // 替换至中文星期
				   .replace(/\bAPM\b/g, apm[0]) // 替换至 AM 或 PM
				   .replace(/\bapm\b/g, apm[1]); // 替换至 am 或 pm
	if(parseInt(hour) >= 0 && parseInt(hour) < 6){
		format = format.replace(/上下午/g, apm_cn[0]); // 替换至 凌晨
	}else if(parseInt(hour) >= 6 && parseInt(hour) < 9){
		format = format.replace(/上下午/g, apm_cn[1]); // 替换至 早上
	}else if(parseInt(hour) >= 9 && parseInt(hour) < 12){
		format = format.replace(/上下午/g, apm_cn[2]); // 替换至 上午
	}else if(parseInt(hour) == 12){
		format = format.replace(/上下午/g, apm_cn[3]); // 替换至 中午
	}else if(parseInt(hour) >= 13 && parseInt(hour) < 18){
		format = format.replace(/上下午/g, apm_cn[4]); // 替换至 下午
	}else if(parseInt(hour) >= 18 && parseInt(hour) < 24){
		format = format.replace(/上下午/g, apm_cn[5]); // 替换至 晚上
	}
	return format;
}

/**
 * refresh() 会自动刷新的时间显示
 * @param  {String}   format   时间显示格式，请参考 date() 函数
 * @param  {Function} callback 每一次刷新时执行的回调函数，支持一个参数，即当前
 *                             的时间文本；如果回调函数返回 false，则将其停止；
 * @param  {Number}   msec     刷新的时间间隔，默认 1000 毫秒
 */
date.refresh = function(format, callback, msec = 1000, times = 0){
	var refresh = function(){
		if(typeof callback == 'function')
			var result = callback(date(format));
		if(result === false)
			clearInterval(int);
	};
	refresh();
	var int = setInterval(refresh, msec);
}

/**
 * countDwon() 倒计时计时器器
 * @param  {String}   format   时间格式
 * @param  {String}   to       截止时间
 * @param  {String}   from     开始时间，如果将 from 设置为一个回调函数，则它被
 *                             应用到 callback 上，callback 则会被引用到 complete
 *                             上，from 则自动使用当前时间；
 * @param  {Function} callback 每一次计时执行的回调函数，支持一个参数，即计时器
 *                             当前的时间文本
 * @param  {Function} complete 计时器完成后执行的回调函数
 */
date.countDwon = function(format, to, from, callback, complete){
	var date = new Date(),
		time,
		days,
		hours,
		mins,
		secs,
		text;
	if(typeof from == 'function'){
		complete = callback;
		callback = from;
		from = date.getTime();
	}else if(typeof from == 'string'){
		from = Date.parse(from);
	}
	if(typeof to == 'string'){
		to = Date.parse(to);
	}
	var countDwon = function(){
		time = (to - from)/1000;
		days = Math.floor(time/(24*3600));
		hours = Math.floor(time%(24*3600)/3600);
		if(hours < 10) hours = '0'+hours;
		mins = Math.floor(time%(24*3600)%3600/60);
		if(mins < 10) mins = '0'+mins;
		secs = Math.floor(time%(24*3600)%3600%60);
		if(secs < 10) secs = '0'+secs;
		if(to <= from){
			clearInterval(int);
			if(typeof complete == 'function')
				complete();
		}else{
			to -= 1000;
		}
		text = format.replace(/\bd\b/g, days)
					   .replace(/\bH\b/g, hours)
					   .replace(/\bi\b/g, mins)
					   .replace(/\bs\b/g, secs);
		if(typeof callback == 'function')
			callback(text);
	};
	countDwon();
	var int = setInterval(countDwon, 1000);
}

if(typeof module !== 'undefined')
	module.exports = date; //导出 nodejs 模块
