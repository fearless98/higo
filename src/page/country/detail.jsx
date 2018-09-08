import React        from 'react';
import Country      from 'service/country-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import FileUploader  from 'util/file-uploader/index.jsx';

const _mm     = new MUtil();
const _country   = new Country();

class CountryDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id               : this.props.match.params.pid,
            name             : '',
            subtitle         : '',
            flag        : [],
            status           : 1 //国家状态 1为在售
        }
    }
    componentDidMount(){
        //加载loadcountry
        this.loadcountry();
    }
    //加载国家详情 接口请求详情数据
    loadcountry(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){//split错误 id需判空
            _country.getCountryDetail(this.state.id).then((res) => {
                let images = res.flag.split(',');
                res.flag = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }    
    }
    //简单字段的改变 如：国家名称/描述/价格/数量
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //上传图片成功
    onUploadSuccess(res){
        let flag = this.state.flag;
        flag.push(res);
        this.setState({
            flag : flag
        });
    }
    //上传图片失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }
    //删除已选择的图片
    onImageDelete(e){
        let index     = parseInt(e.target.getAttribute('index')),
            flag = this.state.flag;
        flag.splice(index, 1);
        this.setState({
            flag : flag
        });
    }
    //用map处理flag flag是一个数组
    getflagString(){
        return this.state.flag.map((image) => image.uri).join(',');
    }
    //提交表单
    onSubmit(){
        let country = {
            name         : this.state.name,
            flag         : this.getflagString(),
            status       : this.state.status
        },
        //先验证表单的字段
        countryCheckResult = _country.checkCountry(country);
        //若有id则为 编辑
        if (this.state.id) {
            country.id = this.state.id;
        }
        //表单验证成功
        if (countryCheckResult.status && this.state.id) {
            _country.saveCountry(country).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/country/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        //表单验证失败
        else{
            _country.addCountry(country).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/country/index');
            },(errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
       
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑国家' : '新增国家'}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">国家名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入国家名称"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">国旗</label>
                        <div className="col-md-10">
                            {
                                this.state.flag.length ? this.state.flag.map(
                                    (image, index) => (
                                        <div key={index}  className="img-con">
                                            <img className="img" src={image.url}/>
                                            <i className="fa fa-close" index={index} onClick={(e)=> this.onImageDelete(e)}></i>
                                        </div>)
                                ) : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-success"
                                onClick={(e) => this.onSubmit(e)}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CountryDetail;