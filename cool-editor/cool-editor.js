(function(){
	window.iqueryPlugin = window.iqueryPlugin || {
		core : {
			
			on : function(element,type,data,fn){
				var data = data;
				if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
					alert('IE');
				}else{
					alert('not ie');
				}
			}
		}
	};
	
})();
(function(){
	var body = document.body;
	var editor = function(){};
	editor.prototype = {
		init : function(){
			this.createEditor();
		},
		_data : {
			//存储事件对象
			_target : null
		},
		createEditor : function(){
			var src = '<div class="editor" id="editor" style="position:absolute;border:1px #f90 solid;z-index:9999;display:none;font-size:12px;">'
						+'<span id="cool-edit" style="position:absolute;right:-50px;top=0;display:inner-block;height:20px;border:1px solid #09f;margin-right:5px;text-align:center;line-height:20px;padding: 0 3px;background:#fff;">Edit</span>'
						+'<span id="cool-save" style="position:absolute;right:-90px;top=0;display:inner-block;height:20px;border:1px solid #09f;text-align:center;line-height:20px;padding: 0 3px;background:#fff;">Save</span>'
					 	+'<div id="edit-content" style="width:100%;height:100%;"></div>'
					 +'</div>';
			var div = document.createElement('div');
			div.innerHTML=src;
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(div);
		},
		renderEditorPosition : function(target){
			this._data._target = target;
			var editor = document.getElementById('editor');
			editor.style.display = "block";
			var clone = target;
			var left = clone.offsetLeft;
			var top = clone.offsetTop;
			// 循环获得元素的父级控件，累加左和顶端偏移量
			while (clone = clone.offsetParent) {
				left += clone.offsetLeft;
				top += clone.offsetTop;
			}
			editor.style.width = target.offsetWidth+'px';
			editor.style.height = target.offsetHeight+'px';
			editor.style.left = left+'px';
			editor.style.top = top+'px';
			//设置edit按钮事件监听
			this.editEventHandle();
			//设置save按钮事件监听
			this.saveEventHandle();
		},
		editEventHandle : function(){
			var target = this._data._target;
			var editor = document.getElementById('editor');
			var editButton = document.getElementById('cool-edit');
			editButton.addEventListener('click',function(){
				var editorContent = document.getElementById('edit-content');
				editorContent.innerHTML = '';
				var textarea = document.createElement('textarea');
				textarea.style.width = "100%";
				textarea.style.height = "100%";
				textarea.style.border = "2px solid #f90";
				textarea.style.position = "absolute";
				textarea.style.top = "-2px";
				textarea.style.left = "-2px";
				textarea.style.fontSize = "12px";
				textarea.value = target.innerHTML;
				editorContent.appendChild(textarea);
			});
		},
		saveEventHandle : function(){
			var _self = this;
			var editor = document.getElementById('editor');
			var editorContent = document.getElementById('edit-content');
			var saveButton = document.getElementById('cool-save');
			saveButton.addEventListener('click',function(){
				var textarea = editorContent.getElementsByTagName('textarea')[0];
				if(!!textarea){
					var target = _self._data._target;
					var value = textarea.value;
					target.innerHTML = value;
					editorContent.innerHTML = '';
					editor.style.display = "none";
				}
			});
		}
	};
	var newEditor = new editor();
		newEditor.init();
	body.oncontextmenu = function(event){
		var target = event.target;
		newEditor.renderEditorPosition(target);
		return false;
	}
})();
