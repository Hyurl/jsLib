(function($){
  $.fn.extend({
    /* $(element).showDate(format) 用于在绑定元素上输出格式化的时间。
			element: 绑定事件的元素(必须);
			format: 格式化时间所使用的格式(必须), 该格式采用关键字符替换方法替换指定字符为时间格式。格式中下列字符将被转换成对应的时间格式。
			Y: 4位数的当前年份;
			m: 2位数的当前月份;
			d: 2位数的当前日期;
			H: 2位数的24小时制的时;
			h: 2位数的12小时制的时;
			i: 2位数的分;
			s: 2位数的秒;
			t: 3位数的毫秒;
			Month: 完整格式的英文月份;
			Mon.: 缩写格式的英文月份;
			Day.: 缩写格式的英文星期;
			*day: 完整格式的英文星期;
			星期*: 中文的星期;
			*M: 大写的英文 AM, PM;
			*.M.: 大写的英文 A.M., P.M.;
			*午: 中文的 凌晨, 早上, 上午, 中午, 下午, 晚上。 
		*/
		showDate: function(format){
			var thisDate=new Date();
			var day=thisDate.getDate();
			if(day<10){ day="0"+day; }
			var month=thisDate.getMonth()+1;
			if(month<10){ month="0"+month; }
			var year=thisDate.getFullYear();
			var Hour=thisDate.getHours();
			if(Hour<10){ Hour="0"+Hour; }
			var hour, M;
			if(Hour>12){ hour=Hour-12; }else{ hour=Hour; }
			if(hour<10){ hour="0"+hour; }
			var minute=thisDate.getMinutes();
			if(minute<10){ minute="0"+minute; }
			var second=thisDate.getSeconds();
			if(second<10){ second="0"+second; }
			var millisecond=thisDate.getMilliseconds();
			var Month=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
			var Mon_=new Array("Jan.","Feb.","Mar.","Apr.","May","June","July","Aug.","Sep.","Oct.","Nov.","Dec.");
			var weekday_cn = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
			var weekday_en = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
			var weekday_ = new Array("Sun.","Mon.","Tues.","Wed.","Thur.","Fri.","Sat.");
			if(format!=undefined && !$.isFunction(format)){
				if(format.indexOf("Month",-1)>=0){ format=format.replace("Month", Month[thisDate.getMonth()]); }
				if(format.indexOf("Mon.",-1)>=0){ format=format.replace("Mon.", Mon_[thisDate.getMonth()]); }
				if(format.indexOf("星期*",-1)>=0){ format=format.replace("星期*", weekday_cn[thisDate.getDay()]); }
				if(format.indexOf("*day",-1)>=0){ format=format.replace("*day", weekday_en[thisDate.getDay()]); }
				if(format.indexOf("Day.",-1)>=0){ format=format.replace("Day.", weekday_[thisDate.getDay()]); }
				if(format.indexOf("Y",-1)>=0){ format=format.replace("Y", year); }
				if(format.indexOf("m",-1)>=0){ format=format.replace("m", month); }
				if(format.indexOf("d",-1)>=0){ format=format.replace("d", day); }
				if(format.indexOf("H",-1)>=0){ format=format.replace("H", Hour); }
				if(format.indexOf("h",-1)>=0){ format=format.replace("h", hour); }
				if(format.indexOf("i",-1)>=0){ format=format.replace("i", minute); }
				if(format.indexOf("s",-1)>=0){ format=format.replace("s", second); }
				if(format.indexOf("t",-1)>=0){ format=format.replace("t", millisecond); }
				if(format.indexOf("*M",-1)>=0){ if(Hour>12){ M="PM" }else{ M="AM" } format=format.replace("*M", M); }
				if(format.indexOf("*.M.",-1)>=0){ if(Hour>12){ M="P.M." }else{ M="A.M." } format=format.replace("*.M.", M); }
				if(format.indexOf("*午",-1)>=0){
					if(Hour>=0 && Hour<6){ M="凌晨"; }else if(Hour>=6 && Hour<9){ M="早上" }else if(Hour>=9 && Hour<12){ M="上午"; }else if(Hour==12){ M="中午"; }else if(Hour>=13 && Hour<18){ M="下午"; }else if(Hour>=18 && Hour<24){ M="晚上"; }
					format=format.replace("*午", M);
				}
				$(this).text(format);
			}
		}
