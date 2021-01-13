<template>
  <div>
      <el-card class="box-card">
           <CotaGroySeletor @getattrsList = "getattrsList"/>
      </el-card>
      <el-card class="box-card">
        11111
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'Attrs',
  data(){
    return {
      attrsProp:[],
      attrsPropId:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      }
    }
  },
  methods:{
    async getattrsList(attrsPropId){
      // 获取最新的传过来的id值,保证每次都是最新的值
      this.attrsPropId = { ...this.attrsPropId,...attrsPropId}
      //  const {category1Id,category2Id,category3Id} = attrsPropId
      // console.log(category1Id,category2Id,category3Id);
      // category1Id && category2Id && category3Id
      // 获取当前的传过来的总数,判断值的总数
      const IdNub = Object.values(attrsPropId).reduce( (pre,cur)=> {pre += cur ? 1 : 0  ;return pre},0)
      if(IdNub === 3){
       try {
          const result = await this.$API.attrs.getGoodsAttrsList(attrsPropId)
          if(result.code === 200){
            this.attrsProp = result.data
          }else{
            return Promise.reject(new Error('获取数据失败'))
          }
       } catch (error) {
            alert(error.message || '获取失败')
       }
      }else{
          console.log('ceshi');
          this.attrsProp = []

      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
