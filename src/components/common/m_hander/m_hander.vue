<template>
  <div class="m_hander">
     <!-- 头部 -->
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <div class="mine">
      <i class="icon-mine"></i>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~style/style/index0.styl';
.m_hander 
  position: relative
  height:h(44)
  text-align: center
  // bug(red)
  .icon 
    display: inline-block
    width: w(30)
    height: h(32)
    vertical-align: top
    bg-image('logo')
    background-size: bg_size(30, 32)
    margin-top: 6px
    margin-right: 9px
  

  .text 
    vertical-align: top
    display: inline-block
    width: w(117.04)
    height: h(44)
    color: $color-size
    font-size: $font-size-large
    line-height: l_h(44)
  

  .mine 
    position: absolute
    top: to_p(0)
    right: righ_t(0)

    .icon-mine 
      display: block
      padding:add(12)
      font-size: $font-size-large-xx=20px
      color: $color-size
</style>