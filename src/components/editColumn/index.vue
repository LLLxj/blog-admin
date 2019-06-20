<template>
  <div class="edit-wrap" v-if="editShow">

    <!-- 上传图片模块 -->
    <div class="edit-upload-wrap" v-if="show">
      <el-upload class="upload-demo" drag :action="url" multiple :on-success="imageUploadSuccess"
                :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-table :data="columnList.images" ref="columnList.images" stripe>
        <el-table-column header-align="center" align="center" type="index" label="NO" width="80"/>
        <el-table-column label="图片" prop="src" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.src" style="width: 50px;" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="跳转地址" prop="url" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.url" maxlength="255" placeholder="请输入url"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" v-if="scope.$index > 0" type="primary" title="上移" icon="el-icon-caret-top" @click.stop="imagesUp(scope.$index)"></el-button>
              <el-button size="mini"  type="primary" v-if="scope.$index != columnList.images.length-1" title="下移" icon="el-icon-caret-bottom" @click.stop="imagesDown(scope.$index)"></el-button>
            </el-button-group>
            <el-button-group>
              <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click.stop="imagesDel(scope.$index)" ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div> 

     <div class="edit-upload-wrap" v-else>

       <div style="padding:0 0 15px 0;">
         <el-button type="primary" @click="addVersion">新增</el-button>
       </div>

      <el-table :data="columnList.versions" ref="columnList.versions" stripe>
        <el-table-column header-align="center" align="center" type="index" label="NO" width="80"/>
        <el-table-column label="版权信息" prop="content" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.content" maxlength="255" placeholder="请输入版权信息"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" v-if="scope.$index > 0" type="primary" title="上移" icon="el-icon-caret-top" @click.stop="contentUp(scope.$index)"></el-button>
              <el-button size="mini"  type="primary" v-if="scope.$index != columnList.versions.length-1" title="下移" icon="el-icon-caret-bottom" @click.stop="contentDown(scope.$index)"></el-button>
            </el-button-group>
            <el-button-group>
              <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click.stop="contentDel(scope.$index)" ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <el-form :model="columnList.styles[0]" label-width="80px" ref="columnList.styles[0]" class="demo-addForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="背景色" prop="background">
              <!-- <el-input v-model="columnList.styles[0].background" placeholder="请输入"/> -->
              <el-color-picker v-model="columnList.styles[0].background"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文字颜色" prop="color">
              <el-color-picker v-model="columnList.styles[0].color"></el-color-picker>
              <!-- <el-input v-model="columnList.styles[0].color" maxlength="50" placeholder="请输入活动页路径"/> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
     </div>

  </div>
  

</template>

<script>
  import Bus from '@/utils/bus'

  export default {
    components: {},
    data() {
      return {
        type: '',
        url:'',
        imageUrl: require ('@/assets/2.jpg'),
        imageList: [],
        columnList: [],
        show: false,
        editShow: false,
      };
    },
    created() {
      this.url = this.$http.adornUrl(`/category/uploadCategoryBac`)
    },
    //监听属性 类似于data概念
    computed: {
    
    },
    mounted() {
      Bus.$on('toEditData',data =>{
        this.editShow = true
        if(data.type !== 5){
          this.show = true
        } else {
          this.show = false
        }
        this.columnList = data
      })
    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    watch: {
      
    },
    methods: {
      // 图片上传
      imageUploadSuccess(res, file, fileList) {
        let type = this.columnList.type
        let length = this.columnList.images.length
        if (res.data && res.code === 0) {
          if (type === 1) {
            if (length === 0){
              let tempData = {'index': 1, 'src':res.data.resource, 'url': '', }
              this.columnList.images.push(tempData)
            } else {
              this.$message.error('只能上传一张图片')
              // let tempData = { 'index': length + 1,'src':  res.data.resource, 'url': '',}
              // this.columnList.images.push(tempData)
            } 
          }  
          if (type === 2){
            if (length === 0){
              let tempData = {'index': 1, 'src':res.data.resource, 'url': '', }
              this.columnList.images.push(tempData)
            } else {
              let tempData = { 'index': length + 1,'src':  res.data.resource, 'url': '',}
              this.columnList.images.push(tempData)
            } 
          }
          if (type === 3) {
            if(length === 0){
              let tempData = {'index': 1, 'src':res.data.resource, 'url': '', }
              this.columnList.images.push(tempData)
            }
            if (length === 1 ) {
              let tempData = {'index': 2, 'src':res.data.resource, 'url': '', }
              this.columnList.images.push(tempData)
            }
            if (length === 2 ) {
              this.$message.error('只能上传两张图片')
            } 
          }  
        }else {
          this.$message(res.data.msg)
        }
       
      },
      // 上传图片 格式和大小校验
      beforeAvatarUpload(file) {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isImage) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isImage && isLt2M
      },
       // 多图片 删除图片方法
      imagesDel(index) {
        this.columnList.images.splice(index, 1)
        // this.body.images = this.body.images.splice(index, 1)
      },
      // 多图片 上移
      imagesUp(index) {
        if (index !== 0) {
          // 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
          this.columnList.images[index] = this.columnList.images.splice(index - 1, 1, this.columnList.images[index])[0]
        }
      },
      // 多图片 下移
      imagesDown(index) {
        if (index + 1 !== this.columnList.images.length) {
          // 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
          this.columnList.images[index] = this.columnList.images.splice(index + 1, 1, this.columnList.images[index])[0]
        }
      },
      // 版权信息上移
      contentUp(index) {
        if (index !== 0) {
          // 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
          this.columnList.versions[index] = this.columnList.versions.splice(index - 1, 1, this.columnList.versions[index])[0]
        }
      },
      // 版权信息下移
      contentDown(index) {
        if (index + 1 !== this.columnList.versions.length) {
          // 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
          this.columnList.versions[index] = this.columnList.versions.splice(index + 1, 1, this.columnList.versions[index])[0]
        }
      },
      // 多版权 删除版权方法
      contentDel(index) {
        this.columnList.versions.splice(index, 1)
        // this.body.images = this.body.images.splice(index, 1)
      },
      // 应用
      // apply () {
      //   this.formList.push(this.columnList)
      //   Bus.$emit('toAddAct',this.formList)
      // }
      addVersion () {
        let length = this.columnList.versions
        if(length === 0){
          let tempData = {'index': 1,'content': ''}
          this.columnList.versions.push(tempData)
        } else {
          let tempData = {'index': length + 1,'content': ''}
          this.columnList.versions.push(tempData)
        }

      }
    },
  }
</script>

<style lang='scss' scoped>
  @import '@/styles/common.scss';
  .edit-wrap{
    width:100%;
    img{
      width:100%;
    }
    .edit-upload-wrap{
      // width:80%;
      margin:0 auto;
    }
    .show-img{
      width:50%;
      margin:0 auto;
    }
    .demo-addForm{
      margin-top:20px;
    }
  }
  
</style>