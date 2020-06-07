<template>
      <!--背景-->
      <div class="no-result">
        <div class="no-result-icon"></div>
        <p class="no-result-text">暂无收藏歌曲</p>
      </div>
</template>

<script>
    export default {
        name: "no-result"
    }
</script>

<style lang="stylus" scoped>
@import "~style/style/index0.styl";
  .no-result
    text-align center
    .no-result-icon
        width w(86)
        height h(90)
        bg-image('~style/image/no-result')
        background-size 100% 100%
        margin 0 auto
    .no-result-text
      color $color_desc
      font-size $font-size-medium
      margin-top h(30)
</style>
