import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx';
import Statistic    from 'service/statistic-service.jsx';

const _mm        = new MUtil();
const _statistic = new Statistic();

import PageTitle    from 'component/page-title/index.jsx';
import './index.scss';
//定义一个home组件
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countUser : '-',
            countPromo : '-',
            countProduct : '-',
            countOrder : '-',
            countFeedback : '-'
        }
    }
    //调用loadCount
    componentDidMount(){
        this.loadCount();
    }
    //请求接口
    loadCount(){
        _statistic.getHomeCount().then(res =>{
            this.setState(res);
        }, errMsg =>{
            _mm.errorTips(errMsg);
        });
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="首页 ">
                </PageTitle>
                <div className="row all-count">
                    <div className="col-md-2">
                        <Link to="/user" className="color-box red">
                            <p className="desc">
                                <i className="fa fa-vcard-o"></i>
                                <span>用户总数</span>
                            </p>
                            <p className="count">{this.state.countUser}</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/promo" className="color-box brown">
                            <p className="desc">
                                <i className="fa fa-bell-o"></i>
                                <span>资讯总数</span>
                            </p>
                            <p className="count">{this.state.countPromo}</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/product" className="color-box green">
                            <p className="desc">
                                <i className="fa fa-shopping-basket"></i>
                                <span>商品总数</span>
                            </p>
                            <p className="count">{this.state.countProduct}</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/order" className="color-box blue">
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                            <p className="count">{this.state.countOrder}</p>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/feedback/index" className="color-box purple">
                            <p className="desc">
                                <i className="fa fa-meh-o"></i>
                                <span>反馈总数</span>
                            </p>
                            <p className="count">{this.state.countFeedback}</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;