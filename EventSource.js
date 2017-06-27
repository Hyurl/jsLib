(function(){
	/**
	 * EventSource() 创建一个事件源对象，用来弥补 IE10+/Edge 浏览器不支持 SSE(Server-Sent Events) 的缺陷。
	 *               但需要注意的是，这个构造函数并不支持断线重连功能，并且在某些事件处理
	 *               和浏览器自带的有所差别。因此程序会优先使用浏览器自带 EventSource 对象。
	 * @param {string} url           要访问的 URL 地址
	 * @param {object} configuration 额外的配置，支持下面这些项目
	 *                               · withCredentials: 在跨域请求时发送证书，默认 false
	 */
	window.EventSource = window.EventSource || function(url, configuration){
		this.onopen = null; //连接开始事件
		this.onmessage = null; //传输消息事件
		this.onerror = null; //发生错误事件
		this.readyState = 0; //准备状态
		this.url = url; //请求的 URL 地址
		this.withCredentials = typeof configuration == 'object' && configuration.withCredentials ? true : false; //跨域使用证书

		/**
		 * close() 关闭连接
		 * @return null
		 */
		this.close = function(){
			this.readyState = 2;
			return xhr.abort();
		};

		/** 通过 XMLHttpRequest 来进行求情 */
		var $this = this; //创建自身的引用
		var xhr = new XMLHttpRequest(); //实例化 XMLHttpRequest
		xhr.withCredentials = $this.withCredentials;
		xhr.loaded = 0; //已加载数据长度
		xhr.onreadystatechange = function(){
			console.log(xhr);
			if(xhr.readyState == 1){ //连接打开
				$this.readyState = 0; //正在建立连接
				if(typeof $this.onopen == 'function'){
					var event = {
						bubbles: false,
						cancelBubbles: false,
						cancelable: false,
						composed: false,
						currentTarget: $this,
						defaultPrevented: false,
						eventPhase: 0,
						isTrusted: true,
						path: [],
						returnValue: true,
						srcElement: $this,
						target: $this,
						timeStamp: (new Date()).getTime(),
						type: "open"
					};
					$this.onopen(event); //触发 open 事件
				}
			}else if(xhr.status == 200){
				if(xhr.readyState == 2){ //收到头部
					var contentType = xhr.getResponseHeader('Content-Type').toLowerCase().split(';')[0];
					if(contentType != 'text/event-stream'){ //服务器发送的 Content-Type 必须是 text/event-stream
						console.error("EventSource's response has a MIME type (\""+contentType+"\") that is not \"text/event-stream\". Aborting the connection.");
						xhr.abort(); //关闭连接
						$this.readyState = 2; //连接已关闭
						if(typeof $this.onerror == 'function'){
							var event = {
								bubbles: false,
								cancelBubbles: false,
								cancelable: false,
								composed: false,
								currentTarget: $this,
								defaultPrevented: false,
								eventPhase: 0,
								isTrusted: true,
								path: [],
								returnValue: true,
								srcElement: $this,
								target: $this,
								timeStamp: (new Date()).getTime(),
								type: "error"
							};
							$this.onerror(event); //触发 error 事件
						}
					}
				}else if(xhr.readyState == 3){ //接收消息
					$this.readyState = 1; //连接持续中
					var data = xhr.responseText.substring(xhr.loaded);
					xhr.loaded = xhr.responseText.length;
					if(typeof $this.onmessage == 'function'){
						if(data.indexOf('data:') == 0){
							var event = {
								bubbles: false,
								cancelBubbles: false,
								cancelable: false,
								composed: false,
								currentTarget: $this,
								data: data.substring(5).replace(/(^\s*)|([\r\n]*$)/g, ""), //消息内容
								defaultPrevented: false,
								eventPhase: 0,
								isTrusted: true,
								lastEventId: "",
								origin: location.origin,
								path: [],
								ports: null,
								returnValue: true,
								source: null,
								srcElement: $this,
								target: $this,
								timeStamp: (new Date()).getTime(),
								type: "message"
							};
							$this.onmessage(event); //触发 message 事件
						}
					}
				}
			}else if(xhr.status != 200 && xhr.loaded == 0 && xhr.readyState == 4){
				$this.readyState = 2; //连接已关闭
				xhr.abort();
				if(typeof $this.onerror == 'function'){
					var event = {
						bubbles: false,
						cancelBubbles: false,
						cancelable: false,
						composed: false,
						currentTarget: $this,
						defaultPrevented: false,
						eventPhase: 0,
						isTrusted: true,
						path: [],
						returnValue: true,
						srcElement: $this,
						target: $this,
						timeStamp: (new Date()).getTime(),
						type: "error"
					};
					$this.onerror(event); //触发 error 事件
				}
			}
		}
		try{
			setTimeout(function(){ //通过 setTimeout 来保证 EventSource 的事件属性得到设置
				xhr.open("GET", $this.url, true); //打开连接
				xhr.setRequestHeader('Cache-Control', 'no-cache'); //设置请求头
				xhr.send(); //发送数据
			}, 10);
		}catch(e){
			console.error("Uncaught DOMException: Failed to construct 'EventSource': Cannot open an EventSource to '"+$this.url+"'. The URL is invalid.");
		}
	}
	window.EventSource.prototype.CLOSED = 2; //连接已关闭
	window.EventSource.prototype.CONNECTING = 0; //正在进行连接
	window.EventSource.prototype.OPEN = 1; //连接持续中
})(window);