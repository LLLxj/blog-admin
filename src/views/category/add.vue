<template>
  <div class="app-container">
    <div class="x-form">
      <el-form  width=100% v-loading = "isLoading" element-loading-spinner="el-icon-loading"  :model="dataForm" :rules="rules"  ref="dataForm" label-width="100px" 
        class="demo-addForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input-number v-model="dataForm.order" controls-position="right" @change="handleChange" :min="0" :max="6"></el-input-number>
        </el-form-item>

        <el-form-item label="背景图" prop="background">
          <el-upload class="upload-demo" v-model="dataForm.background" drag :action="GLOBAL.UPLOAD_URL" multiple :on-success="getUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          
          <div class="show-images">
            <img :src="this.dataForm.resource" alt="">
          </div>
        </el-form-item>

        <!-- <el-form-item label="分类背景图" prop="background">
          <el-upload class="upload-demo" action="http://localhost:5000/category/uploadCategoryBac/" :on-preview="handlePreview" :on-remove="handleRemove"
           :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> -->
       
        <!-- <el-form-item label="详细">
          <div class="edit_container">
          <quill-editor v-model="infoForm.a_content" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
          </div>
        </el-form-item> -->

        <el-form-item>
            <el-button type="primary" @click="submitForm()" v-if="submitbtnStatus">立即创建</el-button>
            <el-button type="primary" @click="updateForm()" v-else>保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Category from '@/api/category'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'addCompany',
  data() {
    var validateName = (rule, value, callback) => {
      if (value) {
        Category.checkName(value).then(res => {
          if(res.data && res.data.code === 200) {
            callback()
          } else {
            callback(new Error('该目录已存在'))
          }
        })
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      url: '',
      dataForm: {
        id: '',
        name: '',
        order: '',
        background: '',
        resource: ''
      },
      infoForm: {
        a_title: '',
        a_source: '',
        a_content:'',
      },
      fileList: [],
      editorOption: {},
      submitbtnStatus: true,
      isLoading: false,
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validateName, trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    quillEditor
  },
  created() {
    // 判断是新增还是修改
    const rowData = this.$route.query.id || 0
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
    setData(data) {
      Category.info(data).then(({data}) => {
        let {code, msg, result} = data
        if(code === 200) {
          this.dataForm = result
          this.dataForm.resource = result.background
        } else {
          this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleChange (data) {
      // console.log(data)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file); 
    },
    // 上传照片
    getUpload (res) {
      // console.log(res.data.resource)
      this.dataForm.background = res.data.resource
      this.dataForm.resource = res.data.resource
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    submitForm () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.submitbtnStatus) {
            Category.save({
              'name': this.dataForm.name,
              'order': this.dataForm.order,
              'background': this.dataForm.background
            }).then(res => {
              if(res.data && res.data.code == 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'categoryList'
                    })
                  }
                })
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    },
    updateForm () {
      Category.update({
        'id': this.dataForm.id,
        'name': this.dataForm.name,
        'order': this.dataForm.order,
        'background': this.dataForm.background
      }).then(res => {
        if(res.data && res.data.code === 200) {
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.$router.push({
                name: 'categoryList'
              })
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
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

