import React        from 'react';
import { Link }     from 'react-router-dom';
import User         from 'service/user-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm   = new MUtil();
const _user = new User();

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import './index.scss';

//定义一个UserList组件
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            pageNum      : 1,
            listType     : 'list'
        };
    }
    //
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        _user.getUserList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
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
            this.loadUserList();
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render(){
        let listBody = this.state.list.map((user,index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>
                        <p className="form-control-static picture">
                            <img className="user-avatar"
                                src={`${user.imageHost}${user.avatar}`}/>
                        </p>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.balance}￥</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                    <td>{user.statusName}
                    </td>
                    <td>
                        <Link to={`/user/detail/${user.id}`}>详情</Link>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <TableList tableHeads={['ID','用户名','头像','邮箱','手机','账户余额','注册时间','状态','操作']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChangeNum(pageNum)}/>
            </div>
        );
    }
}
export default UserList;