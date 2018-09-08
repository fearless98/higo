//保存商品信息
import React        from 'react';
import Product      from 'service/product-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';

import './save.scss';

const _mm      = new MUtil();
const _product = new Product();

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id               : this.props.match.params.pid,
            name             : '',
            subtitle         : '',
            categoryId       : 0,
            subImages         : [],
            price            : '',
            detail           : '', //富文本字段
            status           : 1 //商品状态 1为正常
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
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }    
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="商品详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.categoryName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属国家</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.countryName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">购买类型</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.typeName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
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
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}></div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">单价</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.price}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">数量</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.quantity}
                            </p>
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
                            <p className="form-control-static">{this.state.username}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">发布时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.statusName}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;