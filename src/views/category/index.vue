<template>
  <div class="app-container">
    <!-- <div class = "operate-wrapper">
      <router-link  to="add" style="margin-right:30px">
        <a class="addNew">
            <el-button type="success">
            新增分类
            </el-button>
        </a>
      </router-link>
      <el-input clearable v-model="searchData.name" placeholder="搜索条件">
      </el-input>
      <el-button @click.stop="search()" type="primary">搜索</el-button>
      <el-button @click.stop="resetSearch()" type="danger">置空条件</el-button>
    </div> -->

    <el-form :inline="true" :model="searchData"  @keyup.enter.native="getDataList()">
      <el-form-item label="分类名称">
        <el-input v-model="searchData.name" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="resetSearch()">重置</el-button>
        <el-button type="primary" @click="addHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column header-align="center" align="center" type="index" label="NO" width="80" >
      </el-table-column>
      <el-table-column label="分类名称" prop="name" header-align="center" align="center">
      </el-table-column>
      <el-table-column align="center" label='背景图'>
        <template slot-scope="scope">
          <img class="category-bac" :src="scope.row.background" alt="">
          <!-- <img src="{{scope.row.id}}" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createdAt" width="200" :formatter="dateFormatter">
      </el-table-column>
      <el-table-column label="操作" width="150" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click.stop="handleDel(scope.row)">删除</el-button>
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
import Category from '@/api/category'
import { dateSubstring } from '@/utils/index'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      // 搜索条件
      searchData: {
        name: ''
      },
      //  分页参数
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      totalNum: 100,
    }
  },
  // beforeCreate () {
  //   this.getDataList()
  // },
  created () {
    this.getDataList()
  },
  methods: {  
    getDataList(param) {
      const postData = param || this.searchData
      this.listLoading = true
      Category.list(postData).then(({data}) => {
        let {code, msg, result, totalNum} = data
        if (code === 200) {
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
        name: 'editCategory',
        query: {
          id: row.id
        }
      })
    },
    // 新增
     addHandle() {
      this.$router.push({
        name: 'addCategory',
        query: {
        }
      })
    },
    // 删除
    handleDel(row) {
      this.$confirm(`确定删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Category.delete(row.id).then(res => {
          console.log(res)
          if(res.data && res.data.code === 200){
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
        name: ''
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
.category-bac{
  width:30px;
  height:30px;
}
</style>

