/**
 * 路由
 */
// var host = "http://api.bbaaoo.cn/";
var host = "http://192.168.0.157:7001/";
var v = "api/v1/";

var UrlRouter = {
    login: host + 'login', //登陆接口
    login_new: host + 'v1/login', // 带token的接口
    user: host + v + 'user', //用户信息
    catalog: host + v + 'catalog', //分类
    collection: host + v + 'collection', //收藏
    article: host + v + 'article', //
    banner: host + v + 'banner',
    reply: host + v + 'reply',
    feedback: host + v + 'feedback',
    feedback_Byuid: host + v + 'feedback_Byuid', //根据uid查询反馈列表
    uploadToken: host + 'uploadToken', //七牛token
    search: host + v + 'search', //搜索
    errors: host + v + 'errors', //错误收集
}