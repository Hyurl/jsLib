/**
 * require() 加载并运行一个外部脚本文件
 * @param  {String}   url      js 文件源地址
 * @param  {Object}   options  设置选项，支持下面这些参数
 *                             · type      脚本 MIME 类型，默认 application/javascript
 *                             · async     异步加载，默认 true
 *                             · defer     脚本延迟执行，默认 false
 *                             · cahrset   设置编码
 *                             · innerText <script> 标签内容
 * @param  {Function} callback 脚本加载完成后执行的回调函数
 */
function require(url, options, callback){
	var _options = {
			type: 'application/javascript',
			async: true,
			defer: false,
			charset: "",
			innerText: ""
		};
	var ele = document.createElement("script");
	if(typeof options == 'function'){
		callback = options;
		options = {};
	}else if(typeof options == 'object'){
		for(var x in options){
			_options[x] = options[x];
		}
	}
	ele.type = _options.type;
	ele.src = url;
	if(_options.async) ele.async = "async";
	if(_options.defer) ele.defer = "defer";
	if(_options.charset) ele.charset = _options.cahrset;
	if(_options.innerText) ele.innerText = options.innerText;
	if(ele.addEventListener){
		ele.addEventListener("load", function(){
			callback.call(ele);
		});
		ele.addEventListener("error", function(){
			console.error('Uncaught DOMException: Fail to load request resource "'+url+'". The URL is invalid.');
			ele.parentNode.removeChild(ele);
		});
	}else{ //IE8
		// console.error("Uncaught DOMException: Your browser doesn't support dynamic loading.");
		ele.onreadystatechange = function(){
			if(this.readyState == 'complete' || this.readyState == 'loaded'){
				callback.call(ele);
			}
		}
	}
	if(document.currentScript){
		document.currentScript.parentNode.appendChild(ele);
	}else{ //IE
		var scripts = document.getElementsByTagName('script');
		var lastScript = scripts[scripts.length - 1];
		lastScript.parentNode.appendChild(ele);
	}
};