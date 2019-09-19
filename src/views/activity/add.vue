<template>
  <div class="app-container">
    <el-form :model="dataForm" :rules="rules" label-width="130px" ref="dataForm" class="demo-addForm">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="活动页名称" prop="title">
            <el-input v-model="dataForm.title" maxlength="50" placeholder="请输入活动页名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="路径" prop="path">
            <el-input v-model="dataForm.path" maxlength="50" placeholder="请输入活动页路径"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="活动简介" prop="desc">
            <el-input v-model="dataForm.desc" maxlength="50" placeholder="请输入活动简介"/>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="2">
          <el-form-item>
            <el-button type="primary" @click="submitForm()">
              <div v-if="selectId === 0">保存</div>
              <div v-else>更新</div>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
    <div class="column-wrap">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>组件</span>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item"> -->
            
              <div class="component">
                <el-button size="mini" type="primary" title="单图" icon="el-icon-check" @click="addStyle(1)">单图模式</el-button>
              </div>
              <div class="component">
                <el-button size="mini" type="success" title="轮播模式" icon="el-icon-info" @click="addStyle(2)">轮播模式</el-button>
              </div>
              <div class="component">
                <el-button size="mini" type="danger" title="两栏布局" icon="el-icon-delete" @click="addStyle(3)">两栏布局</el-button>
              </div>
              <div class="component">
                <el-button size="mini" type="success" title="表单" icon="el-icon-info" @click="addStyle(4)">表单</el-button>
              </div>
              <div class="component">
                <el-button size="mini" type="success" title="底部版权信息" icon="el-icon-info" @click="addStyle(5)">底部版权信息</el-button>
              </div>
           
          </el-card>
          
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>预览</span>
            </div>
            <preView ref="preView"></preView>
          </el-card>
          
        </el-col>
        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>编辑</span>
            </div>
            <editColumn ref="editColumn"></editColumn>
          </el-card>          
          
        </el-col>
      </el-row>
    </div>
   

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import preView from '@/components/preView'
import editColumn from '@/components/editColumn'
import Bus from '@/utils/bus'
import Activity from '@/api/activity'

export default {
  data() {
    return {
      dataForm: {
        // 活动页标题
        title: '',
        // 活动页名称
        path: '',
        //活动简介
        desc: ''
      },
      // 栏目内容 
      columnContent: {
      },
      columnList: [],
      formList: [],
      selectId: '',
      // 栏目类型名称
      imglable: '单图片',
      bodyImagesLoading: false,
      rules: {
        title: [{ required: true, message: '活动页标题不能为空！', trigger: 'blur' }],
        path: [{ required: true, message: '活动页路径不能为空！', trigger: 'blur' }],
        desc: [{ required: true, message: '活动页简介不能为空！', trigger: 'blur' }],
        // state: [{ required: true, message: '状态不能为空！', trigger: 'blur' }],
        // sorting: [{ required: true, message: '排序不能为空！', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.resetData()
    this.url = this.$http.adornUrl(`/category/uploadCategoryBac`)
    const rowData = this.$route.query.id || 0
    this.selectId = rowData
    if(rowData !== 0){
      this.setData(rowData)
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'editDates'
  //   ])
  // },
  mounted() {
    Bus.$on('toAddAct',data =>{
      this.formList = data
    })
  }, 
  
  watch: {
    dataForm: {
      handler (val) {
        let type = val.type
        switch(type){
          case 0: 
            this.imglable = '单图片'
            break
          case 1: 
            this.imglable = '多图片'
            break
          case 2: 
            this.imglable = '两栏布局'
            break
          case 3: 
            this.imglable = '表单'
            break
          default:
            this.imglable = '单图片'
            break
        }
      },
      deep: true
    }
  },
  components: {
    preView, editColumn
  },
  methods: {
    // 获取栏目的位置
    getColumnIndex (item) {
      console.log(item)
    },
    setData (row) {
      Activity.info(row).then(({data}) => {
        let {code, msg, result} = data
        if(code === 0){
          // console.log(result)
          // console.log(typeof(result))
          // let tempResult = JSON.parse(result)
          // console.log(tempResult)
          this.columnList = JSON.parse(result.column_content)
          this.dataForm.title = result.title
          this.dataForm.path = result.path
          this.dataForm.desc = result.desc
          this.$refs.preView.init(this.columnList)
        } else {
          this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err)
      }) 
    },
    addStyle (data) {
      let length = this.columnList.length
      switch(data){
        case 1:
          if(length === 0){
            let content = {'index': 1,'type': 1,'state': 1,'sorting': 1, 'images':[{'index': 1,'src': 'http://tg.heigrace.com/baidu/m/saishiban/images/shb/2.jpg'}],}
            this.columnList.push(content) 
          } else {
            console.log(this.columnList)
            let content = {'index': length + 1,'type': 1,'state': 1,'sorting': 1, 'images':[{'index': 1,'src': 'http://tg.heigrace.com/baidu/m/saishiban/images/shb/2.jpg'}],}
            this.columnList.push(content) 
          }
          break
        case 2:
          if(length === 0){
             let content = {'index': 1,'type': 2,'state': 1,'sorting': 1, 
            'images':[{'index': 1,'src': 'http://tg.heigrace.com/sogou/m/sogou-newpaper/img/30000%E5%B9%B3%E7%B1%B3.jpg'},
            {'index': 2,'src': 'http://tg.heigrace.com/sogou/m/sogou-newpaper/img/%E5%8D%8E%E5%8D%97%E5%9C%B0%E5%8C%BA%E6%9C%80%E5%AD%A6%E5%91%98.jpg'},
            {'index': 3,'src': 'http://tg.heigrace.com/sogou/m/sogou-newpaper/img/30000%E5%B9%B3%E7%B1%B3.jpg'}]}
            this.columnList.push(content) 
          } else {
            let content = {'index': length + 1,'type': 2,'state': 1,'sorting': 1, 
            'images':[{'index': 1,'src': 'http://tg.heigrace.com/sogou/m/sogou-newpaper/img/30000%E5%B9%B3%E7%B1%B3.jpg'},
            {'index': 2,'src': 'http://tg.heigrace.com/sogou/m/sogou-newpaper/img/%E5%8D%8E%E5%8D%97%E5%9C%B0%E5%8C%BA%E6%9C%80%E5%AD%A6%E5%91%98.jpg'},
            {'index': 3,'src': 'http://tg.heigrace.com/sogou/m/sogou-newpaper/img/30000%E5%B9%B3%E7%B1%B3.jpg'}]}
            this.columnList.push(content) 
          }
          break
        case 3:
          if(length === 0){
            let content = {'index': 1,'type': 3,'state': 1,'sorting': 1, 
            'images':[{'index': 1,'src': 'http://tg.heigrace.com/baidu/m/saishiban/images/3.jpg'},
            {'index': 2,'src': 'http://tg.heigrace.com/baidu/m/saishiban/images/4.jpg'}]}
            this.columnList.push(content) 
          } else {
            let content = {'index': length + 1,'type': 3,'state': 1,'sorting': 1, 
            'images':[{'index': 1,'src': 'http://tg.heigrace.com/baidu/m/saishiban/images/3.jpg'},
            {'index': 2,'src': 'http://tg.heigrace.com/baidu/m/saishiban/images/4.jpg'}]}
            this.columnList.push(content) 
          }
          break
        case 4:
          if(length === 0){
            let content = {'index': 1,'type': 4,'state': 1,'sorting': 1, 
            'images':[{'index': 1,'src': 'http://tg.heigrace.com/common/images/l-act-bac.jpg'}]}
            this.columnList.push(content)
          } 
          else {
            let content = {'index': length + 1,'type': 4,'state': 1,'sorting': 1, 
            'images':[{'index': 1,'src': 'http://tg.heigrace.com/common/images/l-act-bac.jpg'}]}
            this.columnList.push(content) 
          }
          break
        case 5:
          if(length === 0){
            let content = {'index': 1,'type': 5,'state': 1,'sorting': 1, 
            'images':[],'styles':[{'background': '#222','padding': '10px 0','line-height': '20px','font-size': '16px','color':'#fff'}],
            // 'images':[],'background': '#222','padding': '10px 0','line-height': '20px','font-size': '16px',
            'versions':[{'index': '1','content':'版权所有：广州黑格力斯教育科技有限公司'},{'index': '2','content':'copyright粤ICP备案17071499号'},]}
            // 'images':[],'styles':[{'background': '#222','padding': '0.64rem 0','line-height': '0.64rem','font-size': '0.38rem'}]}
            this.columnList.push(content)
          } 
          else {
            let content = {'index': length + 1,'type': 5,'state': 1,'sorting': 1, 
            'images':[],'styles':[{'background': '#222','padding': '10px 0','line-height': '20px', 'font-size': '16px','color':'#fff'}],
            // 'images':[],'styles':[{'background': '#222','padding': '10px 0','line-height': '20px','font-size': '16px'}],
            'versions':[{'index': '1','content':'版权所有：广州黑格力斯教育科技有限公司'},{'index': '2','content':'copyright粤ICP备案17071499号'},]}
            this.columnList.push(content) 
          }
          break
      }
      let columnList = this.columnList
      this.$nextTick(() => {
        this.$refs.preView.init(columnList)
        // this.$refs.preView.init(data,columnList)
      })
    },
    resetData () {
      this.dataForm = {
        title: '',
        path: '',
        desc: ''
      }
      this.formList = []
      this.columnList = []
      this.selectId = []
    },
    // 保存栏目
    submitForm () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.selectId === 0){
            Activity.save({
              'title':this.dataForm.title,
              'path':this.dataForm.path,
              'desc': this.dataForm.desc,
              'columns':this.formList,
            }).then(({data}) => {
              let {code, msg} = data
              if(code === 0){
                this.$message({
                  message: msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'activityList'
                    })
                  }
                })
              } else {
                this.$messag.error(msg)
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            Activity.update({
              'id': this.selectId,
              'title':this.dataForm.title,
              'path':this.dataForm.path,
              'desc': this.dataForm.desc,
              'columns':this.formList,
            }).then(({data}) => {
              let {code, msg} = data
              if(code === 0){
                this.$message({
                  message: msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({
                      name: 'activityList'
                    })
                  }
                })
              } else {
                this.$message.error(msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "src/styles/common.scss";
  .l-column-row{
    border:1px solid red;
    padding:10px;
    position:relative;
    .img-box{
      width:150px;
      border:1px solid blue;
      img{
        width:100%;
      }
    }
    .l-handleAbs{
      position:absolute;
      width:10%;
      right:28%;
      height:30px;
      top:0;
      bottom:0;
      margin:auto 0;
    }
    .preRrap{
      position:absolute;
      width:25%;
      right:0;
      top:0;
      border:1px solid red;
    }
  }
  .column-wrap{
    margin-top:30px;
  }
  .component{
    margin-top:50px;
  }
  .component:nth-of-type(1){
    margin-top:0px;
  }
  
</style>

