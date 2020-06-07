<template>
  <div id="app">
    <MHander></MHander>
    <Tab></Tab>
    <!--路由出口-->
    <!--路由匹配到的组件将渲染在这里-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <UserCenter></UserCenter> -->
    <play></play>
  </div>
</template>

<script>
  import MHander from "common/common/m_hander/m_hander"
  import Tab from 'common/common/tab/tab.vue'
  // import UserCenter from 'common/common/user-center/user-center'
  import UserCenter from 'common/common/music-list/music-list'
  import play from 'common/common/play/play'
  export default {
    components: {
      MHander,
      Tab,
      UserCenter,
      play
    }
  }
</script>

<style scoped>
</style>
