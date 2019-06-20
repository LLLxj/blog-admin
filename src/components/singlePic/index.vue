<template>
  <div>
    <!-- 单图模式 1-->
    <div class="singlePic-wrap" v-if="show">
       <div class="singlePic" v-for="imgs in columnList.images" :key="imgs.index">
          {{imgs}}
          <img :src="imgs.src" alt="">
        </div> 
    </div>
  </div>
  

</template>

<script>

  export default {
    components: {},
    data() {
      return {
        type: '',
        singlePicUrl: require ('@/assets/2.jpg'),
        show: false,
        columnList: []
      };
    },
    
    //监听属性 类似于data概念
    computed: {},
    watch: {},
    methods: {
      init (data) {
        this.show = true
        this.columnList = data
        console.log(this.columnList)
      }
    },
    created() {

    },
    mounted() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>

<style lang='scss' scoped>
  @import '@/styles/common.scss';
  .singlePic-wrap{
    width:100%;
    img{
      width:100%;
    }
  }
</style>