<template>
  <div class="app-container">
    <div class="x-form">
        <el-form 
        width=100%
        v-loading = "isLoading"
        element-loading-spinner="el-icon-loading" 
        :model="addForm" :rules="rules" 
        ref="addForm" label-width="100px" 
        class="demo-addForm">
            <el-form-item label="项目名称" prop="project_name">
                <el-input v-model="addForm.project_name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目简介" prop="des">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入项目简介"
                v-model="addForm.des">
                </el-input>
            </el-form-item>
            <el-form-item label="项目标签" prop="tag">
                <el-select v-model="addForm.tag" placeholder="请选择项目标签">
                    <el-option label="标签1" value="1"></el-option>
                    <el-option label="标签2" value="2"></el-option>
                    <el-option label="标签3" value="3"></el-option>
                    <el-option label="标签4" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型" prop="type">
                <el-select v-model="addForm.tag" placeholder="请选择项目类型">
                    <el-option label="类型1" value="1"></el-option>
                    <el-option label="类型2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目网址" prop="web">
                <el-input v-model="addForm.web" placeholder="请输入项目网址"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="area_id">
                <el-select v-model="addForm.area_id" placeholder="请选择地区">
                    <el-option label="地区1" value="1"></el-option>
                    <el-option label="地区2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="团队" prop="team_id">
                <el-select v-model="addForm.area_id" placeholder="请选择团队">
                    <el-option label="team-1" value="1"></el-option>
                    <el-option label="team-2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('addForm','add')" v-if="submitbtnStatus">立即创建</el-button>
                <el-button type="primary" @click="submitForm('addForm','update')" v-else>保存修改</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
// import { getList, delProject } from '@/api/project'

export default {
  name: 'addTags',
  data() {
    return {
      addForm: {},
      submitbtnStatus: true,
      isLoading: false,
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '必填项', trigger: 'change' }
        ]
      }
    }
  },

  created() {
    // 判断是新增还是修改
    const rowData = this.$route.query.id ? JSON.parse(this.$route.query.id) : ''
    if (rowData) {
      this.submitbtnStatus = false
      this.xlog('update')
    } else {
      this.submitbtnStatus = true
      this.xlog('add')
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/common.scss";
</style>

