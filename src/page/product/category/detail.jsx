import React        from 'react';
import Product      from 'service/product-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm     = new MUtil();
const _product   = new Product();

class CategoryDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryId : this.props.match.params.categoryId,//从参数里传入的id
            categoryInfo : {},
            name        : '',
            status   : '',
            taxRate  : ''
        }
    }
    componentDidMount(){
        this.loadCategoryDetail();
    }
    //加载分类详情 接口请求详情数据
    loadCategoryDetail(){
        _product.getCategoryDetail(this.state.categoryId).then((res) => {
            this.setState(res);
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //提交表单
    onSubmit(e){
        let name = this.state.name.trim();
        let taxRate = this.state.taxRate;
        //如果分类名称不为空 直接提交数据
        if (name) {
            _product.updateCategory({
                id : this.state.categoryId,
                name : name,
                taxRate : taxRate
            }).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
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
        // let categoryList  = this.state.categoryInfo || [];
        return (
            <div id="page-wrapper">
                <PageTitle title="分类详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">类别名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入类别名称"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">税率</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder="请输入税率"
                                    name="taxRate"
                                    value={this.state.taxRate}
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
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
        )
    }
}

export default CategoryDetail;