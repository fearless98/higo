import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Statistic{
    //首页数据统计
    getHomeCount(){
       return _mm.request({
            type : 'get',
            url  : '/admin/count/get_count.do'
        });
    }
}
export default Statistic;