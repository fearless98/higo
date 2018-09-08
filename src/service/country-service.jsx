import MUtil from 'util/mm.jsx'
const _mm   = new MUtil();

class Country{
    //根据国家id获取国家列表
    getCountryList(countryId){
        return _mm.request({
            type    : 'get',
            url     : '/admin/country/get_country_list.do',
            data    : {
                countryId : countryId || 0
            }
        });
    }
    //编辑国家
    saveCountry(country){
        return _mm.request({
            type : 'post',
            url  : '/admin/country/update_country.do',
            data : country
        });
    }
    //新增国家
    addCountry(country){
        return _mm.request({
            type  : 'post',
            url   : '/admin/country/add_country.do',
            data  : country
        });
    }
    //更新国家
    updateCountry(country){
        return _mm.request({
            type : 'post',
            url  : '/admin/country/update_country.do',
            data : country
        });
    }
    //获取国家详情
    getCountryDetail(countryId){
        return _mm.request({
            type    : 'get',
            url     : '/admin/country/get_country_detail.do',
            data    : {
                countryId : countryId
            }
        });
    }
    //修改国家状态
    setCountryStatus(country){
        return _mm.request({
            type : 'post',
            url : '/admin/country/update_country_status.do',
            data : country
        })
    }
    //检查保存产品的表单数据
    checkCountry(country){
        let result = {
            status : true,
            msg    : '验证通过'
        };
        //判断国家名称不能为空
        if (typeof country.name !== 'string' || country.name.length === 0) {
            return {
                status: false,
                msg: '国家名称不能为空!'
            }
        }
        return result;
    }
}
export default Country;