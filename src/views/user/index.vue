<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchData" @keyup.enter.native="getDataList()">
      <el-form-item label="用户名">
        <el-input v-model="searchData.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchData.tel" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="resetSearch()">重置</el-button>
        <el-button type="primary" @click="addHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column header-align="center" align="center" type="index" label="NO" width="80" >
        <!-- <template slot-scope="scope">
          {{scope.row.id}}
        </template> -->
      </el-table-column>
      <el-table-column label="用户名" prop="username" header-align="center" align="center" width="150">
      </el-table-column>
      <el-table-column label="手机号" prop="tel" header-align="center" align="center">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="200" :formatter="dateFormatter">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center" header-align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click.stop="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="x-pagination">
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import Users from '@/api/users'
import { dateSubstring } from '@/utils/index'
// import selectCategory from '@/common-select/select-category'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      // 搜索条件
      searchData: {
        username: '',
        tel: '',
      },
      //  分页参数
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      totalNum: 100
    }
  },
  created () {
    this.getDataList()
  },
  components: {
    // selectCategory
  },
  methods: {
    getDataList(param) {
      const postData = param || this.searchData
      this.listLoading = true
      Users.list(postData).then(({data}) => {
        let {code, msg, result, totalNum} = data
        if (code === 200) {
          // 处理数据
          this.listLoading = false
          this.list = result
          this.totalNum = totalNum
        } else {
          this.listLoading = false
          this.$message({
            message: msg,
            type: 'error',
            duration: 1500
          })
        }
      }).catch(err => {
        this.listLoading = false
        console.log(err)
        this.$message({
          message: '读取接口失败！',
          type: 'error',
          duration: 1500
        })
      })
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        name: 'editUser',
        query: {
          id: row.id
        }
      })
    },
    // 新增
    addHandle() {
      this.$router.push({
        name: 'addUser',
        query: {
         
        }
      })
    },
    // 删除
    handleDel(id) {
      this.$confirm(`确定删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Users.delete(id).then(res => {
          if(res.data && res.data.code === 0){
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {})
    },
    // 搜索
    search() {
      this.searchData.currentPage = 1
      this.getDataList(this.searchData)
    },
    // 置空搜索
    resetSearch() {
      this.searchData = {
        title: '',
        content: ''
      }
      this.getDataList(this.searchData)
    },
    // 分页事件
    handleSizeChange(row) {
    // 每页显示数改变
      this.searchData.pageSize = row
      this.getDataList(this.searchData)
    },
    handleCurrentChange(row) {
    // 当前页改变
    console.log(row)
      this.searchData.currentPage = row
      this.getDataList(this.searchData)
    },
    // 分页end
    dateFormatter (row, column, cellValue) {
      return dateSubstring(cellValue)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/common.scss";
</style>

