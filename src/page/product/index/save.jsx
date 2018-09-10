//保存商品信息
import React        from 'react';
import Product      from 'service/product-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader  from 'util/file-uploader/index.jsx';
import RichEditor   from 'util/rich-editor/index.jsx';

import './save.scss';

const _mm      = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id               : this.props.match.params.pid,
            name             : '',
            subtitle         : '',
            categoryId       : 0,
            subImages        : [],
            price            : '',
            quantity         : '',
            detail           : '', //富文本字段
            status           : 1 //商品状态 1为在售
            // statusName       : ''
        }
    }
    componentDidMount(){
        //加载loadProduct
        this.loadProduct();
    }
    //加载商品详情 接口请求详情数据
    loadProduct(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){//split错误 id需判空
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }    
    }
    //简单字段的改变 如：商品名称/描述/价格/数量
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //分类选择器的变化
    onCategoryChange(categoryId){
        this.setState({
            categoryId       : categoryId,
        });
    }
    //上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
    }
    //上传图片失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }
    //删除已选择的图片
    onImageDelete(e){
        let index     = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages : subImages
        });
    }
    //富文本编辑器的变化
    onDetailValueChange(value){
        this.setState({
            detail: value
        });
    }
    //用map处理subImages subImages是一个数组
    getsubImagesString(){
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    //提交表单
    onSubmit(){
        let product = {
            name         : this.state.name,
            subtitle     : this.state.subtitle,
            categoryId   : parseInt(this.state.categoryId),
            subImages    : this.getsubImagesString(),
            detail       : this.state.detail,
            price        : parseFloat(this.state.price),
            quantity     : parseInt(this.state.quantity),
            status       : this.state.status
        },
        //先验证表单的字段
        productCheckResult = _product.checkProduct(product);
        //若有id则为 编辑
        if (this.state.id) {
            product.id = this.state.id;
        }
        //表单验证成功
        if (productCheckResult.status) {
            _product.saveProduct(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        //表单验证失败
        else{
            _mm.errorTips(productCheckResult.msg);
        }
       
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="编辑商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入商品名称"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入商品详情"
                                name="subtitle"
                                value={this.state.subtitle}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">购买类型</label>
                        <div className="col-md-5">
                            <p>{this.state.typeName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">发布者</label>
                        <div className="col-md-5">
                            <p>{this.state.username}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                            categoryId={this.state.categoryId}
                            onCategoryChange={(categoryId) => this.onCategoryChange(categoryId)}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder="价格"
                                    name="price"
                                    value={this.state.price}
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">数量</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder="数量"
                                    name="quantity"
                                value={this.state.quantity}
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">产品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => (
                                        <div key={index}  className="img-con">
                                            <img className="img" src={image.url}/>
                                            <i className="fa fa-close" index={index} onClick={(e)=> this.onImageDelete(e)}></i>
                                        </div>)
                                ) : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">产品详情</label>
                        <div className="col-md-10">
                            <RichEditor 
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onDetailValueChange(value)}/>
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

export default ProductSave;