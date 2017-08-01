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
