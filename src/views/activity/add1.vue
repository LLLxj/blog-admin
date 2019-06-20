<template>
  <div class="app-container">
    <!-- <el-form v-loading="isLoading" element-loading-spinner="el-icon-loading" :model="dataForm" :rules="rules" label-width="80px" ref="dataForm" class="demo-addForm"> -->
    <el-form element-loading-spinner="el-icon-loading" label-width="80px" ref="dataForm" class="demo-addForm">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item>
            <el-button type="primary" @click="addColumn()">新增栏目</el-button>
            <el-button type="primary" @click="saveColumn()">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="l-column-row" v-for="item in columnList" :key="item.index">
        <el-row :gutter="20">
          <el-col :span="8">
            <!--广告类型(0:文本，1单图，2多图片)-->
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="dataForm.type">
                <el-radio :label="0">单图片</el-radio>
                <el-radio :label="1">多图片</el-radio>
                <el-radio :label="2">两栏布局</el-radio>
                <el-radio :label="3">表单</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="dataForm.state">
                <el-radio :label="0">隐藏</el-radio>
                <el-radio :label="1">显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="测试" prop="typeBody1">
        <!-- <el-form-item :label="this.imglable" prop="typeBody1"> -->
          <el-row :gutter="20">
            <el-col :span="7" @click="getColumnIndex(item)">
              <el-upload
                :action="url"
                :show-file-list="false"
                :on-success="imageUploadSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-form-item label="序号" prop="sorting">
                <el-input-number v-model="dataForm.sorting" class="box-input" :min="0" :max="999" controls-position="right"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-table :data="columnContent.images" ref="body-images" stripe>
                <el-table-column header-align="center" align="center" type="index" label="NO" width="80"/>
                <el-table-column label="图片" prop="img" header-align="center" align="center">
                  <template scope="scope">
                    <div>
                      <img :src="scope.row.img" alt="" style="max-width: 60px;">
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="跳转地址" prop="url" header-align="center" align="center" width="300">
                  <template scope="scope">
                    <el-input v-model="scope.row.url" maxlength="255" placeholder="请输入url"/>
                  </template>
                </el-table-column>

                <el-table-column label="操作" header-align="center" align="center" width="300" v-loading="bodyImagesLoading">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button size="mini" v-if="scope.$index > 0" type="primary" title="上移" icon="el-icon-caret-top" @click.stop="imagesUp(scope.$index)"></el-button>
                      <el-button size="mini"  type="primary" v-if="scope.$index != images.length-1" title="下移" icon="el-icon-caret-bottom" @click.stop="imagesDown(scope.$index)"></el-button>
                    </el-button-group>
                    <el-button-group>
                      <el-button size="mini" type="danger" title="删除" icon="el-icon-delete" @click.stop="imagesDel(scope.$index)" ></el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
                
              </el-table>

            </el-col>
          </el-row>
        </el-form-item>

        <div class="l-handleAbs">
          <el-button size="mini" type="primary" title="保存" icon="el-icon-check" @click="saveColumn()"></el-button>
          <el-button size="mini" type="success" title="编辑" icon="el-icon-info"></el-button>
          <el-button size="mini" type="danger" title="删除" icon="el-icon-delete"></el-button>
        </div>

        <div class="preRrap">
          <preView ref="preView"></preView>
        </div>
        

      </div>
    </el-form>

  </div>
</template>

<script>

import preView from '@/components/preView'

export default {
  data() {
    return {
      dataForm: {
        // 活动标题
        title: '',
        // 活动路径
        path: '',
        // 广告类型(0单图，1多图片,2两栏布局,3表单)
        type: 0,
        // 状态（0：隐藏，1：显示）
        state: 1,
        // 排序，最大999
        sorting: 1,
      },
      // 栏目内容
      columnContent: {
        'index': 1,
        'type': '',
        'state': 1,
        'sorting': 1,
        'images':[],
      },
      columnList: [
        {'index': 1, 'type': '', 'state': 0, 'sorting': 1, 'images':[],},
        {'index': 2, 'type': '', 'state': 1, 'sorting': 100, 'images':[],}
      ],
      // 栏目类型名称
      imglable: '单图片',
      bodyImagesLoading: false,
    }
  },
  created() {
    this.url = this.$http.adornUrl(`/category/uploadCategoryBac`)
  },
  watch: {
    dataForm: {
      handler (val) {
        let type = val.type
        switch(type){
          case 0: 
            this.imglable = '单图片'
            break
          case 1: 
            this.imglable = '多图片'
            break
          case 2: 
            this.imglable = '两栏布局'
            break
          case 3: 
            this.imglable = '表单'
            break
          default:
            this.imglable = '单图片'
            break
        }
      },
      deep: true
    }
  },
  components: {
    preView
  },
  methods: {
    addColumn () {
      console.log('新增栏目')
    },
    saveColumn () {
      console.log('保存栏目')
    },
    // 图片上传
    imageUploadSuccess(res, file, fileList) {
      if (res.data && res.code === 0) {
        let type = this.dataForm.type
        let length = this.columnContent.images.length
        console.log(type)
        console.log(length)
        switch(type){
          case 0: 
            if(length >=1 ){
              this.$message({
                message: "请确认该类型下的图片数量",
                type: 'fail',
                duration: 1500
              })
            } else {
              this.columnContent.images.push({ 'img': res.data.resource, 'url': '#'})
            }
            break
          case 1: 
            this.columnContent.images.push({ 'img': res.data.resource, 'url': '#'})
            break
          case 2: 
            if(length >= 2){
              this.$message({
                message: "栏目类型错误",
                type: 'fail',
                duration: 1500
              })
              this.columnContent.images.slice(0,2)
            } else {
              this.columnContent.images.push({ 'img': res.data.resource, 'url': '#'})
            }
            break
          case 3: 
            if(length >=1 ){
              this.$message({
                message: "栏目类型错误",
                type: 'fail',
                duration: 1500
              }) 
            } else {
              this.columnContent.images.push({ 'img': res.data.resource, 'url': '#'})
            }
            break
          default:
            this.columnContent.images.push({ 'img': res.data.resource, 'url': '#'})
            break
        }
        
        // this.images.push({ 'img': res.data.resource, 'url': '#'})
        console.log(this.columnContent.images)
      } else {
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
      this.columnContent.images.splice(index, 1)
      // this.body.images = this.body.images.splice(index, 1)
    },
    imagesUp(index) {
      this.bodyImagesLoading = true
      if (index !== 0) {
        // 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
        this.columnContent.images[index] = this.columnContent.images.splice(index - 1, 1, this.columnContent.images[index])[0]
      }
      this.bodyImagesLoading = false
    },
    // 多图片 下移
    imagesDown(index) {
      this.bodyImagesLoading = true
      if (index + 1 !== this.images.length) {
        // 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
        this.columnContent.images[index] = this.columnContent.images.splice(index + 1, 1, this.columnContent.images[index])[0]
      }
      this.bodyImagesLoading = false
    },
    // 保存栏目
    saveColumn () {

    },
    // 获取栏目的位置
    getColumnIndex (item) {
      console.log(item)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "src/styles/common.scss";
  .l-column-row{
    border:1px solid red;
    padding:10px;
    position:relative;
    .img-box{
      width:150px;
      border:1px solid blue;
      img{
        width:100%;
      }
    }
    .l-handleAbs{
      position:absolute;
      width:10%;
      right:28%;
      height:30px;
      top:0;
      bottom:0;
      margin:auto 0;
    }
    .preRrap{
      position:absolute;
      width:25%;
      right:0;
      top:0;
      border:1px solid red;
    }
  }
  
</style>

