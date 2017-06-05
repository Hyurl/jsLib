/* 去掉字符串首尾空格的方法 */
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");  
}
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");  
}
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");  
}

/** parseUrl() 方法将 URL 地址解析为数组 */
String.prototype.parseUrl = function(){
	var url      = this.toString(),
		hash     = url.split('#')[1] || '',
		lUrl     = url.split('?')[0], //定义获取 url 地址中 ? 之前的部分
		protocol = lUrl.split('://')[0], // !获取 url 协议
		host 	 = lUrl.split('://')[1].split('/')[0].split(':')[0], // !获取主机名
		port 	 = lUrl.split('://')[1].split('/')[0].split(':')[1] || '', // !获取端口
		path 	 = lUrl.replace(lUrl.split('://')[0]+'://'+lUrl.split('://')[1].split('/')[0],'') || '/', // !获取当前路径
		search   = url.split('?')[1] || '', // !定义获取 url 参数
		obj   = {};
		obj['protocol'] = protocol;
		obj['host'] = host;
		if(port) obj['port'] = port;
		obj['path'] = path;
		if(search) obj['search'] = search;
		if(hash) obj['hash'] = hash;
	return obj;
}
/** parseStr() 方法将 URL 参数解析为数组 */
String.prototype.parseStr = function(){
	var search = this.toString().split('#')[0],
		search = search.split('?')[1] || search || '';
	if(!search.match(/=/)) return {};
	var keyValue = search.split('&'),
		obj = {},
		x;
	for(x in keyValue){
		var ks = keyValue[x].split('=');
		key = decodeURIComponent(ks[0]);
		value = decodeURIComponent(ks[1]) || '';
		obj[key] = value;
	}
	return obj;
}

/** utf8Encode() 方法把 ISO-8859-1 字符串编码为 UTF-8。*/
String.prototype.utf8Encode = function(){
	isoText = this.toString().replace(/\r\n/g,"\n");
	var utf8Text = "";
	for (var n = 0; n < isoText.length; n++) {
		var c = isoText.charCodeAt(n);
		if (c < 128) {
			utf8Text += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			utf8Text += String.fromCharCode((c >> 6) | 192);
			utf8Text += String.fromCharCode((c & 63) | 128);
		} else {
			utf8Text += String.fromCharCode((c >> 12) | 224);
			utf8Text += String.fromCharCode(((c >> 6) & 63) | 128);
			utf8Text += String.fromCharCode((c & 63) | 128);
		}
	}
	return utf8Text;
}

/** utf8Decode() 方法把 UTF-8 字符串解码为 ISO-8859-1。*/
String.prototype.utf8Decode = function(){
	var utf8Text = this.toString(),
		isoText = "",
		i = 0,
		c = c1 = c2 = 0;
	while ( i < utf8Text.length ) {
		c = utf8Text.charCodeAt(i);
		if (c < 128) {
			isoText += String.fromCharCode(c);
			i++;
		} else if((c > 191) && (c < 224)) {
			c2 = utf8Text.charCodeAt(i+1);
			isoText += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utf8Text.charCodeAt(i+1);
			c3 = utf8Text.charCodeAt(i+2);
			isoText += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return isoText;
}

/* base64 加密 */
String.prototype.base64Encode = function(){
	var originText = this.toString().utf8Encode(),
		encodedText = "",
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		chr1, chr2, chr3, enc1, enc2, enc3, enc4,
		i = 0;
	while (i < originText.length) {
		chr1 = originText.charCodeAt(i++);
		chr2 = originText.charCodeAt(i++);
		chr3 = originText.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		encodedText = encodedText +
		_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
		_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	return encodedText;
}
/* base64 解密 */
String.prototype.base64Decode = function(){
	var originText = this.toString().replace(/[^A-Za-z0-9\+\/\=]/g, ""),
		decodedText = "",
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		chr1, chr2, chr3,
		enc1, enc2, enc3, enc4,
		i = 0;
	while (i < originText.length) {
		enc1 = _keyStr.indexOf(originText.charAt(i++));
		enc2 = _keyStr.indexOf(originText.charAt(i++));
		enc3 = _keyStr.indexOf(originText.charAt(i++));
		enc4 = _keyStr.indexOf(originText.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		decodedText = decodedText + String.fromCharCode(chr1);
		if (enc3 != 64) {
			decodedText = decodedText + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			decodedText = decodedText + String.fromCharCode(chr3);
		}
	}
	return decodedText.utf8Decode();
}

/**
 * ucfirst() 方法用来将字符串的首字母进行转换大写处理
 * @return {string} 转换后的字符串
 */
String.prototype.ucfirst = function(){
	return this[0].toUpperCase()+this.substr(1);
}

/**
 * getBaseName() 获取不含路径的文件名
 * @return {String} 文件名
 */
String.prototype.getBaseName = function(){
	var index = this.lastIndexOf('/');
	return this.substring(index >= 0 ? index+1 : 0, this.length);
}

/**
 * getExt() 获取文件后缀名
 * @return {String} 后缀名
 */
String.prototype.getExt = function(){
	var baseName = this.getBaseName(),
		index = baseName.lastIndexOf('.');
	if(index == -1) return '';
	return baseName.substring(index+1, baseName.length);
}

/**
 * version_compare() 比较版本号
 * @param  {string} ver1 版本号1
 * @param  {string} ver2 版本号2
 * @return {int}         如果版本号1大于版本号2，返回 1，小于则返回 -1，如果相等，则返回 0；
 */
function version_compare(ver1, ver2){
	ver1 = ver1.split('.');
	ver2 = ver2.split('.');
	for (var i = 0; i < ver1.length; i++) {
		if((ver2[i] == undefined && parseInt(ver1[i]) > 0) || parseInt(ver1[i]) > parseInt(ver2[i])){
			return 1;
		}else if(parseInt(ver1[i]) < parseInt(ver2[i])){
			return -1;
		}
	};
	for(; i < ver2.length; i++){
		if(parseInt(ver2[i]) > 0) return -1;
	}
	return 0;
}

/**
 * heredoc() 文本
 * @param  {Function} fn 匿名函数
 * @return {String}      文本内容
 */
function heredoc(fn){
	return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}