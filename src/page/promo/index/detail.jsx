//保存促销资讯信息
import React        from 'react';
import Promo      from 'service/promo-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import CountrySelector from '../../country/country-selector.jsx';

import './save.scss';

const _mm      = new MUtil();
const _promo = new Promo();

class PromoDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id               : this.props.match.params.pid,
            name             : '',
            categoryId       : 0,
            parentCategoryId : 0,
            subImages        : [],
            price            : '',
            detail           : '', //富文本字段
            status           : 1 //商品状态 1为在售
        }
    }
    componentDidMount(){
        //加载loadPromo
        this.loadPromo();
    }
    //加载商品详情 接口请求详情数据
    loadPromo(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){
            _promo.getPromo(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }    
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="促销资讯详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">促销名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所在国家</label>
                        <CountrySelector
                            readOnly
                            countryId={this.state.countryId}
                            onCountryChange={(countryId) => this.onCountryChange(countryId)}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control promo-price"
                                    value={this.state.price} readOnly/>
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
                                        </div>)
                                ) : (<div>暂无图片</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">促销详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}></div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">促销状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.statusName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">来源</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.source}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">发布人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.publisherName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">发布时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.createTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PromoDetail;