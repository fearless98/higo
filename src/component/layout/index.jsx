import React from 'react';
import NavTop from 'component/top-nav/index.jsx';
import NavSide from 'component/side-nav/index.jsx';
import './theme.css';
import './index.scss';

class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;