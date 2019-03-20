<template>
  <div class="app-container">
    <div class="x-form">
      <el-form  width=100% v-loading = "isLoading" element-loading-spinner="el-icon-loading"  :model="dataForm" :rules="rules"  ref="dataForm" label-width="100px" 
        class="demo-addForm">
        <el-form-item label="文章名称" prop="title">
          <el-input v-model="dataForm.title" placeholder="请输入文章名称"></el-input>
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
          <!-- <el-button type="primary" @click="submitForm('addForm','add')" v-if="submitbtnStatus">立即创建</el-button> -->
          <el-button type="primary" @click="submitForm()">保存修改</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { articleInfo, articleUpdate } from '@/api/article'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'addArticle',
  data() {
    return {
      dataForm: {
        title: '',
        content: '',
        id: ''
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
          { required: true, message: '必填项', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    quillEditor
  },
  created() {
    const rowData = this.$route.query.id
    articleInfo(rowData).then(res => {
      if(res.data && res.data.code === 0) {
        this.dataForm.title = res.data.data.title
        this.dataForm.content = res.data.data.content
        this.dataForm.id = res.data.data.id
      }
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
    submitForm () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          articleUpdate({
            'id': this.dataForm.id,
            'title': this.dataForm.title,
            'content': this.dataForm.content
          }).then(res => {
            if(res.data && res.data.code === 0) {
              this.$message({
                message: '更新成功',
                type: 'success',
                duration: 3 * 1000,
                onClose: () => {
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

