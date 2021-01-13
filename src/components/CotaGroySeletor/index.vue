<template>
  <div>
<el-form :inline="true" :model="attrsPropId" class="demo-form-inline">
  <el-form-item label="一级分类">
    <el-select v-model="attrsPropId.category1Id" placeholder="请选择" @change="changeCategory1">
      <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in category1IdList" :key="c1.id"  ></el-option>
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="二级分类">
    <el-select v-model="attrsPropId.category2Id" placeholder="请选择" @change="changeCategory2">
      <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in category2IdList" :key="c2.id"  ></el-option>
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="三级分类">
    <el-select v-model="attrsPropId.category3Id" placeholder="请选择" @change="changeCategory3">
      <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in category3IdList" :key="c3.id"  ></el-option>
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
  
</el-form>

  </div>
</template>

<script>
export default {
  name: 'CotaGroySeletor',
   data() {
      return {
        attrsPropId: {
          category1Id:'',
          category2Id:'',
          category3Id:'',
        },
        category1IdList:[],
        category2IdList:[],
        category3IdList:[],
      }
    },
  mounted(){
    this.getCategoryId()
  },
  methods:{
    // 三级获取完的回调
    changeCategory3(){
      this.$emit('getattrsList',this.attrsPropId)
    },
    // 获取三级
    async changeCategory2(id){
      // console.log(id);
       this.attrsPropId.category3Id = ''
       this.category3IdList = []
      try {
        const result = await this.$API.cotaGroySeletor.getCategoryC3List(id)
        if(result.code === 200){
           this.category3IdList = result.data
            this.$emit('getattrsList',this.attrsPropId)
        }else{
          return Promise.reject(new Error('获取san集列表失败'))
        }
      } catch (error) {
        alert(error.message || '未知错误')
      }
    },
    // 获取二级目录
    async changeCategory1(id){
      // console.log(id);
      this.attrsPropId.category2Id = ''
      this.attrsPropId.category3Id = ''
      this.category2IdList = []
      this.category3IdList = []
      try {
        const result = await this.$API.cotaGroySeletor.getCategoryC2List(id)
        if(result.code === 200){
           this.category2IdList = result.data
           this.$emit('getattrsList',this.attrsPropId)
        }else{
          return Promise.reject(new Error('获取er集列表失败'))
        }
      } catch (error) {
        alert(error.message || '未知错误')
      }
    },
    // 获取一级目录
    async getCategoryId(){
      try {
        const result = await this.$API.cotaGroySeletor.getCategoryC1List()
        if(result.code === 200){
            this.category1IdList = result.data
        }else{
          return Promise.reject(new Error('获取一集列表失败'))
        }
      } catch (error) {
          alert(error.message || '未知错误')
      }
      
    }
  },
}
</script>

<style lang="less" scoped>

</style>
