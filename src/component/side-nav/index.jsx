import React from 'react';
import {Link,NavLink} from 'react-router-dom';
import './index.scss';

class NavSide extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                            <div className="active-menu">
                                <div className="image">
                                    <img className="back-con"/>
                                    <div className="image-two">
                                        <img className="user-con"/>
                                    </div>
                                    <p className="p-con-one">Higo Admin</p>
                                    <p className="p-con-two">Copyright ©2017-2018 higo.party</p>
                                </div>
                            </div>
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-home fa-lg"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-user-o"></i>
                                <span>通用</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product-category" activeClassName="active-menu"> 分类管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/country" activeClassName="active-menu"> 国家管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/banner/index" activeClassName="active-menu">轮播图管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/promo">
                                <i className="fa fa-commenting-o"></i>
                                <span>资讯</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/promo" activeClassName="active-menu">资讯管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/comment" activeClassName="active-menu">评论管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/product">
                                <i className="fa fa-shopping-basket"></i>
                                <span>集市</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li className="pro">
                                    <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/feedback/index" activeClassName="active-menu">反馈管理</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavSide;