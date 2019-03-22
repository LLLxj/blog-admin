<template>
  <div class="app-container">
    <div class="x-form">
      <el-form  width=100% v-loading = "isLoading" element-loading-spinner="el-icon-loading"  :model="dataForm" :rules="rules" ref="dataForm" label-width="100px" 
        class="demo-addForm">
        <el-form-item label="文章名称" prop="title">
          <el-input v-model="dataForm.title" placeholder="请输入文章名称"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" prop="category_id">
          <selectCategory v-model="dataForm.category_id" />
        </el-form-item>
        
        <el-form-item label="文章内容" prop="content">
          <el-input v-model="dataForm.content" type="textarea" :rows="2" placeholder="请输入文章内容" >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="详细">
          <div class="edit_container">
          <quill-editor v-model="infoForm.a_content"
                  ref="myQuillEditor"
                  class="editer"
                  :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
          </div>
        </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="submitForm()" v-if="submitbtnStatus">立即创建</el-button>
            <el-button type="primary" @click="submitForm()" v-else>保存修改</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { articleSave, articleInfo, articleUpdate  } from '@/api/article'
import { quillEditor } from 'vue-quill-editor'
import selectCategory from '@/common-select/select-category'

export default {
  name: 'addCompany',
  data() {
    return {
      dataForm: {
        id: '',
        title: '',
        content: '',
        category_id: ''
      },
      infoForm: {
        a_title: '',
        a_source: '',
        a_content:'',
      },
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
      articleInfo(data).then(res => {
        if(res.data && res.data.code === 0) {
          this.dataForm = res.data.data
        }
      }) 
    },
    resetDataForm () {
      this.dataForm = {
        title: '',
        content: '',
        categoryId: ''
      }
    },
    submitForm () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.submitbtnStatus){
            articleSave(this.dataForm).then(res => {
              if(res.data && res.data.code === 0){
                this.$message({
                  message: '新增成功',
                  type: 'success',
                  duration: 3 * 1000,
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
                  duration: 3 * 1000
                })
                this.resetDataForm()
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
             articleUpdate(this.dataForm).then(res => {
              if(res.data && res.data.code === 0) {
                this.$message({
                  message: '更新成功',
                  type: 'success',
                  duration: 3 * 1000,
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
                  duration: 3 * 1000
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
</style>

