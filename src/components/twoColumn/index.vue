<template>
  <div>
    <!--两栏模式-->
    <div class="twoColumn" v-if="show">
      <div class="twoColumn-list">
        <img :src="singlePicUrlLeft" alt="">
      </div>
      <div class="twoColumn-list">
        <img :src="singlePicUrlRight" alt="">
      </div>
      <div class="clear"></div>
    </div>
  </div>
  

</template>

<script>

  export default {
    components: {},
    data() {
      return {
        type: '',
        singlePicUrlLeft: require ('@/assets/3.jpg'),
        singlePicUrlRight: require ('@/assets/4.jpg'),
        show: false
      };
    },
    
    //监听属性 类似于data概念
    computed: {},
    watch: {},
    methods: {
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
  .twoColumn{
    width:100%;
    .twoColumn-list{
      width:50%;
      float:left;
    }
    .twoColumn-list img{
      width:100%;
    }
    .clear{
      clear:both
    }
  }
  
</style>