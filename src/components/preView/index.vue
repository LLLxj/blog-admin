<template>
  <div>
    <div class="column-list" :class="{'bor':clicked == item.index}" v-for="item in columnList" :key="item.index" @click="edit(item)">
      <!-- <div class="singlePic-wrap" v-show="item.type === 1"> -->
      <div class="singlePic-wrap" v-if="item.type === 1">
        <div class="singlePic" v-for="imgs in item.images" :key="imgs.index">
          <img :src="imgs.src" alt="">
        </div> 
      </div>

      <div class="swiper-wrap" v-if="item.type === 2">
        <div class="block">
          <el-carousel>
            <el-carousel-item v-for="imgs in item.images" :key="imgs.index">
             <img :src="imgs.src" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      
      <div class="twoColumn-wrap" v-if="item.type === 3">
        <div class="twoColumn" v-for="imgs in item.images" :key="imgs.index">
          <img :src="imgs.src" alt="">
        </div> 
        <div class="clear"></div>
      </div>

      <div class="form-wrap" v-if="item.type === 4">
        <div class="form" v-for="imgs in item.images" :key="imgs.index">
          <img :src="imgs.src" alt="">
        </div>
        
        <div class="form-wrap-abs">
          <div class="form-wrap-abs-form">
            <input type="text" placeholder="姓名">
          </div>
          <div class="form-wrap-abs-form">
            <input type="number" placeholder="电话号码">
          </div>
          <div class="form-wrap-abs-submit">
            免费获取
          </div>
        </div>
      </div>

      <div class="foot-wrap" v-if="item.type === 5" :style="item.styles">
        <p class="version" v-for="content in item.versions" :key="content.index">
          {{ content.content }}
        </p>
      </div>

    </div>

    <!-- <singlePic ref="singlePic"></singlePic>
    <twoColumn ref="twoColumn"></twoColumn> -->
  </div>
  

</template>

<script>
  import singlePic from '@/components/singlePic'
  import twoColumn from '@/components/twoColumn'
  // import editColumn from '@/components/editColumn'
  import Bus from '@/utils/bus'

  export default {
    components: {},
    data() {
      return {
        type: '',
        columnList: [],
        clicked: 1,
        addIcon: require ('@/assets/add.png'),
      };
    },
    components: {
      singlePic, twoColumn
    },
    created() {

    },
    mounted() {
    
    }, 
    //监听属性 类似于data概念
    computed: {
    
    },
    watch: {
      columnList: {
        handler (data) {
          Bus.$emit('toAddAct',data)  
        },
        deep: true
      },
    },
    methods: {
      // init (data,columnList) {
      init (columnList) {
        this.columnList = columnList
      },
      edit (data) {
        this.clicked = data.index
        this.editDate = data
        Bus.$emit('toEditData',data)
      }
    },
  }
</script>
<style lang='scss' scoped>
  @import '@/styles/common.scss';
  .column-list{
    width:100%;
  }
  .bor{
    border:1px dashed black;
  }
  .singlePic-wrap{
    width:100%;
    .singlePic{
      width:100%;
      img{
        width:100%;
      }
    }
  }
  .twoColumn-wrap{
    width:100%;
    .twoColumn{
      width:50%;
      float:left;
      img{
        width:100%;
      }
    }
  }
  .el-carousel .el-carousel__container{
    height: auto!important
  }
  .el-carousel__item{
    width:100%;
    img{
      width:100%;
    }
  }
  .form-wrap{
    width:100%;
    position:relative;
  }
  .form{
    width:100%;
  }
  .form img{
    width:100%;
  }
  .form-wrap img{
    vertical-align:top;
    width:100%;
  }
  .form-wrap-abs{
    position: absolute;
    width:72%;
    left:0;
    right:0;
    margin:0 auto;
    bottom:15px;
  }
  .form-wrap-abs-form{
    width:100%;
    margin-top:8px;
  }
  .form-wrap-abs-form input{
    width:100%;
    box-sizing: border-box;
    height:40px;
    line-height:40px;
    border:none;
    border-radius:2px;
    font-size:0.55rem;
    padding-left: 2%;
    color:#3a3a3a;
  }
  .form-wrap-abs-submit{
    height:40px;
    line-height:40px;
    font-size:0.5rem;
    text-align: center;
    background: #ff6900;
    color:#fff;
    margin-top:8px;
  }
  .version{
    text-align: center;
  }
</style>