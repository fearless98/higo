import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Order{
    //获取订单列表 支持list和search两种情况
    getOrderList(listParam){
        /*
        在调用getOrderList方法时，因为分为两种请求list/search
        所以请求的url和data都有两种 所以在外层重新定义url和data
         */
        let url  = '',
            data = {};
        if(listParam.listType === 'list'){
            url          = '/admin/order/get_order_list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/admin/order/search_order.do';
            data.pageNum    = listParam.pageNum;
            data[listParam.searchType]   = listParam.keyword;
        }
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }
    //获取订单详情
    getOrderDetail(orderNumber){
        return _mm.request({
            type : 'get',
            url  : '/admin/order/get_order_detail.do',
            data : {
                orderNo : orderNumber
            }
        });
    }
    endOrder(orderNumber){
        return _mm.request({
            type : 'post',
            url  : '/admin/order/close_order.do',
            data : {
                orderNo : orderNumber
            }
        })
    }
}
export default Order;