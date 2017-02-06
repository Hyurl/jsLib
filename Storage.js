(function(){
	/**
	 * cookie() 设置 cookie 数据
	 * @param  {string} name   名称
	 * @param  {string} value  值
	 * @param  {object} option 选项，包括下面这些参数：
	 *                         expires: 过期时间，设置为一个时间或者数字
	 *                         path: 作用路径
	 *                         domain: 域名
	 *                         secure: 启用安全模式
	 * @return {string|object} 如果设置了 name，则返回对应的值，不存在则返回 null，否则返回所有数据构成的对象
	 */
	cookie = function (key, value, options){
		options = Object.assign({}, options);
		if(!value && value !== undefined){
			options.expires = -1;
		}
		var cookie = {length: 0},
			_cookie = document.cookie.split('; ');
		for(var i in _cookie){
			var kv = _cookie[i].split('=');
			cookie[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
			cookie.length++;
		}
		if(!key) return cookie;
		key = encodeURIComponent(key);
		if(value === undefined) return key != 'length' ? (cookie[key] || null) : null;
		if(key == 'length') return value;
		if(typeof options.expires === 'number'){
			var time = options.expires,
				t = options.expires = new Date();
			t.setDate(t.getDate()+time);
		}
		document.cookie = [
			key+'='+encodeURIComponent(String(value)),
			options.expires ? '; expires='+options.expires.toUTCString() : '',
			options.path ? '; path='+options.path : '',
			options.domain ? '; domain='+options.domain : '',
			options.secure ? '; secure' : ''
		].join('');
		return value || null;
	};

	/**
	 * storage() 设置 sessionStorage 或 localStorage 数据，如果不支持，则自动转为 cookie
	 * @param  {string} name   名称
	 * @param  {string} value  值
	 * @param  {bool}   local  使用 localStorage，即长期存储
	 * @return {string|object} 如果设置了 name，则返回对应的值，不存在则返回 null，否则返回所有数据构成的对象
	 */
	storage = function(name, value, local){
		if(name === true || name === 1){
			local = name;
			name = null;
		}
		var hasStorage = typeof sessionStorage != 'undefined',
			storage = local ? localStorage : sessionStorage;
		if(local && !hasStorage) return {};
		if(!name) return hasStorage ? storage : cookie();
		if(!value && value !== undefined){
			return hasStorage ? storage.removeItem(name) : cookie(name, false);
		}else if(value === undefined){
			return hasStorage ? storage.getItem(name) : cookie(name);
		}
		hasStorage ? storage.setItem(name, value) : cookie(name, value);
		return value;
	};
}());