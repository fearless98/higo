//保存商品信息
import React        from 'react';
import Order        from 'service/order-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import './detail.scss';

const _mm      = new MUtil();
const _order   = new Order();

class OrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : this.props.match.params.orderNumber,
            orderInfo : {}
        }
    }
    componentDidMount(){
        //加载loadProduct
        this.loadOrderDetail();
    }
    //加载商品详情 接口请求详情数据
    loadOrderDetail(){
        // 有id的时候，表示是编辑功能，需要表单回填
            _order.getOrderDetail(this.state.orderNumber).then((res) => {
                this.setState({
                    orderInfo : res
                });
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
    }
    //发货操作
    onEndOrder(){
        if (window.confirm('是否确认关闭该订单？')) {
            _order.endOrder(this.state.orderNumber).then((res) => {
                _mm.successTips('已关闭该订单');
                this.loadOrderDetail();
            },(errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        let productList  = this.state.orderInfo || [];
        let tableHeads =[
            {name : '商品图片', width: '10%'},
            {name : '商品名称', width: '45%'},
            {name : '单价', width: '15%'},
            {name : '数量', width: '15%'},
            {name : '合计', width: '15%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">卖家</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.sellerUsername}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">买家</label>
                        <div className="col-md-8">
                            <p className="form-control-static">
                                {this.state.orderInfo.buyerUsername}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收货地址</label>
                        <div className="col-md-8">
                            <p className="form-control-static">
                                {this.state.orderInfo.address}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusName}
                                {
                                    //如果订单状态为1的话 为未付款状态
                                    this.state.orderInfo.statusId === 1
                                    ? <button className="btn btn-sm btn-primary btn-colse-order"
                                        onClick={(e) => {this.onEndOrder(e)}}>关闭订单</button>
                                    : null //若不是1状态 隐藏button
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.paymentMethodName}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.payTime}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">发货时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.dispatchTime}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">单价</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderInfo.productPrice}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">数量</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.productQuantity}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderInfo.totalAmount}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">物流单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.trackingNo}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.productName}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                <img className="p-img"
                                    src={`${this.state.orderInfo.imageHost}${this.state.orderInfo.productImage}`}/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail;