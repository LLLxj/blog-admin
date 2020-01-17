<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger class="hamburger-container"
               :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>

    <div class="screenfull"
         @click="changeFullScreen()">
      <svg-icon icon-class="fullscreen"></svg-icon>
    </div>

    <el-dropdown class="avatar-container"
                 trigger="click">
      <!-- <div class="avatar-wrapper">
        <img class="user-avatar" :src="perSrc">
        <i class="el-icon-caret-bottom"></i>
      </div> -->
      <div class="avatar-wrapper">
        <div class="user-name">{{name}}</div>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown"
                        slot="dropdown">
        <router-link class="inlineBlock"
                     to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout"
                style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>

</template>

<script>
import { mapGetters } from 'vuex'
import SizeSelect from '@/components/SizeSelect'
import Breadcrumb from '@/components/Breadcrumb'
import screenfull from 'screenfull'
import Hamburger from '@/components/Hamburger'
import System from '@/api/login'
// import { clearLoginInfo } from '@/utils/index'
import { removeToken } from '@/utils/auth'

export default {
  data() {
    return {
      isFullscreen: false,
      perSrc: require('@/assets/person.gif')
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    SizeSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  init() {
    if (screenfull.enabled) {
      screenfull.on('change', () => {
        this.isFullscreen = screenfull.isFullscreen
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    changeFullScreen() {
      if (!screenfull.enabled) {
        this.$message({
          message: '你的浏览器不支持此功能',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    logout() {
      // this.$store.dispatch('logout').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
      System.logout().then(res => {
        if (res.data && res.data.code === 0) {
          removeToken()
          this.$router.push({ path: '/login' })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 120px;
    top: 0;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .user-name {
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>

