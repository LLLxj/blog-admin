<template>
  <div class="app-container">
    <div class="x-form">
      <el-form  width=100% v-loading = "isLoading" element-loading-spinner="el-icon-loading" status-icon  :model="dataForm" :rules="rules"  ref="dataForm" label-width="100px" 
        class="demo-addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dataForm.username" placeholder="请输入分类名称"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" :disabled="true" v-model="dataForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="repas">
          <el-input type="password" :disabled="true" v-model="dataForm.repas" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="tel">
          <el-input v-model="dataForm.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm()" v-if="submitbtnStatus">立即创建</el-button>
            <el-button type="primary" @click="updateForm()" v-else>保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { usersInfo, usersSave, usersUpdate } from '@/api/users'

export default {
  data() {
    var validatePas = (rule, value, callback) => {
      if (value) {
        if(value !== this.dataForm.password){
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      url: '',
      dataForm: {
        id: '',
        username: '',
        password: '',
        repas: '',
        tel: ''
      },
      submitbtnStatus: true,
      isLoading: false,
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        repas: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePas, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    // 判断是新增还是修改
    const rowData = this.$route.query.id || 0
    // this.url = this.$http.adornUrl(`/category/uploadCategoryBac`)
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
  methods: {
    setData(data) {
      usersInfo(data).then(res => {
        if(res.data && res.data.code === 0) {
          console.log(res)
          this.dataForm = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    submitForm () {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.dataForm)
        if (valid) {
          if (this.submitbtnStatus) {
            usersSave(this.dataForm).then(res => {
              if(res.data && res.data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'userList'
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
      usersUpdate(this.dataForm).then(res => {
        if(res.data && res.data.code === 0) {
          this.$message({
            message: '更新成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.$router.push({
                name: 'userList'
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

