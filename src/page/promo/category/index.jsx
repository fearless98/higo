/*import React        from 'react';
import { Link }     from 'react-router-dom';
import Promo         from 'service/promo-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm       = new MUtil();
const _promo  = new Promo();

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';


//定义一个CategoryList组件
class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            parentCategoryId : this.props.match.params.categoryId || 0
        };
    }
    //第一次加载
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId : newId
            },() => {
                this.loadCategoryList();
            });
        }
    }
    //加载分类列表
    loadCategoryList(){
        _promo.getCategoryList(this.state.parentCategoryId).then(res => {
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
            _promo.updateCategoryName({
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
    render(){
        let listBody = this.state.list.map((category,index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.statusName}</td>
                    <td>
                        <a className="opear"
                            onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId === 0
                            ? <Link to={`/promo-category/index/${category.id}`}>查看子分类</Link>
                            : null
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表">
                    <div className="page-header-right">
                        <Link to="/promo-category/add" className="btn btn-mybtn">
                            <i className="fa fa-plus"></i>
                            <span>新增分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父分类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['分类ID','分类名称','分类状态','操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}
export default CategoryList;*/