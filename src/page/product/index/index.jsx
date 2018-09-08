import React        from 'react';
import { Link }     from 'react-router-dom';
import Product      from 'service/product-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm      = new MUtil();
const _product = new Product();

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import ProductSave   from 'page/product/index/save.jsx';

import './index.scss';

//定义一个PromoList组件
class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            pageNum      : 1,
            //查看PromoList是从搜索来的还是从list来的 默认设为list listType只有在点击搜索时才会改变
            listType     : 'list' 
        };
    }
    componentDidMount(){
        this.loadProductList();
    }
    //加载促销资讯列表
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        //接口请求结果
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                //错误 将list清空 使页面加载错误信息提示
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    //定义搜索商品 searchType / searchKeyword
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
            this.loadProductList();
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadProductList();
        });
    }
    //改变商品状态
    onSetProductStatus(e, productId, currentStatus){
        let newStatus = currentStatus == 1 ? 0 : 1,
            confirmTips = currentStatus == 1 ? '确定要关闭该商品？' : '确定要恢复该商品?';
        if (window.confirm(confirmTips)) {
            _product.setProductStatus({
                productId : productId,
                status  : newStatus
            }).then(res => {
                _mm.successTips(res);
                //重新加载列表
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    render(){
        //表头数组
        let tableHeads =[
            {name : '商品ID', width: '6%'},
            {name : '发布者', width: '6%'},
            {name : '分类', width: '7%'},
            {name : '购买类型', width: '7%'},
            {name : '商品信息', width: '26%'},
            // {name : '分类', width: '10%'},
            {name : '价格', width: '6%'},
            {name : '关税', width: '6%'},
            {name : '数量', width: '8%'},
            {name : '创建时间', width: '15%'},
            {name : '状态', width: '10%'},
            {name : '操作', width: '10%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product,index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.username}</td>
                                    <td>{product.categoryName}</td>
                                    <td>{product.typeName}</td>
                                    <td>{product.name}</td>
                                    <td>￥{product.price}</td>
                                    <td>￥{product.tax}</td>
                                    <td>{product.quantity}件</td>
                                    <td>{new Date(product.createTime).toLocaleString()}</td>
                                    <td>
                                        <p>{product.statusId == 1 ? '正常' : '关闭'}</p>
                                        <button className="btn btn-xs btn-warning btn-status" 
                                            onClick={(e) => {this.onSetProductStatus(e, product.id, product.statusId)}}>{product.statusId == 1 ? '关闭' : '恢复'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={ `/product/detail/${product.id}` }>详情</Link>
                                        <Link className="opear" to={ `/product/save/${product.id}` }>编辑</Link>
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
export default ProductList;