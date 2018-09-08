import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Banner{
    getBannerDetail(){
        return _mm.request({
            type    : 'get',
            url     : '/admin/banner/get_banner.do',
            data    : ''
        });
    }
    addBanner(banner){
        return _mm.request({
            type : 'post',
            url  : '/admin/banner/add_banner.do',
            data : banner
        });
    }
}
export default Banner;