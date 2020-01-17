<template>
  <section class="app-main">
    <el-card class="main-content-card">
      <transition name="fade-transform"
                  mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
.main-content-card {
  min-height: calc(96vh - 84px);
  width: 98%;
  margin: 0 auto;
  margin-top: 2vh;
}
</style>