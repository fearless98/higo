import React        from 'react';
import { Link }     from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';

//定义一个Error组件
class Error extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="哎呀,出错啦!"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到该路径了呢，</span>
                        <Link to="/">点我返回首页呀</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Error;