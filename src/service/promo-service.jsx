import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Promo{
    //获取商品列表 支持list和search两种情况
    getPromoList(listParam){
        /*
        在调用getPromoList方法时，因为分为两种请求list/search
        所以请求的url和data都有两种 所以在外层重新定义url和data
         */
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/admin/promo/get_promo_list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/admin/promo/search_promo.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }
    //获取促销资讯详情
    getPromo(promoId){
        return _mm.request({
            type : 'get',
            url  : '/admin/promo/get_promo_detail.do',
            data : {
                promoId : promoId || 0
            }
        });
    }
    //变更促销信息状态接口请求
    setPromoStatus(promoId, status){
        return _mm.request({
            type : 'post',
            url  : '/admin/promo/update_promo_status.do',
            data : {
                promoId : promoId,
                status : status
            }
        });
    }
    //检查保存促销信息的表单数据
    checkPromo(promo){
        let result = {
            status : true,
            msg    : '验证通过'
        };
        //判断资讯名称不能为空
        if (typeof promo.name !== 'string' || promo.name.length === 0) {
            return {
                status: false,
                msg: '促销资讯名称不能为空!'
            }
        }
        //判断分类id为数字，且大于0
        if (typeof promo.categoryId !== 'number' || !(promo.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择促销商品分类!'
            }
        }
        //判断产品价格为数字，且大于0
        if (typeof promo.price !== 'number' || !(promo.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格!'
            }
        }
        return result;
    }
    //新增资讯
    addPromo(promo){
        return _mm.request({
            type  : 'post',
            url   : '/admin/promo/add_promo.do',
            data  : promo
        });
    }
    //更新促销资讯
    updatePromo(promo){
        return _mm.request({
            type  : 'post',
            url   : '/admin/promo/update_promo.do',
            data  : promo
        });
    }
    /*
     *分类相关
     */
    //根据父分类id获取分类列表
    getCategoryList(parentCategoryId){
        return _mm.request({
            type    : 'get',
            url     : '/admin/category/get_category_list.do',
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    //新增分类
    saveCategory(category){
        return _mm.request({
            type : 'get',
            url  : '/admin/category/add_category.do',
            data : {
                category : category
            }
        });
    }
    //修改分类名称
    updateCategoryName(category){
        return _mm.request({
            type : 'get',
            url  : '/admin/category/update_category_name.do',
            data : category
        })
    }
}
export default Promo;