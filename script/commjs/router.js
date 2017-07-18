/**
 * 路由
 */
var host = "http://192.168.0.159:7001/";
var v="api/v1/";

var UrlRouter = {
    login: host + 'login',  //登陆接口
    user: host +v+ 'user',  //用户信息
    catalog: host +v+ 'catalog',//分类
    collection: host + v+'collection', //意见反馈
    article: host +v+ 'article', //
    banner: host + v+'banner',
    reply: host + v+'reply',
}