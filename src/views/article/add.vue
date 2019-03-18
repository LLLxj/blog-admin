<template>
  <div class="app-container">
    <div class="x-form">
      <el-form  width=100% v-loading = "isLoading" element-loading-spinner="el-icon-loading"  :model="dataForm" :rules="rules" ref="dataForm" label-width="100px" 
        class="demo-addForm">
        <el-form-item label="文章名称" prop="title">
          <el-input v-model="dataForm.title" placeholder="请输入文章名称"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" prop="title">
          <selectCategory v-model="dataForm.categoryId" />
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
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { articleSave } from '@/api/article'
import { quillEditor } from 'vue-quill-editor'
import selectCategory from '@/common-select/select-category'

export default {
  name: 'addCompany',
  data() {
    return {
      dataForm: {
        title: '',
        content: '',
        categoryId: ''
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
    const rowData = this.$route.query.id ? JSON.parse(this.$route.query) : ''
    if (rowData) {
      this.submitbtnStatus = false
      this.xlog('update')
    } else {
      this.submitbtnStatus = true
      this.xlog('add')
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
          articleSave({
            'title': this.dataForm.title,
            'content': this.dataForm.content,
            'categoryId': this.dataForm.categoryId
          }).then(res => {
            if(res.data && res.data.code === 0){
              this.$message({
                message: '新增成功',
                type: 'success',
                duration: 3 * 1000,
                onClose: () => {
                  this.resetDataForm()
                  this.$router.push({
                    name: 'article'
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
          })
        }
      })
     
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/common.scss";
</style>

