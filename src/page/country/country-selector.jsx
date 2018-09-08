import React        from 'react';
import MUtil        from 'util/mm.jsx';
import Promo        from 'service/promo-service.jsx';
import Country      from 'service/country-service.jsx';
const _mm           = new MUtil();
const _promo        = new Promo();
const _country      = new Country();

// 分类选择器
class CountrySelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countryList   : [],
            countryId     : 0
        }
    }
    componentDidMount(){
        this.loadCountry();
    }
    componentWillReceiveProps(nextProps){
        let countryIdChange = this.props.countryId !== nextProps.countryId;
        this.setState({
            countryId : nextProps.countryId
        });
    }
    loadCountry(){
        _country.getCountryList(this.state.countryId).then(res => {
            this.setState({
                countryList : res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // 选择国家
    onFirstCountryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            countryId     : newValue,
            countryList  : []
        }, () => {
            // 更新
            this.loadCountry();
            this.onCountryChange();
        });
    }
    // 传给父组件选中的结果
    onCountryChange(){
        // 判断props里的回调函数存在
        let countryChangable = typeof this.props.onCountryChange === 'function';
            countryChangable && this.props.onCountryChange(this.state.countryId, 0);
    }
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control country-select"
                    value={this.state.countryId}
                    onChange={(e) => this.onFirstCountryChange(e)}
                    readOnly={this.props.readOnly}>
                    <option value="">请选择国家</option>
                    {
                        this.state.countryList.map(
                            (country, index)=> <option value={country.id} key={index}>{country.name}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}
export default CountrySelect;