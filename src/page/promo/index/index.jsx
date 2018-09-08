import React        from 'react';
import { Link }     from 'react-router-dom';
import Promo      from 'service/promo-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm      = new MUtil();
const _promo = new Promo();

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import PromoSave   from 'page/promo/index/save.jsx';

import './index.scss';

//定义一个PromoList组件
class PromoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            pageNum      : 1,
            //查看PromoList是从搜索来的还是从list来的 默认设为list listType只有在点击搜索时才会改变
            listType     : 'list',
            status       : ''
        };
    }
    //
    componentDidMount(){
        this.loadPromoList();
    }
    //加载促销资讯列表
    loadPromoList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        //接口请求结果
        _promo.getPromoList(listParam).then(res => {
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
            this.loadPromoList();
        });
    }
    onStatusChange(e){
        let status = e.target.value
        this.setState({
            status : status
        });
    }
    onSetPromoStatus(e,promoId){
        if (window.confirm('是否确认更改该商品的状态？')) {
            _promo.setPromoStatus(promoId, this.state.status).then(res => {
                _mm.successTips(res);
                this.loadPromoList();
            },errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    //当页数发生变化时
    onPageNumChangeNum(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadPromoList();
        });
    }
    render(){
        //表头数组
        let tableHeads =[
            {name : 'ID', width: '5%'},
            {name : '促销名称', width: '30%'},
            {name : '类别', width: '10%'},
            {name : '价格', width: '6%'},
            {name : '发布者', width: '8%'},
            {name : '发布时间', width: '15%'},
            {name : '状态', width: '15%'},
            {name : '操作', width: '8%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="促销列表">
                    <div className="page-header-right">
                        <Link to="/promo/save" className="btn btn-mybtn">
                            <i className="fa fa-plus"></i>
                            <span>添加促销</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((promo,index) => {
                            return (
                                <tr key={index}>
                                    <td>{promo.id}</td>
                                    <td>
                                        <p>{promo.name}</p>
                                    </td>
                                    <td>{promo.categoryName}</td>
                                    <td>￥{promo.price}</td>
                                    <td>{promo.publisherName}</td>
                                    <td>{promo.createTime}</td>
                                    <td>
                                    {/*<p>{promo.statusId == 1 ? '在售' : '已下架'}</p>
                                        <button className="btn btn-xs btn-info" 
                                            onClick={(e) => {this.onSetPromoStatus(e, promo.id, promo.statusId)}}>{promo.statusId == 1 ? '下架' : '上架'}</button>
                                     */}   
                                         <select className="form-control promo-status"
                                                name="statusname"
                                                defaultValue = {promo.statusId}
                                                onChange={(e) => {this.onStatusChange(e)}} >
                                            <option value="0" >已过期</option>
                                            <option value="1" >待审核</option>
                                            <option value="2" >已通过</option>
                                            <option value="3" >未通过</option>
                                        </select>
                                        <button className="btn btn-xs btn-info btn-status btn-warning"
                                                onClick={(e) => {this.onSetPromoStatus(e,promo.id)}}>提交
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={ `/promo/detail/${promo.id}` }>详情</Link>
                                        <Link className="opear" to={ `/promo/save/${promo.id}` }>编辑</Link>
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
export default PromoList;