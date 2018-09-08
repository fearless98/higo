/*//列表页
import React        from 'react';
import Promo         from 'service/promo-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm       = new MUtil();
const _promo  = new Promo();

import PageTitle    from 'component/page-title/index.jsx';


//定义一个CategoryAdd组件
class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList     : [],
            parentId         : 0,
            categoryName     : ''
        };
    }
    //第一次加载
    componentDidMount(){
        this.loadCategoryAdd();
    }
    //加载分类列表,显示父分类列表
    loadCategoryAdd(){
        _promo.getCategoryList().then(res => {
            this.setState({
                categoryList : res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadCategoryAdd();
        });
    }
    //表单的值发生变化
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        });
    }
    //提交表单
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        //如果商品分类名称不为空 直接提交数据
        if (categoryName) {
            _promo.saveCategory({
                parentId : this.state.parentId,
                categoryName : categoryName
            }).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/promo-category/index');
            },(errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        //否则 提示错误
        else{
            _mm.errorTips('请输入分类名称');
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="新增分类"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-5">
                                    <select name="parentId"
                                        className="form-control"
                                        onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根分类/</option>
                                        {
                                            this.state.categoryList.map((category,index) => {
                                                return <option value={category.id} key={index}>根分类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">分类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                        placeholder="请输入分类名称"
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-success"
                                        onClick={(e) => this.onSubmit(e)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CategoryAdd;*/