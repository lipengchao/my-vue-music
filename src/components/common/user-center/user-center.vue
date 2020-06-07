<template>
  <div class="user-center">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <div class="switches-wrapper">
        <ul class="switches">
          <li  class="switch-item">
              <span>我喜欢的</span>
          </li>
          <li  class="switch-item active">
            <span>我喜欢的</span>
          </li>
        </ul>
    </div>
    <div class="play-btn">
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="user">
      <div class="div" style="display: none">
        <list></list>
      </div>
      <div class="div" style="display: none">
        <list></list>
      </div>
      <div  class="no-result-wrapper">
        <NoResult></NoResult>
      </div>
    </div>
  </div>
</template>

<script>
  import list from 'common/common/list-liner/list-linner'
  import NoResult from 'common/common/no-result/no-result.vue'
  export default {
    name: "user-center",
    components:{
      list,NoResult
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~style/style/index0.styl';
  .user-center
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #222;
    bug(red)
    .back
      position: absolute
      top: 0
      left: to_p(6)
      width w(42)
      height h(41.6)
      .icon-back
          display block
          padding-top to_p(10)
          padding-right to_p(10)
          padding-bottom to_p(10)
          padding-left to_p(10)
          font-size $font-size-large-x
          color $color-size
    .switches-wrapper
        width w(375.2)
        height h(31.6)
        bug(blue)
        margin-bottom m_t(30)
        margin-top  m_t(10)
        .switches
          width w(240)
          height h(31.6)
          bug($bg_title)
          margin 0 auto
          display flex
          align-items center
          text-align center
          .switch-item
              width w(120)
              padding-top p_t(8)
              padding-right p_t(8)
              padding-bottom p_t(8)
              padding-left p_t(8)
              span
                color $color_desc
                font-size $font-size-medium
          .active
              background $bg_title
              span
                color $color_name
    .play-btn
        height h(32)
        width h(135)
        bug($bg_btn)
        border-radius h(50)
        margin 0 auto
        text-align center
        line-height h(32)
        color $bg_btn
      .icon-play
            display inline-block
            vertical-align middle
            margin-right m_l(6)
            font-size $font-size-medium-x
      .text
            font-size $font-size-small

    .user
        height 100%
        position relative
        .no-result-wrapper
            position absolute
            top 35%
            transform: translateY(-50%)
            width 100%
</style>
