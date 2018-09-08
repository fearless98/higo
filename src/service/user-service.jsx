import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();
class User{
    //用户登录
    //当外部调用user-service里的login方法时 用user-service去请求
    login(loginInfo){
       return _mm.request({
            type : 'post',
            url  : '/admin/admin/login.do',
            data : loginInfo
        });
    }
    //检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        //若用户名为空
        if (typeof username !== 'string' || username.length ===0){
            return{
                status:false,
                msg: '用户名不能为空!'
            }
        }
        //若密码为空
        if (typeof password !== 'string' || password.length ===0){
            return{
                status:false,
                msg: '密码不能为空!'
            }
        }
        return{
            status : true,
            msg : '验证通过'
        }
    }
    //退出登录
    logout(){
        //调用接口
        return _mm.request({
            type : 'post',
            url  : '/admin/admin/logout.do'
        });
    }
    // getUserList(pageNum){
    //     return _mm.request({
    //         type : 'get',
    //         url  : '/admin/user/get_user_list.do',
    //         data : {
    //             //把pageNum封装成一个对象传给ajax,ajax才能处理这些数据
    //             pageNum : pageNum
    //         }
    //     });
    // }
    getUserList(listParam){
    /*
    在调用getPromoList方法时，因为分为两种请求list/search
    所以请求的url和data都有两种 所以在外层重新定义url和data
     */
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/admin/user/get_user_list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/admin/user/search_user.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }
    //获取用户详情
    getUserDetail(userId){
        return _mm.request({
            type : 'get',
            url  : '/admin/user/get_user_detail_info.do',
            data : {
                userId : userId
            }
        });
    }
    //审核用户状态接口请求
    setUserStatus(userId,status){
        return _mm.request({
            type : 'post',
            url  : '/admin/user/update_user_status.do',
            data : {
                userId : userId,
                status : status
            }
        });
    }
}
export default User;