import React        from 'react';
import { Link }     from 'react-router-dom';
import Comment      from 'service/comment-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm      = new MUtil();
const _comment = new Comment();

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

//定义一个CommentList组件
class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],//存放数据
            pageNum      : 1,//存放页码
            //查看CommentList是从搜索来的还是从list来的 默认设为list listType只有在点击搜索时才会改变
            listType     : 'list' 
        };
    }
    //
    componentDidMount(){
        this.loadCommentList();
    }
    //加载评论列表
    loadCommentList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        //接口请求结果
        _comment.getCommentList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                //错误 将list清空 使页面加载错误信息提示
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    //定义搜索评论
    onSearch(searchType,searchKeyword){
        //判断searchKeyword是否为空 若为空按list来加载  若不为空则按搜索结果加载
        let listType = searchKeyword === '' ? 'list' : 'search';
        //点击搜索后，pageNum始终从第一页开始
        this.setState({
            listType      : listType,
            pageNum       : 1,
            searchType    : searchType,
            searchKeyword : searchKeyword
        },() => { //回调
            this.loadCommentList();
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadCommentList();
        });
    }
    //更改评论状态
    onSetCommentStatus(e, commentId, currentStatus){
        let newStatus = currentStatus;
        if (window.confirm('是否确认删除该评论？')) {
            _comment.setCommentStatus({
                commentId : commentId,
                status  : newStatus
            }).then(res => {
                _mm.successTips(res);
                //重新加载列表
                this.loadCommentList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        //表头数组
        let tableHeads =['评论ID','促销资讯ID','用户名','评论详情','评论时间','状态','操作'];
        return (
            <div id="page-wrapper">
                <PageTitle title="评论列表" />
                <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((comment,index) => {
                            return (
                                <tr key={index}>
                                    <td>{comment.id}</td>
                                    <td>{comment.promoId}</td>
                                    <td>{comment.username}</td>
                                    <td>{comment.content}</td>
                                    <td>{new Date(comment.createTime).toLocaleString()}</td>
                                    <td>{comment.statusName}</td>
                                    {/*<td>
                                        <button className="btn btn-xs btn-warning" 
                                            onClick={(e) => {this.onSetCommentStatus(e, comment.id, comment.statusId)}}>{comment.statusId == 1 ? '删除' : null}</button>
                                    </td>
                                    */}
                                    <td>
                                        {
                                            comment.statusId === 1
                                            ? <button className="btn btn-xs btn-warning"
                                                onClick={(e) => {this.onSetCommentStatus(e,comment.id,comment.statusId)}}>删除</button>
                                            : <button className="btn btn-xs" disable="true">删除</button> //若不是1状态 隐藏button
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChangeNum(pageNum)}/>
            </div>
        );
    }
}
export default CommentList;