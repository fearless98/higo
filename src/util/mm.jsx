class MUtil{
    //通用请求接口方法
    request(param){
        //如果调用request方法时，返回值是一个promise的话，return Promise  链式调用request
        return new Promise((resolve,reject) =>{
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,//传给后端的数据
                success     : res =>{
                    //数据请求成功
                    if(0 === res.status){
                        //判断resolve的类型，确定是function后调用resolve 传回数据
                       typeof resolve === 'function' && resolve(res.data,res.msg);
                    }
                    //没有登录状态，强制登录
                    else if(10 === res.status){
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error   : err =>{
                    //statusText 是http的状态
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    //跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    //获取url参数
    getUrlParam(name){
        //正则取出   xxx.com?param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
            //result: ['param=123','','123','&'']
        return result ? decodeURIComponent(result[2]) : null;
    }
    //成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功...');
    }
    //错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里出问题了...');
    }
    //本地存储用户信息
    setStorage(name,data){
        let dataType = typeof data;
        //若data为json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name,JSON.stringify(data));
        }
        //若data为基础类型
        else if (['number','string','boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name,data);
        }
        //其它不支持的类型
        else{
            alert('该类型不支持本地存储');
        }
    }
    //取出本地存储信息
    getStorage(name){
        //取出数据
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    //按名字删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;