<template>
  <div class="tab">
    <!--tag 更改标签  active-class 路由的动态移入移出-->
    <!--使用router-link组件来导航-->
    <!--通过传入‘to’属性指定链接-->
    <!--<router-link> 默认会被渲染成一个‘<a>标签’ 如果改变的标签的需要用tag改变标签-->
    <router-link
      tag="div"
      v-for="(item,index) in list"
      :key="index"
      :to="item.path"
      active-class="selected"
      class="tab-item"
    >
      <span class="item">{{item.text}}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { path: "/recommend", text: "推荐" },
        { path: "/music-list", text: "歌手" },
        { path: "/rank", text: "排行" },
        { path: "/seach", text: "搜索" },
      ]
    };
  }
};
</script>
<style lang="stylus">
@import '~style/style/index0.styl';

.tab 
//   bug(red)
  display: flex
  width:w(375)
  height:h(44)
  .tab-item
    font-size:$font-size-medium 
    color :$color_tab
    flex:1
    text-align:center
    line-height:l_h(44)
    // bug(yellow)
    .item
        padding-bottom:p_b(5)
    &.selected
      .item
        color:$color-size
        border-bottom:2px solid $color-size
</style>
