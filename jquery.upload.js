/**
 * $.upload()                A jQuery function used to upload files, support multiple files uploading (only for html5 browsers).
 * @param  {object} options  Sets for the 'name' attribute and where to upload, and some other functions.
 * @return 					 No return.
 */
$.upload = function(options){
	var defaults = {
			name: 'file', // The 'name' attribute of input:file element. Be noticed, you don't have to write a input:file element yourself, just set a mame here and it'd be done. If you're gonna upload multiple files, set an array instead, it'd be just like 'file[]'.
			url: 'upload/index.php', // Submit link, in form, it would be the 'action' attribute, only required when uploading.
			file: undefined, // Used only if there already is a file or files source, if not, do not use.
			accept: 'image/*', // The default accept filetype of dialog 'open', the  'accept' attribute of input:file element.
			preview: '', // If need to preview an image or images, set a css selector for jQuery, when using this, the image would not be upload, you have to use this function again and set no 'preview' property for uploading. When previewing images, set a selector that contains multiple elements.
			data: {}, // Extra data that needs to be submitted. In ajax, it would be data property, in form, it would be extra inputs. Unlike full $.ajax(), the 'data' here only support object.
			success: function(){}, // Callback function aplied after uploaded file(s) or previewed image(s), when previewing image(s), set a argument to get the image_temp url(s) (always array), when uploading, that would be your sever's returning.
			error: function(){} // Callback function aplied when gets error.
		},
		options = $.extend({}, defaults, options),
		doPreview = function(options){
			if (navigator.userAgent.indexOf("MSIE") > 0) {
				var imgUrl = [$('#jq-file-input').val()]; 
			}else{
				for(var i=0, imgUrl=[]; i < options.file.length; i++){
					imgUrl[i] = window.URL.createObjectURL(options.file[i]);
				}
			}
			$(options.preview).each(function(i){
				switch($(this).prop('tagName')){
					case 'IMG':
						$(this).attr('src', imgUrl[i]);
					break;
					default:
						$(this).css('background-image', 'url('+imgUrl[i]+')');
					break;
				}
			});
			if(typeof options.success == 'function') options.success(imgUrl);
		},
		doUpload = function(options){
			if(typeof FormData != undefined){
				var data = new FormData();
				for(var i=0; i < options.file.length; i++){
					data.append(options.name, options.file[i]);
				}
				$.each(options.data, function(key, value){
					data.append(key, value);
				});
				$.ajax({
					url: options.url,
					type: 'post',
					data: data,
					processData : false,
					contentType : false,
					success: function(result){
						$('#jq-file-input').remove();
						if(typeof options.success == 'function') options.success(result);
					},
					error: function(result){
						if(typeof options.error == 'function') options.error(result);
					}
				});
			}else{
				$('body').append('<iframe id="jq-upload-iframe" name="upload-iframe" scr="'+options.url+'" style="display:none;"></iframe>');
				$('#jq-file-input').wrap('<form id="jq-upload-form" enctype="multipart/form-data" action="'+options.url+'" method="post" target="upload-iframe" style="display:none"></form>');
				$('#jq-upload-iframe').contents().find('body').html($('#jq-upload-form'));
				$.each(options.data, function(key, value){
					$('#jq-upload-iframe').contents().find('#jq-upload-form').append('<input name="'+key+'" value="'+value+'" />');
				});
				$('#jq-upload-iframe').contents().find('#jq-upload-form').submit();
				var int = setInterval(function() {
					var result = $("#jq-upload-iframe").contents().find("body").text();
					if(result) {
						clearInterval(int);
						$('#jq-upload-iframe').remove();
						if(typeof options.success == 'function') options.success(result);
					}
				}, 100);
			}
		};
	if(options.file == undefined){
		if($('#jq-file-input').length < 1){
			$('body').append('<input type="file" id="jq-file-input" name="'+options.name+'" accept="'+options.accept+(options.name.indexOf('[]') >= 0 ? '" multiple' : '"')+' style="display:none;" />');
		}
		if(options.preview){
			$('#jq-file-input').on('change', function(){
				options.file = $('#jq-file-input')[0].files;
				doPreview(options);
			}).trigger('click');
		}else{
			if($('#jq-file-input')[0].files[0] == undefined){
				$('#jq-file-input').on('change', function(){
					options.file = $('#jq-file-input')[0].files;
					doUpload(options);
				}).trigger('click');
			}else{
				options.file = $('#jq-file-input')[0].files;
				doUpload(options);
			}
		}
	}else{
		if(options.preview){
			doPreview(options);
		}else{
			doUpload(options);
		}
	}
}