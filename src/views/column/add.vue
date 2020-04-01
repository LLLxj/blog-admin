<template>
  <div class="app-container">
    <div class="x-form">
      <el-form v-loading = "isLoading" element-loading-spinner="el-icon-loading"  :model="dataForm" :rules="rules" ref="dataForm" label-width="130px"
        class="demo-addForm">
        <el-form-item label="栏目名称" prop="cName">
          <el-input v-model="dataForm.cName" maxlength="30" placeholder="请输入栏目名称"></el-input>
        </el-form-item>
        <el-form-item label="栏目url名称" prop="url">
          <el-input type="textarea" autosize v-model="dataForm.url" maxlength="255" placeholder="不填写默认为栏目名称转换为拼音，跳转外部链接请加http协议（列：https://www.baidu.com）"></el-input>
        </el-form-item>
        <el-form-item label="栏目SEO标题" prop="title">
          <el-input type="textarea" autosize v-model="dataForm.title" maxlength="100" placeholder="请输入栏目SEO标题"></el-input>
        </el-form-item>
        <el-form-item label="栏目SEO关键词" prop="keywords">
          <el-input type="textarea" autosize v-model="dataForm.keywords" maxlength="100"  placeholder="请输入栏目SEO关键词"></el-input>
        </el-form-item>
        <el-form-item label="栏目SEO描述" prop="description">
          <el-input type="textarea" autosize v-model="dataForm.description" maxlength="200" placeholder="请输入栏目SEO描述"></el-input>
        </el-form-item>
        <el-form-item label="栏目的父级栏目" prop="pId">
          <parentColomn v-model="dataForm.pId"></parentColomn>
        </el-form-item>
        <el-form-item label="栏目排序序号" prop="sorting">
          <el-input-number v-model="dataForm.sorting" class="box-input" :min="0" :max="999" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="栏目状态" prop="state">
          <el-radio-group v-model="dataForm.state">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()" v-if="addVisible">保存配置</el-button>
            <el-button type="primary" @click="submitForm()" v-else>修改配置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import Column from '@/api/column'
import { quillEditor } from 'vue-quill-editor'
import { getToken } from '@/utils/auth'
import parentColomn from '@/common-select/select-parent-column'

export default {
  name: 'addCompany',
  data() {
    return {
      url: '',
      // host: 'http://192.168.1.66:5000',
      addVisible: true,
      dataForm: {
        cId: '',
        cName: '',
        url: '',
        title: '',
        keywords: '',
        description: '',
        pId: '',
        state: 1,
        sorting: 0,
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
        cName: [{ required: true, message: '栏目名称不能为空', trigger: 'blur' }],
      }
    }
  },
  components: {
    quillEditor, parentColomn
  },
  created() {
    // 判断是新增还是修改
    const rowData = this.$route.query.data || 0
    if(rowData){
      this.addVisible = false
    } else {
      this.addVisible = true
    }
    this.$nextTick(() => {
      this.$refs['dataForm'].resetFields()
    })
    this.setData(rowData)
  },
  computed: {

  },
  methods: {
    resetDataForm () {
      this.$refs['dataForm'].resetFields()
      // this.dataForm = {
      //   cId: '',
      //   cName: '',
      //   url: '',
      //   title: '',
      //   keywords: '',
      //   description: '',
      //   pId: '',
      //   state: '',
      //   sorting: '',
      // }
    },
    setData (data) {
      if (data) {
        Column.info(data.cId).then(({data}) => {
          let { code, msg, result } = data
          if (code && code == 200) {
            this.dataForm = result
          }
        })
      }
      // console.log(data)
      // if(data !== 0){
      //   this.dataForm.cId = data.cId
      //   this.dataForm.cName = data.cName
      //   this.dataForm.url = data.url
      //   this.dataForm.title = data.title
      //   this.dataForm.keywords = data.keywords
      //   this.dataForm.description = data.description
      //   this.dataForm.pId = data.pId
      //   this.dataForm.state = data.state
      //   this.dataForm.sorting = data.sorting
      // }
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
      this.dataForm.logo =  res.data.file
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    submitForm () {
      let mythis = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.addVisible){
            Column.save(this.dataForm).then(({data}) => {
              let {code, msg} = data
              if(code === 200){
                this.$message({
                  message: msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'columnList'
                    })
                  }
                })
              } else {
                this.$message({
                  message: msg,
                  type: 'error',
                  duration: 1500
                })
              }
            }).catch(err => {
              if (err.response) {
                mythis.$message.error(err.response.data.msg);
              } else if (err.request) {
                // 发送请求但是没有响应返回
                console.log(err.request);
              } else {
                console.log('Error', err.msg);
              }
            })
          } else {
            Column.update(this.dataForm).then(({data}) => {
              let {code, msg} = data
              if(code === 200){
                this.$message({
                  message: msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'columnList'
                    })
                  }
                })
              } else {
                this.$message({
                  message: msg,
                  type: 'error',
                  duration: 1500
                })
              }
            }).catch(err => {
              if (err.response) {
                mythis.$message.error(err.response.data.msg);
              } else if (err.request) {
                // 发送请求但是没有响应返回
                console.log(err.request);
              } else {
                console.log('Error', err.msg);
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

