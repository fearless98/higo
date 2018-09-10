import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Feedback{
    //根据反馈id获取反馈列表
    getFeedbackList(pageNum){
        return _mm.request({
            type    : 'get',
            url     : '/admin/feedback/get_feedback_list.do',
            data    : {
                pageNum : pageNum || 1
            }
        });
    }
    //获取反馈详情
    getFeedbackDetail(feedbackId){
        return _mm.request({
            type    : 'get',
            url     : '/admin/feedback/get_feedback_detail.do',
            data    : {
                feedbackId : feedbackId
            }
        });
    }
    //修改反馈状态
    setFeedbackStatus(feedbackId,status){
        return _mm.request({
            type : 'post',
            url : '/admin/feedback/update_feedback_status.do',
            data : {
                feedbackId : feedbackId,
                status : status
            }
        });
    }
}
export default Feedback;