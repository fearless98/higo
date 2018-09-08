import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Comment{
    //获取订单列表 支持list和search两种情况
    getCommentList(listParam){
        
        // 在调用getCommentList方法时，因为分为两种请求list/search
        // 所以请求的url和data都有两种 所以在外层重新定义url和data
         
        let url  = '',
            data = {};
        if(listParam.listType === 'list'){
            url          = '/admin/comment/get_comment_list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/admin/comment/search_comment.do';
            data.pageNum    = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }
    setCommentStatus(commentId){
        return _mm.request({
            type : 'post',
            url : '/admin/comment/delete_comment.do',
            data : commentId
        });
    }
}
export default Comment;