import request from '@/utils/request'

// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// attrInfoList
export default {
    getGoodsAttrsList( {category1Id,category2Id,category3Id} ){ 
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },
    deleteGoodsAttrs( attrId ){ 
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    },
    postGoodsAttrsList( attrs ){ 
        return request.post('/admin/product/saveAttrInfo',attrs)
    },

}
// DELETE /admin/product/deleteAttr/{attrId}
// deleteAttr

// GET /admin/product/getAttrValueList/{attrId}
// getAttrValueList

// POST /admin/product/saveAttrInfo