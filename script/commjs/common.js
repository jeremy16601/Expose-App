// //判断是否ios
// function isIOS() {
//     return api.systemType == "ios";
// }

/************ 判断是否登录. ****************/
function doLogin(url) {
    var user = $api.getStorage('user');
    if (user) {
        return;
    } else {
        api.alert({
            title: '提示',
            msg: '请先登录',
            buttons: ['确定']
        }, function (ret, err) {
            if (ret) {
                api.openWin({
                    name: 'login',
                    url: url
                });
            }
        });
        return;
    }
}
//跳转登陆
function goLogin() {
    var user = $api.getStorage('user');
    if (user) {
        api.openWin({
            name: 'main',
            reload: true,
            url: '../../index.html'
        });
    } else {
        api.openWin({
            name: 'login',
            reload: true,
            url: '../login/login_head.html'
        });
    }
}

function openWinParam(name, url, param) {//打开新窗口带参数
    api.openWin({
        name: name,
        url: url + '.html',
        pageParam: param
    });
}
function openWinto(name, url) {//打开新窗口
    api.openWin({
        name: name,
        url: url + '.html',
        slidBackType: 'edge'
    });
}

// function openWin(name, url, islogin) {//打开新窗口并且需要验证登录
//
//     if (islogin) {//判断是否需要登录验证
//         var user = $api.getStorage('user');
//         if (!user) {
//             api.alert({
//                 title: '提示',
//                 msg: '请先登录',
//                 buttons: ['确定']
//             });
//             return;
//         } else {
//             api.openWin({
//                 name: name,
//                 url: url + '.html',
//                 slidBackType: 'edge'
//             });
//         }
//     }
// }

function toast(text, location, time) {
    api.toast({
        msg: text,
        duration: time,
        location: location
    });
}

function openFrame(name, url) {//打开一个子窗口,一般用于打开分享页面
    api.openFrame({
        name: name,
        url: url + '.html',
        rect: {
            x: 0,
            y: 0,
        },
        bounces: false
    });
}
//打电话
function call(tel) {
    api.call({
        type: 'tel_prompt',
        number: tel
    });
}
//时间格式化
function goodTime(str,title) {
    var now = new Date().getTime(),
        oldTime = new Date(str).getTime(),
        difference = now - oldTime,
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = difference / year,
        _month = difference / month,
        _week = difference / (7 * day),
        _day = difference / day,
        _hour = difference / hour,
        _min = difference / minute;
    if (_year >= 1) {
        result = title + ~~(_year) + " 年前"
    }
    else if (_month >= 1) {
        result = title + ~~(_month) + " 个月前"
    }
    else if (_week >= 1) {
        result = title + ~~(_week) + " 周前"
    }
    else if (_day >= 1) {
        result = title + ~~(_day) + " 天前"
    }
    else if (_hour >= 1) {
        result = title + ~~(_hour) + " 个小时前"
    }
    else if (_min >= 1) {
        result =  title+ ~~(_min) + " 分钟前"
    }
    else result = "刚刚";
    return result;
}
/*搜索相关方法*/
function doSearch() {
    $api.addCls($api.dom(".aui-searchbar-wrap"), "focus");
    $api.dom('.aui-searchbar-input input').focus();
}

function cancelSearch() {
    $api.removeCls($api.dom(".aui-searchbar-wrap.focus"), "focus");
    $api.val($api.byId("search-input"), '');
    $api.dom('.aui-searchbar-input input').blur();
}

function clearInput() {
    $api.val($api.byId("search-input"), '');
}

function search() {
    var content = $api.val($api.byId("search-input"));
    if (content) {
        api.alert({
            title: '搜索提示',
            msg: '您输入的内容为：' + content
        });
    } else {
        api.alert({
            title: '搜索提示',
            msg: '您没有输入任何内容'
        });
    }
    cancelSearch();
}

/*扫一扫 二维码扫描*/
// function doScanner() {
//     var FNScanner = api.require('FNScanner');
//     FNScanner.openScanner({
//         sound: 'widget://res/bi.wav',
//         autorotation: true,
//     }, function (ret, err) {
//         if (ret) {
//             if (ret.eventType == 'success') {
//                 alert(JSON.stringify(ret.content));
//             }
//         } else {
//             alert(JSON.stringify(err));
//         }
//     });
// }


