//prodcut的分路由
import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

//引用页面
import ProductList      from 'page/product/index/index.jsx';
import ProductSave      from 'page/product/index/save.jsx';
import ProductDetail    from 'page/product/index/detail.jsx';
import CategoryList     from 'page/product/category/index.jsx';
import CategoryAdd      from 'page/product/category/add.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                <Route path="/product-category/add" component={CategoryAdd}/>
                {/* render.. 用逻辑判断渲染*/}
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product-category" to="/product-category/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;