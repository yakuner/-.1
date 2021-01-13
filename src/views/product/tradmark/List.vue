<template>
  <div>
      <el-button type="primary" icon="el-icon-plus" @click="addTm">添加</el-button>
           
      <el-table   
        
        ref="tmForm"
        :data="tradmarkList"
        border
        style="width: 100%;margin:20px 0">
        <el-table-column
          align="center"
          label="序号"
          width="80"
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="tmName"
          label="品牌名称"
          width="width">
        </el-table-column>
        <el-table-column
          label="品牌LOGO"
          width="width">
          <template slot-scope="{row,$index}">
              <img :src="row.logoUrl" alt="" style="width:60px;height:60px">
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="width">
          <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="addChange(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTM(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="getTradmarkList"
        :current-page="page"
        :page-sizes="[3, 5, 7]"
        :page-size="limit"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="total.total"
        style="text-align:center"
        >
      </el-pagination>

        <!-- 会话框显示 -->
           <el-dialog title="添加品牌" :visible.sync="dialogFormVisible"  ref="dialog">
            <el-form :model="tmForm" :rules="rules" ref="tmForm">
              <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input v-model="tmForm.tmName" autocomplete="off" style="width:80%" ></el-input>
              </el-form-item>
              <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                <!-- 上传的action是假的,我们需要自己手动进行上传 -->
                  <el-upload
                    
                    class="avatar-uploader"
                    action="/dev-api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
              </el-form-item>
               

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addOrChange('tmForm')">确 定</el-button>
            </div>
          </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Tradmark',
  mounted(){
    this.getTradmarkList()
  },
  data(){
    return{
      page:1,
      limit:3,
      tradmarkList:[],
      total:{},
      dialogFormVisible : false,
      isDialogFormVisible : true,
     
      tmForm:{
        tmName :'',
        logoUrl:'',
      },
       rules: {
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          logoUrl: [
            { required: true, message: '请选择要上传的图片', trigger: 'change' }
          ],
      },
    }
  },
  watch:{
    dialogFormVisible(){
      if(!this.dialogFormVisible){
          this.$refs.tmForm.resetFields();
      }
    }
  },
  methods:{
    
     
    // 传入之后的函数,在里面我们需要接收数据进行存储
    // 获取图片的三个步骤
    // 第一步改成我们请求的地址,自动发送请求,
    // 第二部接收回来的数据,
    // 第三步接收数据展示在页面中
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        if(res.code === 200){
          
          this.tmForm.logoUrl = res.data
        }else{
           this.$message.error('上传图片失败')
        }
      },
      // 上传之前的验证,可以写成一个数组,这样可以多选择几个格式
      beforeAvatarUpload(file) {
        const imgArr = ['image/jpeg','image/png']
        const type = imgArr.includes(file.type)
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!type) {
          this.$message.error('上传头像图片只能是 JPG 格式或者是 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return type && isLt2M;
      },
    // 添加按钮操作
    addTm(){
      this.tmForm = {
          tmName :'',
          logoUrl:'',
      }
       this.dialogFormVisible = true
    },
    // 修改按钮的逻辑
    addChange(row){
      // 如果直接赋值的话会修改我们显示的数据,我们需要用一个浅复制
        this.tmForm = {...row}
        this.dialogFormVisible = true
      
    },
    // 修改添加

     addOrChange(tmForm){
         this.$refs[tmForm].validate( async(valid) => {
            if (valid) { 
                const { id } = this.tmForm
                try {
                  const result = await this.$API.tradmark.putTardmarkGoods(this.tmForm)
                  if(result.code === 200){
                    this.dialogFormVisible = false
                    this.$message.success(`${id ? '修改' : '添加'}成功`)
                    // 成功则需要发送请求重新请求数据
                    this.getTradmarkList(id ? this.page : 1)
                  }
                } catch (error) {
                  this.$message.error(`${id ? '修改' : '添加'}失败了`)
                }
            } else {
              //  this.$message.error('请补全信息再提交');
              //  console.log(valid);
              return false;
            }
        });
    },
    deleteTM(row){
          this.$confirm(`确定要删除 [ ${ row.tmName } ] 这个品牌吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( async () => {
             
              try {
                 const result = await this.$API.tradmark.deleteTradmarkGoods( row.id )
                  if(result.code === 200){
                      this.getTradmarkList(this.tradmarkList.length > 1 ? this.page : 1)
                      this.$message( {type:'success', message:'删除成功!'} );
                  }else{
                    
                   return Promise.reject(new Error('删除失败了'))
               }
              } catch (error) {
                  return Promise.reject('filed')
              }
          }).catch(() => {
            // this.$message({type: 'info', message: '已取消删除'});          
          });
    },
    async getTradmarkList(page =1){
      this.page = page
      const result = await this.$API.tradmark.getTradMarkList(this.page,this.limit)
      if(result.code === 200){
        this.total = result.data
        this.tradmarkList = result.data.records
      }else{
        return Promise.reject(new Error('filled'))
      }
    },
    handleSizeChange(size){
      this.limit = size
      this.getTradmarkList()
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


