<template>
  <div class="app-container">
    <div class = "operate-wrapper">
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
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column header-align="center" align="center" type="index" label="NO" width="80" >
      </el-table-column>
      <el-table-column label="标题" prop="name" header-align="center" align="center">
      </el-table-column>
      <el-table-column label="操作" width="150">
          <template slot-scope="scope">
              <el-button size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click.stop="handleDel(scope.row)">删除</el-button>
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
import { categoryList } from '@/api/category'

export default {
  name: 'categoryList',
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
      totalNum: 100
    }
  },
  // beforeCreate () {
  //   this.getDataList()
  // },
  created () {
    this.getDataList()
  },
  methods: {
    getDataList() {
      const postData = this.searchData
      this.listLoading = true
      categoryList(postData).then(res => {
        if (res.data && res.data.code === 0) {
          this.listLoading = false
          this.list = res.data.data
          this.totalNum = res.data.totalNum
        } else {
          this.listLoading = false
          this.$message({
            message: res.data.status.Msg,
            type: 'error',
            duration: 3 * 1000
          })
        }
      }).catch(err => {
        this.listLoading = false
        console.log(err)
        this.$message({
          message: '读取接口失败！',
          type: 'error',
          duration: 3 * 1000
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
    // 删除
    handleDel(row) {
      this.$confirm('此操作不可逆，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const postData = {
          id: row.id
        }
        this.isLoading = true
        delProject(postData)
          .then(res => {
            this.isLoading = false
            if (res.data.status.Code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 5 * 1000
              })
              // 重载
              this.getList(this.searchData)
            } else {
              this.$message({
                message: res.data.status.Msg,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
          .catch(err => {
            this.isLoading = false
            this.$message({
              message: '请求接口失败！',
              type: 'error',
              duration: 5 * 1000
            })
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    // 搜索
    search() {
      this.searchData.page = 1
      this.getList(this.searchData)
    },
    // 置空搜索
    resetSearch() {
      this.searchData = {
        name: ''
      }
    },
    // 分页事件
    handleSizeChange(row) {
    // 每页显示数改变
      this.searchData.pagenum = row
      this.getList(this.searchData)
    },
    handleCurrentChange(row) {
    // 当前页改变
      this.searchData.page = row
      this.getList(this.searchData)
    }
    // 分页end
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/common.scss";
</style>

