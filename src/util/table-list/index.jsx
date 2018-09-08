import React        from 'react';

//通用的列表组件
class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //isFirstLoading只在第一次加载时为true 其它时候都是false
            isFirstLoading : true
        }
    }
    //在组件更新的时候触发isFirstLoading
    //触发更新组件
    componentWillReceiveProps(){
        this.setState({
            isFirstLoading : false
        });
    }
    render(){
        //表头信息
        let tableHeader = this.props.tableHeads.map(
            (tableHead,index) => {
                if (typeof tableHead === 'object') {
                    return <th key={index} width={tableHead.width}>{tableHead.name}</th>
                }else if(typeof tableHead === 'string'){
                    return <th key={index}>{tableHead}</th>
                }
            }
        );
        //列表内容
        let listBody = this.props.children;
        //列表的信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                {this.state.isFirstLoading ? '正在加载数据...' : '很抱歉，没有找到相应的结果...'}</td>
            </tr>
        );
        //判断表单里是否有listBody 没有就显示listInfo
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return (
            <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    {tableHeader}
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default TableList;