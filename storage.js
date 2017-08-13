/**
 * cookie() 设置和获取 cookie 数据，支持对象和数组
 * @param  {String} key    名称
 * @param  {String} value  值
 * @param  {Mixed}  option 选项，包括下面这些参数：
 *                         expires: 过期时间，设置为一个时间或者数字
 *                         path: 作用路径
 *                         domain: 域名
 *                         secure: 安全存储
 *                         也可以设置为 true 来存储一年的 cookie
 * @return {Mixed}         如果设置了 key，则返回对应的值，否则返回所有数据构成的对象对象
 */
function cookie(key, value, options){
	if(options === true || options === 1)
		options = {expires: 1000*60*60*24*365};
	options = Object.assign({
		expires: 0,
		path: '/',
		domain: '',
		secure: false,
	}, options);
	
	var Cookie = function(){}, //设置 Cookie 类型
		cookie = Object.create(Cookie.prototype, {length: {value: 0, writable: true}}),
		_cookie = document.cookie ? document.cookie.split('; ') : [];
	for(var i in _cookie){
		if(_cookie.hasOwnProperty(i)){
			var pos = _cookie[i].indexOf('='),
				k = decodeURIComponent(_cookie[i].substring(0, pos)), //获取键
				v = decodeURIComponent(_cookie[i].substring(pos+1)); //获取值
			try{ //尝试解析 JSON
				var _v = JSON.parse(v);
				v = typeof _v !== 'string' ? _v : v;
			}catch(e){}
			cookie[k] = v;
		}
	}
	cookie.length = Object.keys(cookie).length;
	if(!key){
		return cookie;
	}else if(key == 'length'){
		return value;
	}else if(value === undefined){
		return cookie[key];
	}else if(value === null){
		options.expires = -1000; //设置 cookie 过期
	}

	if(typeof options.expires === 'number' && options.expires){
		var date = new Date();
		date.setTime(date.getTime() + options.expires);
		options.expires = date.toUTCString();
	}
	var _value = typeof value !== 'string' ? JSON.stringify(value) : value;
	//设置 cookie
	document.cookie = [
		encodeURIComponent(key)+'='+encodeURIComponent(String(_value)),
		options.expires ? '; expires='+options.expires : '',
		options.path ? '; path='+options.path : '',
		options.domain ? '; domain='+options.domain : '',
		options.secure ? '; secure' : '',
	].join('');
	return value;
};

/**
 * storage() 设置和获取 Storage 数据，支持对象和数组
 * @param  {String}  key   名称
 * @param  {String}  value 值
 * @param  {Boolean} local 使用 localStorage，即长期存储
 * @return {Mixed}         如果设置了 key，则返回对应的值，否则返回所有数据构成的对象
 */
function storage(key, value, local){
	if(key === true || key === 1){
		local = key;
		key = null;
	}
	var Storage = function(){}, //设置 Storage 类型
		storage = Object.create(Storage.prototype, {length: {value: 0, writable: true}}),
		_storage = local ? localStorage : sessionStorage;
	for(var k in _storage){
		var v = _storage[k];
		try{ //尝试解析 JSON
			var _v = JSON.parse(v);
			v = typeof _v !== 'string' ? _v : v;
		}catch(e){}
		storage[k] = v;
	}
	storage.length = Object.keys(storage).length;
	if(!key){
		return storage;
	}else if(key == 'length'){
		return value;
	}else if(value === undefined){
		return storage[key];
	}else if(value === null){
		_storage.removeItem(key);
	}else{
		var _value = typeof value !== 'string' ? JSON.stringify(value) : value;
		_storage.setItem(key, _value);
	}
	return value;
};

if(typeof module !== 'undefined'){ //导出 nodejs 模块(Webpack)
	module.exports = {
		cookie: cookie,
		storage: storage,
	};
}