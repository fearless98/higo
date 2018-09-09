// import React        from 'react';
// import User        from 'service/user-service.jsx';
// import MUtil        from 'util/mm.jsx';
// import PageTitle    from 'component/page-title/index.jsx';
// import TableList    from 'util/table-list/index.jsx';
// import './detail.scss';

// const _mm     = new MUtil();
// const _user   = new User();

// class UserDetail extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             userId : this.props.match.params.userId,//从参数里传入的id
//             userInfo : {},//空对象 保存用户相关的信息
//             idImages : [],
//             status   : ''
//         }
//     }
//     componentDidMount(){
//         this.loadUserDetail();
//     }
//     //加载用户详情 接口请求详情数据
//     loadUserDetail(){
//         _user.getUserDetail(this.state.userId).then((res) => {
//             let images = res.idImages.split(',');
//             res.idImages = images.map((imgUri) => {
//                 return {
//                     uri : imgUri,
//                     url : res.imageHost + imgUri
//                 }
//             });
//             this.setState({
//                 userInfo : res
//             });
//         }, (errMsg) => {
//             _mm.errorTips(errMsg);
//         });
//     }
//     onStatusChange(e){
//         let status = e.target.value
//         this.setState({
//             status : status
//         });
//     }
//     onSetUserStatus(e,userId){
//         if (window.confirm('是否确认更改该用户的状态？')) {
//             _user.setUserStatus(userId,this.state.status).then(res => {
//                 _mm.successTips(res);
//                 // this.loadUserDetail();
//                 this.props.history.push('/user/index');
//             },errMsg => {
//                 _mm.errorTips(errMsg);
//             });
//         }
//     }
//     render(){
//         let userList  = this.state.userInfo || [];
//         return (
//             <div id="page-wrapper">
//                 <PageTitle title="用户详情"/>
//                 <div className="form-horizontal">
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">用户id</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">{userList.id}</p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">用户名</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">
//                                 {userList.username}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">头像</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">
//                                 <img className="p-img"
//                                     src={`${this.state.userInfo.imageHost}${userList.avatar}`}/>
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">电话</label>
//                         <div className="col-md-8">
//                             <p className="form-control-static">
//                                 {userList.phone}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">邮箱</label>
//                         <div className="col-md-8">
//                             <p className="form-control-static">
//                                 {userList.email}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">评分</label>
//                         <div className="col-md-8">
//                             <p className="form-control-static">
//                                 {userList.score}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">总评分</label>
//                         <div className="col-md-8">
//                             <p className="form-control-static">
//                                 {userList.totalScore}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">销售量</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">
//                                 {userList.sellCount}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">账户余额</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">
//                                 ￥{userList.balance}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">注册时间</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">{userList.createTime}</p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">身份认证</label>
//                         <div className="col-md-10">
//                             {
//                                 this.state.idImages.length ? this.state.idImages.map(
//                                     (image, index) => (
//                                         <div key={index}  className="img-con">
//                                             <img className="img" src={image.url}/>
//                                         </div>)
//                                 ) : (<div>暂无图片</div>)
//                             }
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">用户状态</label>
//                         <div className="col-md-5">
//                             <p className="form-control-static">{userList.statusName}</p>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="col-md-2 control-label">审核</label>
//                         <select className="form-control promo-status"
//                                 name="statusName"
//                                 defaultValue = {this.state.userInfo.statusId}
//                                 onChange={(e) => {this.onStatusChange(e)}} >
//                             <option value="">请选择</option>
//                             <option value="2" >已通过</option>
//                             <option value="3" >未通过</option>
//                         </select>
//                         <button className="btn btn-md btn-info btn-userstatus btn-warning"
//                                 onClick={(e) => {this.onSetUserStatus(e,userList.id)}}>确认审核
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default UserDetail;