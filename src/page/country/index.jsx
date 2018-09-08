import React        from 'react';
import { Link }     from 'react-router-dom';
import Country      from 'service/country-service.jsx';
import MUtil        from 'util/mm.jsx';

const _mm       = new MUtil();
const _country  = new Country();

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';


class CountryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list         : [],
            countryId : this.props.match.params.countryId || 0
        };
    }
    //第一次加载
    componentDidMount(){
        this.loadCountryList();
    }
    //加载国家列表
    loadCountryList(){
        _country.getCountryList(this.state.countryId).then(res => {
            this.setState({
                list : res
            });
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    //当页数发生变化时
    onPageNumChangeNum(){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadCountryList();
        });
    }
    //更新国家的名字
    onUpdateName(countryId, countryName){
        let newName = window.prompt('请输入新的国家名称', countryName);
        if (newName) {
            _country.updateCountryName({
                countryId : countryId,
                countryName : newName
            }).then(res => {
                _mm.successTips(res);
                //成功后重新加载列表，显示最新的数据
                this.loadCountryList();
            },errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    //更改国家的状态
    onSetCountryStatus(e,countryId,currentStatus){
        let newStatus = currentStatus == 1 ? 0 : 1,
            confirmTips = currentStatus == 1 ? '是否确认停用该国家？' : '是否确认启用该国家？';
        if (window.confirm(confirmTips)) {
            _country.setCountryStatus({
                countryId : countryId,
                status : newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadCountryList();
            },errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    render(){
        let listBody = this.state.list.map((country,index) => {
            return (
                <tr key={index}>
                    <td>{country.id}</td>
                    <td>
                        <p className="form-control-static picture">
                            <img className="user-avatar"
                                src={`${country.imageHost}${country.flag}`}/>
                        </p>
                    </td>
                    <td>{country.name}</td>
                    <td>
                        <p>{country.statusId == 1 ? '启用' : '已停用'}</p>
                        <button className="btn btn btn-xs btn-warning btn-status"
                                onClick={(e) => {this.onSetCountryStatus(e,country.id,country.statusId)}}>
                                {country.statusId == 1 ? '停用' : '启用'}
                        </button>
                    </td>
                    <td>
                        <Link to={`/country/detail/${country.id}`}>修改</Link>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="国家列表">
                    <div className="page-header-right">
                        <Link to="/country/detail" className="btn btn-mybtn">
                            <i className="fa fa-plus"></i>
                            <span>新增国家</span>
                        </Link>
                    </div>
                </PageTitle>
                <TableList tableHeads={['国家ID','旗帜','国家名称','国家状态','操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}
export default CountryList;