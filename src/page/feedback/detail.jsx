import React        from 'react';
import Feedback     from 'service/feedback-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import './detail.scss';

const _mm     = new MUtil();
const _feedback   = new Feedback();

class FeedbackDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            feedbackId : this.props.match.params.feedbackId,//从参数里传入的id
            feedbackInfo : {},//空对象 保存反馈相关的信息
            status   : ''
        }
    }
    componentDidMount(){
        this.loadFeedbackDetail();
    }
    //加载反馈详情 接口请求详情数据
    loadFeedbackDetail(){
        _feedback.getFeedbackDetail(this.state.feedbackId).then((res) => {
            this.setState({
                feedbackInfo : res
            });
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    onStatusChange(e){
        let status = e.target.value
        this.setState({
            status : status
        });
    }
    onSetFeedbackStatus(e,feedbackId){
        if (window.confirm('是否确认更改该反馈的状态？')) {
            _feedback.setFeedbackStatus(feedbackId,this.state.status).then(res => {
                _mm.successTips(res);
                // this.loadFeedbackDetail();
                this.props.history.push('/feedback/index');
            },errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        let feedbackList  = this.state.feedbackInfo || [];
        return (
            <div id="page-wrapper">
                <PageTitle title="反馈详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">反馈id</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{feedbackList.id}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单id</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {feedbackList.orderNo}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户名</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {feedbackList.username}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">反馈详情</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {feedbackList.detail}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">反馈时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{feedbackList.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">反馈状态</label>
                        <select className="form-control promo-status"
                                name="statusName"
                                defaultValue = {feedbackList.statusId}
                                onChange={(e) => {this.onStatusChange(e)}} >
                            <option value="" >请选择</option>
                            <option value="0" >关闭</option>
                            <option value="2" >解决</option>
                        </select>
                        <button className="btn btn-md btn-info btn-userstatus btn-warning"
                                onClick={(e) => {this.onSetFeedbackStatus(e,feedbackList.id)}}>确认
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeedbackDetail;