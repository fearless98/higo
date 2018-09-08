import React    from 'react';
import {Link}   from 'react-router-dom';
import MUitl    from 'util/mm.jsx';
import User     from 'service/user-service.jsx';

const _mm   = new MUitl();
const _user = new User();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : _mm.getStorage('userInfo').username || ''
        }
    }
    //退出登录
    onLogout(){
        _user.logout().then(res => {
            //删除本地存储内的信息
            _mm.removeStorage('userInfo');
            //退出登录后回到登录页
            window.location.href = '/login';
        },errMsg => {
            _mm.errTips(errMsg);
        });
    }
    render(){
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">HIGO-后台管理</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user-o top-icon"></i>
                            {   //判断 当有username字段时显示‘欢迎***’，若没有则显示‘欢迎您’
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;