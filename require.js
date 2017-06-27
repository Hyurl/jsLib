var require = function(url, arg, callback){
	var options = {
			async: true,
			defer: true,
			innerText: ""
		};
	var ele = document.createElement("script");
	ele.src = url;
	if(typeof arg == 'function'){
		callback = arg;
		arg = "";
	}else if(typeof arg == 'object'){
		for(var x in arg){
			options[x] = arg[x];
		}
	}
	if(options.async) ele.async = "async";
	if(options.defer) ele.defer = "defer";
	if(options.innerText) ele.innerText = options.innerText;
	ele.addEventListener("load", function(){
		callback.call(ele);
	});
	ele.addEventListener("error", function(){
		throw 'DOMException: Fail to load request resource "'+url+'". The URL is invalid.';
	});
	document.currentScript.parentNode.appendChild(ele);
};