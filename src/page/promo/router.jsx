//promo的分路由
import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

//引用页面
import PromoList      from 'page/promo/index/index.jsx';
import PromoSave      from 'page/promo/index/save.jsx';
import PromoDetail    from 'page/promo/index/detail.jsx';
import CategoryList   from 'page/promo/category/index.jsx';
import CategoryAdd    from 'page/promo/category/add.jsx';

class PromoRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/promo/index" component={PromoList}/>
                <Route path="/promo/save/:pid?" component={PromoSave}/>
                <Route path="/promo/detail/:pid" component={PromoDetail}/>
                <Redirect exact from="/promo" to="/promo/index"/>
                <Redirect exact from="/promo-category" to="/promo-category/index"/>
            </Switch>
        )
    }
}

export default PromoRouter;