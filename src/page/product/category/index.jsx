//列表页
import React        from 'react';
import { Link }     from 'react-router-dom';
import Product         from 'service/product-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm       = new MUtil();
const _product  = new Product();

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';


//定义一个CategoryList组件
class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            categoryId : this.props.match.params.categoryId || 0
        };
    }
    //第一次加载
    componentDidMount(){
        this.loadCategoryList();
    }
    //加载分类列表
    loadCategoryList(){
        _product.getCategoryList(this.state.categoryId).then(res => {
            this.setState({
                list : res
            });
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadCategoryList();
        });
    }
    //更新分类的名字
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的分类名称', categoryName);
        if (newName) {
            _product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then(res => {
                _mm.successTips(res);
                //成功后重新加载列表，显示最新的数据
                this.loadCategoryList();
            },errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    //更改分类的状态
    onSetCateStatus(e,categoryId,currentStatus){
        let newStatus = currentStatus == 1 ? 0 : 1,
            confirmTips = currentStatus == 1 ? '是否确认启用该分类？' : '是否确认停用该分类？';
        if (window.confirm(confirmTips)) {
            _product.setCateStatus({
                categoryId : categoryId,
                status : newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            },errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    render(){
        let listBody = this.state.list.map((category,index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.taxRate}</td>
                    <td>
                        <p>{category.statusId == 1 ? '启用' : '已停用'}</p>
                        <button className="btn btn btn-xs btn-warning btn-status"
                                onClick={(e) => {this.onSetCateStatus(e,category.id,category.statusId)}}>
                                {category.statusId == 1 ? '停用' : '启用'}
                        </button>
                    </td>
                    <td>
                        <Link to={`/category/detail/${category.id}`}>修改名称</Link>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-mybtn">
                            <i className="fa fa-plus"></i>
                            <span>新增分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <TableList tableHeads={['分类ID','分类名称','税率','分类状态','操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}
export default CategoryList;