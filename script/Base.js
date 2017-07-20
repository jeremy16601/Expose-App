/**
 * 常用方法
 * @param key
 * @param value
 * @private
 */

//.设置存储
function _SetStorage(key, value) {
	$api.setStorage(key, value);
}

//.获取存储
function _GetStorage(key) {
	return $api.getStorage(key);
}

//.移除存储
function _RemoveStorage(key) {
	return $api.rmStorage(key);
}

//.清除全部缓存
function _ClearStorage() {
	$api.clearStorage();
	_toast('初始化成功！');
}

//.设置偏好设置
function _SetPrefs(key, value, _call) {
	api.setPrefs({
		key : key,
		value : value
	}, function(ret, err) {
		var v = ret.value;
		if ( typeof _call == "function") {
			_call();
		}
	});
}

//.获取偏好设置
function _GetPrefs(key, _call) {
	api.getPrefs({
		key : key
	}, function(ret, err) {
		var v = ret.value;
		if ( typeof _call == "function") {
			_call(v);
		}
	});
}

//.移除偏好设置
function _RemovePrefs(key, _call) {
	api.removePrefs({
		key : key
	}, function(ret, err) {
		var v = ret.value;
		if ( typeof _call == "function") {
			_call();
		}
	});
}

//=============================== 广播  监听 跨窗口执行脚本  ============================

//.广播事件
function _SendEvent(eventName, extra) {
	var _extra = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? {} : arguments[1];
	api.sendEvent({
		name : eventName,
		extra : _extra
	});
}

//.监听事件
function _AddEventListener(eventName, _call, extra) {
	var _extra = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
	api.addEventListener({
		name : eventName,
		extra : _extra
	}, function(ret, err) {
		if ( typeof _call == "function") {
			_call(ret);
		}
	});
}

function _Alert(info) {
    api.alert({
        msg : JSON.stringify(info)
        //location: 'middle'
    });
}
// 异步请求
function _Ajax(url, method, data, dataType, _callback, _callbackerr, headers, cache, timeout, tag) {
	var _data = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
	var _dataType = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? "json" : arguments[3];
	var _headers = ( typeof arguments[5] == "undefined" || arguments[5] == null) ? {} : arguments[5];
	var _cache = ( typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
	var _timeout = ( typeof arguments[7] == "undefined" || arguments[7] == null) ? window.ajaxTimeout : arguments[7];
	var _tag = ( typeof arguments[8] == "undefined" || arguments[8] == null) ? '' : arguments[8];
	api.ajax({
		url : url,
		cache : _cache,
		tag : _tag,
		method : method,
		headers : _headers,
		timeout : _timeout,
		dataType : _dataType,
		returnAll : false,
		data : _data
	}, function(ret, err) {
		   if (ret) 
		   {//.回调函数
			   if ( typeof _callback == "function") 
			   {
				  _callback(ret);
			   }
		   } 
		   else 
		   {//.错误处理
			   if ( typeof _callbackerr == "function") 
			   {
				  _callbackerr(err);
				  _toast("连接服务器失败"+JSON.stringify(err));
			   }
		   }
	});
}

//=============================== UI 界面  载入  刷新  加载  ============================

//.重载页面
function _RefreshPage() {
	window.location.reload();
}

//.弹出框
function _toast(msg) {
	api.toast({
		msg : msg
		//location: 'middle'
	});
}

//.弹出带按钮对话框
function _OpenDialog(type, msg) {
	var dialog = new Dialog();
	dialog.alert({
		title : "提示信息",
		msg : msg,
		buttons : ['取消', '确定']
	}, function(ret) {
	    
		if (ret.buttonIndex == 2) {//.确认退出
			switch(type) {
				case 'logout':
					{//.用户退出登录
						logout();
					}
					break;
				default:
					break;
			}
		}
	})
}

//.更改按钮状态
function _ChangeBtn(type) {
	switch(type) {
		case 'status':
			$api.addCls($api.dom('.btnok'), 'none');
			$api.removeCls($api.dom('.btn'), 'none');
			break;
		case 'err':
			$api.addCls($api.dom('.btn'), 'none');
			$api.removeCls($api.dom('.btnok'), 'none');
			break;
		default:
			break;
	}
}

//=============================== PHP 时间相关设置  ============================

//.PHP时间戳转换为格式时间   完整格式:yyyy-MM-dd h:m:s
Date.prototype.format = function(format) {
	var date = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S+" : this.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
}
//.时间戳转格式时间  如  'yyyy-mm-dd h:m:s'
function _GetNewDate(TimeStamp, style) {
	var newDate = new Date();
	newDate.setTime(TimeStamp * 1000);
	return newDate.format(style);
}

//.获取当前事件戳
function _GetNowDate() {
	var TimeStamp = Date.parse(new Date()) / 1000;
	return TimeStamp;
}

function _GetTimeFormat(time) {
   return  moment(time).format("YYYY年MM月DD日 hh:mm:ss")
}
//.处理时间日期函数
function _GetDateDiff(dateTimeStamp) {
    var timestamp4 = new Date(dateTimeStamp);
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - timestamp4;
	if (diffValue < 0) {//.若日期不符则弹出窗口告之
		//.alert("结束日期不能小于开始日期！");
	}
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (monthC >= 1) {
		result = parseInt(monthC) + "个月前";
	} else if (weekC >= 1) {
		result = parseInt(weekC) + "周前";
	} else if (dayC >= 1) {
		result = parseInt(dayC) + "天前";
	} else if (hourC >= 1) {
		result = parseInt(hourC) + "个小时前";
	} else if (minC >= 1) {
		result = parseInt(minC) + "分钟前";
	} else {
		result = "刚刚";
	}
	return result;
}

//=============================== 字符串处理  ============================

//.生成随机字符串
function _GetSalt() {
	//.字典
	var key = "01821578359766786569821768572739521087";
	var size = 10, salt = "";
	for (var i = 0; i < size; i++) {
		var rand = Math.floor(Math.random() * key.length);
		salt += key.charAt(rand);
	}
	return salt;
}

//.请登录后操作
function _Gologin() {
	_toast('请登录后操作!');
	setTimeout(function() {
		api.openWin({
			name : 'login',
			url : 'widget://html/PublicWin.html',
			pageParam : {
				frameurl : 'widget://html/User/login.html',
				title : '登录'
			},
		});
	}, 500)
}

//=============================== 基础框架  ============================

//.统一打开新窗口
function openWin(tag) {
	//获取事件属性(特殊事件)
	var type = tag.getAttribute('type');
	//处理未登录事件
	var token = _GetStorage('token');
	switch (type) {
		case 'developing':
			{//.此功能正在开发中···
				_toast('攻城狮正在埋头苦干');
			}
			break;
		default :
			{//.预设方法 适用常规打开窗口操作
				//获取页面路径
				var Path = tag.getAttribute('Path');
				//获取页面名称
				var name = tag.getAttribute('name');
				//获取窗口文字
				var title = tag.getAttribute('title');
				var WinName = name;
				//设置窗口名称为name
				var pageParamData = {
					type : type,
					name : name,
					title : title,
					frameurl : 'widget://html/' + Path + '/' + name + '.html'
				};
				LoadNewWin(WinName, pageParamData);
			}
			break;
	}
}

//.打开新窗口
function LoadNewWin(WinName, pageParamData) {
	//延时渲染 IOS有效
	var delay = 0;
	if ("ios" != api.systemType) {
		delay = 300;
	}
	//适用全部打开新窗口操作
	api.openWin({
		name : WinName,
		url : 'widget://html/PublicWin.html',
		pageParam : pageParamData,
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		reload : true,
		delay : delay
	});
}

//关闭窗口
function _CloseWin() {
	api.closeWin({
	});
}

// 关闭当前窗口到新的窗口
function _CloseToWin(name) {
	api.closeToWin({
		name : name,
		animation : {
			type : 'movein',
			subType : 'from_left',
			duration : 300
		}
	});
}

