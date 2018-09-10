import React        from 'react';
import { Link }     from 'react-router-dom';
import Feedback     from 'service/feedback-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm       = new MUtil();
const _feedback  = new Feedback();

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

class FeedbackList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            pageNum : 1
        };
    }
    //第一次加载
    componentDidMount(){
        this.loadFeedbackList();
    }
    //加载反馈列表
    loadFeedbackList(){
        let pageNum = this.state.pageNum;
        _feedback.getFeedbackList(pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadFeedbackList();
        });
    }
    render(){
        let listBody = this.state.list.map((feedback,index) => {
            return (
                <tr key={index}>
                    <td>{feedback.id}</td>
                    <td>{feedback.orderNo}</td>
                    <td>{feedback.userId}</td>
                    <td>{feedback.username}</td>
                    <td>{feedback.statusName}
                    </td>
                    <td>
                        <Link to={`/feedback/detail/${feedback.id}`}>去解决</Link>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="反馈列表">
                </PageTitle>
                <TableList tableHeads={['反馈ID','订单号','用户ID','用户名','反馈状态','操作']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChangeNum(pageNum)}/>
            </div>
        );
    }
}
export default FeedbackList;