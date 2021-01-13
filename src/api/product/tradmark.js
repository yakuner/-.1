import request from '@/utils/request'

export default {
    // 请求列表数据
    getTradMarkList(page,limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    },
    // 添加或者修改的逻辑
    putTardmarkGoods(tradMarkInfo){
        // PUT /admin/product/baseTrademark/update
        return tradMarkInfo.id ? 
        request.put('/admin/product/baseTrademark/update',tradMarkInfo) :
        request.post('/admin/product/baseTrademark/save',tradMarkInfo)
    },
    deleteTradmarkGoods(id){
        return  request.delete(`/admin/product/baseTrademark/remove/${id}`)
    }
}