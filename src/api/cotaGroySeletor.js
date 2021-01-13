import request from '@/utils/request'

// /admin/product/getCategory1
// getCategory1

// GET /admin/product/getCategory2/{category1Id}
// getCategory2

// GET /admin/product/getCategory3/{category2Id}

export default {
    getCategoryC1List(){
        return request.get('/admin/product/getCategory1')
    },
    getCategoryC2List(category1Id){
        return request.get(`/admin/product/getCategory2/${category1Id}`)
    },
    getCategoryC3List(category2Id){
        return request.get(`/admin/product/getCategory3/${category2Id}`)
    }
}