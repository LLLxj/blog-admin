<template>
  <div class="app-container">
    <div class="x-form">
      <el-form  width=100% v-loading = "isLoading" element-loading-spinner="el-icon-loading"  :model="dataForm" :rules="rules" ref="dataForm" label-width="100px" 
        class="demo-addForm">
        <el-form-item label="文章名称" prop="title">
          <el-input v-model="dataForm.title" placeholder="请输入文章名称"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" prop="categoryId">
          <selectCategory v-model="dataForm.categoryId" />
        </el-form-item>

        <el-form-item label="封面" prop="background">
          <el-upload class="upload-demo" v-model="dataForm.background" drag :action="GLOBAL.UPLOAD_URL" multiple :on-success="getUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          
          <div class="show-images">
            <img :src="this.dataForm.background" alt="">
          </div>
        </el-form-item>
        
        <!-- <el-form-item label="文章内容" prop="content">
          <el-input v-model="dataForm.content" type="textarea" :rows="2" placeholder="请输入文章内容" >
          </el-input>
        </el-form-item> -->
        <el-form-item label="详细">
          <div class="edit_container">
            <quill-editor v-model="dataForm.content" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()" v-if="submitbtnStatus">立即创建</el-button>
            <el-button type="primary" @click="submitForm()" v-else>保存修改</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import Article from '@/api/article'
import { quillEditor } from 'vue-quill-editor'
import selectCategory from '@/common-select/select-category'

export default {
  name: 'addCompany',
  data() {
    return {
      url: '',
      dataForm: {
        id: '',
        title: '',
        content: '',
        categoryId: '',
        background: '',
        resource: '',
        content:'',
      },
      // infoForm: {
      //   a_title: '',
      //   a_source: '',
      //   a_content:'',
      // },
      editorOption: {},
      isLoading: false,
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '必填项', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    quillEditor, selectCategory
  },
  created() {
    // 判断是新增还是修改
    const rowData = this.$route.query.id || 0
    this.url = this.$http.adornUrl(`/category/uploadCategoryBac`)
    if (rowData) {
      this.submitbtnStatus = false
      this.setData(rowData)
    } else {
      this.submitbtnStatus = true
    }
    this.$nextTick(() => {
      this.$refs['dataForm'].resetFields()
    })
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady(editor) {

    },
    setData (data) {
      Article.info(data).then(({data}) => {
        let {code, msg, result} = data
        if(code === 0) {
          this.dataForm = result
        } else {
          this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    resetDataForm () {
      this.dataForm = {
        id: '',
        title: '',
        content: '',
        categoryId: '',
        background: '',
        resource: '',
        content:'',
      }
    },
    handleChange (data) {
      console.log(data)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 上传照片
    getUpload (res) {
      this.dataForm.background = res.data.resource
      this.dataForm.resource = res.data.resource
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g,'<');
      str = str.replace(/&gt;/g,'>');
      return str;
    },
    submitForm () {
      this.dataForm.content = this.escapeStringHTML(this.dataForm.content)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.submitbtnStatus){
            Article.save(this.dataForm).then(res => {
              if(res.data && res.data.code === 0){
                this.$message({
                  message: '新增成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'articleList'
                    })
                  }
                })
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 1500
                })
                this.resetDataForm()
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
             Article.update(this.dataForm).then(res => {
              if(res.data && res.data.code === 0) {
                this.$message({
                  message: '更新成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'articleList'
                    })
                  }
                })
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 1500
                })
              }
            })
          }
          
        }
      })
     
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/common.scss";
 .show-images{
    width:40%;
    margin-top:30px;
  }
  .show-images img{
    width:100%
  }
</style>

