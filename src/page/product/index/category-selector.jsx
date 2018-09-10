import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'
const _mm           = new MUtil();
const _product      = new Product();
import './category-selector.scss'

// 分类选择器
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList   : [],
            categoryId     : 0
        }
    }
    componentDidMount(){
        this.loadCategory();
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange  = this.props.categoryId !== nextProps.categoryId;
        this.setState({
            categoryId : nextProps.categoryId
        });
    }
    loadCategory(){
        _product.getCategoryList(this.state.categoryId).then(res => {
            this.setState({
                categoryList : res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    //选择分类
    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            categoryId     : newValue,
            categoryList  : []
        }, () => {
            //更新
            this.loadCategory();
            this.onCategoryChange();
        });
    }
    // 传给父组件选中的结果
    onCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
            categoryChangable && this.props.onCategoryChange(this.state.categoryId, 0);
    }
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control category-select"
                    value={this.state.categoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    readOnly={this.props.readOnly}>
                    <option value="">请选择分类</option>
                    {
                        this.state.categoryList.map(
                            (category, index)=> <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}
export default CategorySelector;