import React        from 'react';
import { Link }     from 'react-router-dom';
import Order        from 'service/order-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm      = new MUtil();
const _order   = new Order();

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

//定义一个OrderList组件
class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            pageNum      : 1,
            //查看OrderList是从搜索来的还是从list来的 默认设为list listType只有在点击搜索时才会改变
            listType     : 'list' 
        };
    }
    //
    componentDidMount(){
        this.loadOrderList();
    }
    //加载商品列表
    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        //接口请求结果
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                //错误 将list清空 使页面加载错误信息提示
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    //定义搜索商品
    onSearch(searchType,searchKeyword){
        //判断searchKeyword是否为空 若为空按list来加载  若不为空则按搜索结果加载
        let listType = searchKeyword === '' ? 'list' : 'search';
        //点击搜索后，pageNum始终从第一页开始
        this.setState({
            listType      : listType,
            pageNum       : 1,
            searchType    : searchType,
            searchKeyword : searchKeyword
        },() => { //回调
            this.loadOrderList();
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadOrderList();
        });
    }
    render(){
        //表头数组
        let tableHeads =['订单号','商品名称','价格','关税','数量','代购者','订单状态','订单总价','创建时间','操作'];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表">
                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order,index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={ `/order/detail/${order.orderNo}` }>{order.orderNo}</Link>
                                    </td>
                                    <td>{order.productName}</td>
                                    <td>{order.productPrice}</td>
                                    <td>{order.productTax}</td>
                                    <td>{order.productQuantity}</td>
                                    <td>{order.sellerUsername}</td>
                                    <td>{order.statusName}</td>
                                    <td>￥{order.totalAmount}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={ `/order/detail/${order.orderNo}` }>详情</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChangeNum(pageNum)}/>
            </div>
        );
    }
}
export default OrderList;