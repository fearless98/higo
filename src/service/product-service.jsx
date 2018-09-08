import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Product{
    //获取商品列表 支持list和search两种情况
    getProductList(listParam){
        /*
        在调用getProductList方法时，因为分为两种请求list/search
        所以请求的url和data都有两种 所以在外层重新定义url和data
         */
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/admin/product/get_product_list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/admin/product/search_product.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }
    //获取商品详情
    getProduct(productId){
        return _mm.request({
            type : 'get',
            url  : '/admin/product/get_product_detail.do',
            data : {
                productId : productId || 0
            }
        });
    }
    // 变更商品销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type    : 'post',
            url     : '/admin/product/update_product_status.do',
            data    : productInfo
        });
    }
    //检查保存产品的表单数据
    checkProduct(product){
        let result = {
            status : true,
            msg    : '验证通过'
        };
        //判断商品名称不能为空
        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空!'
            }
        }
        //判断描述不能为空
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空!'
            }
        }
        //判断分类id为数字，且大于0
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品分类!'
            }
        }
        //判断产品价格为数字，且大于0
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格!'
            }
        }
        return result;
    }
    //编辑产品
    saveProduct(product){
        return _mm.request({
            type  : 'post',
            url   : '/admin/product/update_product_info.do',
            data  : product
        });
    }

    /*
     *分类相关
     */
    //根据分类id获取分类列表
    getCategoryList(categoryId){
        return _mm.request({
            type    : 'get',
            url     : '/admin/category/get_category_list.do',
            data    : {
                categoryId : categoryId || 0
            }
        });
    }
    //新增分类
    saveCategory(category){
        return _mm.request({
            type : 'post',
            url  : '/admin/category/add_category.do',
            data : category
        });
    }
    //更新分类
    updateCategory(category){
        return _mm.request({
            type : 'post',
            url  : '/admin/category/update_category.do',
            data : category
        });
    }
    //获取分类详情
    getCategoryDetail(categoryId){
        return _mm.request({
            type    : 'get',
            url     : '/admin/category/get_category_detail.do',
            data    : {
                categoryId : categoryId
            }
        });
    }
    //修改分类状态
    setCateStatus(category){
        return _mm.request({
            type : 'post',
            url : '/admin/category/update_category_status.do',
            data : category
        })
    }
}
export default Product;