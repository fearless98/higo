import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

import Layout       from 'component/layout/index.jsx';
//引用页面
import Home             from 'page/home/index.jsx';
import ProductRouter    from 'page/product/router.jsx';
import PromoRouter      from 'page/promo/router.jsx';
import Login            from 'page/login/index.jsx';
import OrderList        from 'page/order/index.jsx';
import OrderDetail      from 'page/order/detail.jsx';
import CommentList      from 'page/comment/index.jsx';
import UserList         from 'page/user/index.jsx';
import UserDetail       from 'page/user/detail.jsx';

import CountryList      from 'page/country/index.jsx';
import CountryDetail    from 'page/country/detail.jsx';

import BannerUpload    from 'page/banner/index.jsx';

import FeedbackList     from 'page/feedback/index.jsx';
import FeedbackDetail   from 'page/feedback/detail.jsx';
import CategoryDetail   from 'page/product/category/detail.jsx';
import ErrorPage        from 'page/error/index.jsx';


class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/promo" component={PromoRouter}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                    <Route path="/user/index" component={UserList}/>
                    <Route path="/user/detail/:userId" component={UserDetail}/>
                    <Route path="/country/index" component={CountryList}/>
                    <Route path="/country/detail/:pid?" component={CountryDetail}/>
                    <Route path="/banner/index" component={BannerUpload}/>
                    <Route path="/feedback/index" component={FeedbackList}/>
                    <Route path="/feedback/detail/:feedbackId" component={FeedbackDetail}/>
                    <Route path="/category/detail/:categoryId" component={CategoryDetail}/>
                    <Route path="/comment/index" component={CommentList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Redirect exact from="/country" to="/country/index"/>
                    <Redirect exact from="/order" to="/order/index"/>
                    <Redirect exact from="/comment" to="/comment/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    {/* render.. 用逻辑判断渲染
                        "/"：从上往下匹配，如果是/login（不需要菜单） 则使用Login组件
                        如果是其它的所有页面 则都用layout的形式渲染
                    */}
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}

//绑定 入口
ReactDOM.render(
    <App />,
    document.getElementById('app')
);