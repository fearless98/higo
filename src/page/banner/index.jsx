import React        from 'react';
import Banner      from 'service/banner-service.jsx';
import MUtil        from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import FileUploader  from 'util/file-uploader/index.jsx';

const _mm     = new MUtil();
const _banner   = new Banner();

class BannerUpload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id          : this.props.match.params.pid,
            images        : []
        }
    }
    componentDidMount(){
        this.loadBanner();
    }
    loadBanner(){
        _banner.getBannerDetail().then((res) => {
            let imagess = res.images.split(',');
            res.images = imagess.map((imgUri) => {
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
    //上传图片成功
    onUploadSuccess(res){
        let images = this.state.images;
        images.push(res);
        this.setState({
            images : images
        });
    }
    //上传图片失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }
    //删除已选择的图片
    onImageDelete(e){
        let index     = parseInt(e.target.getAttribute('index')),
            images = this.state.images;
        images.splice(index, 1);
        this.setState({
            images : images
        });
    }
    //用map处理images images是一个数组
    getimagesString(){
        return this.state.images.map((image) => image.uri).join(',');
    }
    //提交表单
    onSubmit(){
        let banner = {
            images  : this.getimagesString(),
        };
            _banner.addBanner(banner).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/banner/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="轮播图管理"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">首页轮播图</label>
                        <div className="col-md-10">
                            {
                                this.state.images.length ? this.state.images.map(
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

export default BannerUpload;