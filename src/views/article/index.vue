<template>
  <div class="app-container">
    <div class = "operate-wrapper">
      <router-link  to="add" style="margin-right:30px">
        <a class="addNew">
            <el-button type="success">
            新增文章
            </el-button>
        </a>
      </router-link>
      <el-input clearable v-model="searchData.title" placeholder="搜索条件">
      </el-input>
      <el-button @click.stop="search()" type="primary">搜索</el-button>
      <el-button @click.stop="resetSearch()" type="danger">置空条件</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column header-align="center" align="center" type="index" label="NO" width="80" >
        <!-- <template slot-scope="scope">
          {{scope.row.id}}
        </template> -->
      </el-table-column>
      <el-table-column label="标题" prop="title" header-align="center" align="center" width="150">
      </el-table-column>
      <el-table-column label="内容" prop="content" align="center" header-align="center">
      </el-table-column>
      <el-table-column label="分类" prop="name" header-align="center" align="center" width="150">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="create_time" width="200" :formatter="dateFormatter">
      </el-table-column>
      <el-table-column label="操作" width="250" align="center" header-align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click.stop="handleDel(scope.row.id)">删除</el-button>
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
import { articleList, articleDelete } from '@/api/article'
import { dateSubstring } from '@/utils/index'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      // 搜索条件
      searchData: {
        title: '',
        content: ''
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
  methods: {
    getDataList(param) {
      const postData = param || this.searchData
      this.listLoading = true
      articleList(postData).then(res => {
        if (res.data && res.data.code === 0) {
          // 处理数据
          this.listLoading = false
          this.list = res.data.data
          this.totalNum = res.data.totalNum
        } else {
          this.listLoading = false
          this.$message({
            message: res.data.msg,
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
        name: 'editArticle',
        query: {
          id: row.id
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
        articleDelete(id).then(res => {
          if(res.data && res.data.code === 0){
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 3000,
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

