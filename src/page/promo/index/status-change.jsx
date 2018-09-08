{/*
import React from 'react';

class StatusChange extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            statusChange : 'passed'
        }
    }
    //搜索框数据变化的时候
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //点击搜索按钮的时候
    onSetPromoStatus(){
        this.props.onSetPromoStatus(this.state.statusChange);
    }
    //输入关键字后按回车 自动提交
    onSearchKeywordKeyUp(e){
        if (e.keyCode === 13) {
            this.onSearch();
        }
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                name="statusChange"
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="expired">已过期</option>
                                <option value="pending">待审核</option>
                                <option value="passed">已通过</option>
                                <option value="rejected">未通过</option>
                            </select>
                        <button className="btn btn-mybtnn"
                            onClick={(e) => this.onSetPromoStatus()}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StatusChange;
*/}