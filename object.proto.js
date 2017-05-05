/** 让 Object 类型拥有内置 length 属性，不影响 jQuery */
Object.defineProperty(Object.prototype, "length", {
	get: function(){
		var len = 0;
		for(var i in this){
			len++;
		}
		return len;
	}
});