//保存资讯信息
import React        from 'react';
import Promo      from 'service/promo-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import CountrySelector from '../../country/country-selector.jsx';
import FileUploader  from 'util/file-uploader/index.jsx';
import RichEditor   from 'util/rich-editor/index.jsx';

import './save.scss';

const _mm      = new MUtil();
const _promo = new Promo();

class PromoSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id               : this.props.match.params.pid,
            name             : '',
            categoryId       : 0,
            countryId        : 0,
            parentCategoryId : 0,
            subImages        : [],//存放上传成功后生产的图片的url
            price            : '',
            source           : '',
            detail           : '', //富文本字段
            statusId         : 1
        }
    }
    componentDidMount(){
        //加载loadPromo
        this.loadPromo();
    }
    //加载资讯详情 接口请求详情数据
    loadPromo(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){//split错误 id需判空
            _promo.getPromo(this.state.id).then((res) => {
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
    //简单字段的改变 如：促销资讯名称/描述/价格/数量
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //分类选择器的变化
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId       : categoryId,
            parentCategoryId : parentCategoryId
        });
    }
    //国家选择器的变化
    onCountryChange(countryId){
        this.setState({
            countryId : countryId
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
    getSubImagesString(){
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    //提交表单
    onSubmit(){
        let promo = {
            name        : this.state.name,
            // subtitle    : this.state.subtitle,
            categoryId  : parseInt(this.state.categoryId),
            countryId   : parseInt(this.state.countryId),
            subImages   : this.getSubImagesString(),
            detail      : this.state.detail,
            price       : parseFloat(this.state.price),
            source      : this.state.source,
            status      : this.state.status
        },
        //先验证表单的字段
        promoCheckResult = _promo.checkPromo(promo);
        //若有id则为 编辑
        if (this.state.id) {
            promo.id = this.state.id;
        }
        // 有promoId时为编辑促销资讯
        if (promoCheckResult.status && this.state.id) {
            _promo.updatePromo(promo).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/promo/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        //没有时为添加促销资讯
        else{
            _promo.addPromo(promo).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/promo/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑促销' : '添加促销'}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">促销名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入促销名称"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所在国家</label>
                        <CountrySelector
                            countryId={this.state.countryId}
                            onCountryChange={(countryId) => this.onCountryChange(countryId)}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">价格</label>
                        <div className="col-md-3">
                            <div className="input-group promo-price">
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
                        <label className="col-md-2 control-label">促销图片</label>
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
                        <label className="col-md-2 control-label">来源</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入促销资讯来源"
                                name="source"
                                value={this.state.source}
                                onChange={(e) => this.onValueChange(e)}/>
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

export default PromoSave;