<template>
  <div class="app-container">
    <!-- <div class = "operate-wrapper">
      <router-link to="add" style="margin-right:30px">
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
    </div> -->
  
    <el-form :inline="true" :model="searchData">
      <el-form-item label="标题">
        <el-input v-model="searchData.title" placeholder="请输入标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="searchData.content" placeholder="请输入内容" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="分类">
        <selectCategory v-model="searchData.categoryId" />
      </el-form-item> -->
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="resetSearch()">重置</el-button>
        <el-button type="primary" @click="addHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border stripe highlight-current-row>
       <!--隐藏字段-->
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="ID"><span>{{ props.row.aId }}</span></el-form-item>
            <el-form-item label="栏目ID"><span>{{ props.row.cId }}</span></el-form-item>
            <el-form-item label="内容"><span>{{ props.row.body }}</span></el-form-item>
            <el-form-item label="创建时间">
              <span> <i class="el-icon-time"></i><span style="margin-left: 10px">{{ props.row.createdAt }}</span></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--展示的列-->
      <el-table-column header-align="center" align="center" type="index" label="NO" width="80" fixed/>
      <el-table-column label="标题" prop="title" header-align="center" align="center" width="500">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click.stop="handleEdit(scope.row)" >{{scope.row.title}}</el-button> -->
          <!-- <div class="overLength" :title="scope.row.title" style="color:#409EFF" @click.stop="handleEdit(scope.row)">{{scope.row.title}}</div> -->
          <div class="overLength" :title="scope.row.title">{{scope.row.title}}</div>
        </template>
      </el-table-column>
      <!--<el-table-column label="栏目cId" prop="cId" header-align="center" align="center" width="150"/>-->
      <el-table-column label="栏目名称" prop="cName" header-align="center" align="center"/>
      <el-table-column label="url" prop="url" header-align="center" align="center"/>
      <!--是否推荐（0:否，1:是）-->
      <el-table-column label="推荐" prop="isHot" header-align="center" align="center" width="80" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot === 0 ? 'success' : 'danger'" disable-transitions>{{scope.row.isHot===0?'正常':'推荐'}}</el-tag>
        </template>
      </el-table-column>
      <!--是否热门（0:否，1:是）-->
      <el-table-column label="热门" prop="isHeat" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHeat === 0 ? 'success' : 'danger'" disable-transitions>{{scope.row.isHeat===0?'正常':'热门'}}</el-tag>
        </template>
      </el-table-column>
      <!--是否头条（0:否，1:是）-->
      <el-table-column label="头条" prop="isHead" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHead === 0 ? 'success' : 'danger'" disable-transitions>{{scope.row.isHead===0?'正常':'头条'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="介绍" prop="isDes" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDes === 0 ? 'success' : 'danger'" disable-transitions>{{scope.row.isDes===0?'正常':'介绍'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === 0 ? 'info' : 'success'" disable-transitions>{{scope.row.state==0?'隐藏':'显示'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="点击量" prop="clickNum" header-align="center" align="center" width="100"/>
      <el-table-column label="排序序号" prop="sorting" header-align="center" align="center" width="80"/>
      <el-table-column label="缩略图" prop="pic" header-align="center" align="center" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!--单图-->
          <!-- <img :src="GLOBAL.BASE_URL_HEAD + scope.row.pic" @click="imageClick(GLOBAL.BASE_URL_HEAD + scope.row.pic)" style="max-height: 130px;max-width: 130px" lazy/> -->
          <img :src="scope.row.pic" @click="imageClick(scope.row.pic)" style="max-height: 50px;max-width: 50px" lazy/>
        </template>
      </el-table-column>
      <!--<el-table-column label="创建时间" prop="createTime" width="200" header-align="center" align="center":formatter="dateFormatter">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" width="150" align="center" header-align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click.stop="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click.stop="handleDel(scope.row)">删除</el-button>
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
import Article from '@/api/article'
import { dateSubstring } from '@/utils/index'
// import selectCategory from '@/common-select/select-category'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      // 搜索条件
      searchData: {
        title: '',
        content: '',
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
      Article.list(postData).then(({data}) => {
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
        name: 'editArticle',
        query: {
          aId: row.aId
        }
      })
    },
    // 新增
    addHandle() {
      this.$router.push({
        name: 'addArticle',
        query: {
         
        }
      })
    },
    // 删除
    handleDel(data) {
      this.$confirm(`确定删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' 
      }).then(() => {
        Article.delete(data.aId).then(res => {
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

