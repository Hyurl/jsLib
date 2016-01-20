var document = document || null;
/* 定义直接输出字符串的函数 echo() */
function echo(text, boolean){
	var textType = typeof text;
	if(document){
		if(boolean === true){
			console.log(text);
		}else{
			if(textType.match(/object/i)){
				if(text instanceof Array){
					document.write('Array');
				}else if(text instanceof Object){
					document.write('Object');
				}
			}else{
				document.write(text);
			}
		}
	}else{
		if(boolean === true){
			console.log(text);
		}else{
			if(textType.match(/object/i)){
				if(text instanceof Array){
					console.log('Array');
				}else if(text instanceof Object){
					console.log('Object');
				}
		}else{
				console.log(text);
			}
		}
	}
}

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

/* 解析网址为数组的方法 */
String.prototype.parseUrl = function(){
	var url = this.toString(),
		hash = url.split('#')[1] || '',
		lUrl = url.split('?')[0], //定义获取 url 地址中 ? 之前的部分
		protocol  = lUrl.split('://')[0], // !获取 url 协议
		host 	= lUrl.split('://')[1].split('/')[0].split(':')[0], // !获取主机名
		port 	= lUrl.split('://')[1].split('/')[0].split(':')[1] || '', // !获取端口
		path 	= lUrl.replace(lUrl.split('://')[0]+'://'+lUrl.split('://')[1].split('/')[0],'') || '/', // !获取当前路径
		search   = url.split('?')[1] || ''; // !定义获取 url 参数
	var iArray = [];
		iArray['protocol'] = protocol;
		iArray['host'] = host;
		if(port) iArray['port'] = port;
		iArray['path'] = path;
		if(search) iArray['search'] = search;
		if(hash) iArray['hash'] = hash;
	return iArray;
}
String.prototype.parseStr = function(){
	var search = this.toString().split('#')[0],
		search = search.split('?')[1] || search || '';
	if(!search.match(/=/)) return;
	var keyValue = search.split('&'),
		iArray = [],
		x;
	for(x in keyValue){
		key = keyValue[x].split('=')[0];
		value = keyValue[x].split('=')[1] || '';
		iArray[key] = value;
	}
	return iArray;
}

/* utf8Encode() 函数把 ISO-8859-1 字符串编码为 UTF-8。*/
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

/* utf8Decode() 函数把 UTF-8 字符串解码为 ISO-8859-1。*/
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
