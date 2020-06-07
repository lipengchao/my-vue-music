<template>
  <div class="seach">
    <div class="search_box">
      <div class="icon">
        <i class="icon-search"></i>
        <input type="text" class="input" placeholder="搜索歌曲、歌手">
        <i class="icon-dismiss"></i>
      </div>
    </div>
    <div class="hot-key">
      <div class="hot">
        <h1 class="titled">热门搜索</h1>
        <ul class="ol">
          <li class="ulI">
            <span>我们的歌</span>
          </li>
          <li  class="ulI">
            <span>我们的歌1</span>
          </li>
          <li  class="ulI">
            <span>我们的歌1</span>
          </li>
        </ul>
      </div>
      <div class="search-history">
        <h1 class="seach-title">
          <span class="text">搜索历史</span>
          <span class="clear">
              <i class="icon-clear"></i>
          </span>
        </h1>
        <div class="search-list">
          <ul class="search">
            <li class="search-item">
              <span class="text">李沁</span>
              <span class="clear">
                <i class="icon-delete"></i>
              </span>
            </li>
            <li class="search-item">
              <span class="text">李沁</span>
              <span class="clear">
                <i class="icon-delete"></i>
              </span>
            </li>
            <li class="search-item">
              <span class="text">李沁</span>
              <span class="clear">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="stylus">
  @import "~style/style/index0.styl";
  .seach
    width: w(375.2)
    // height :h(40)
    bug(blue)
    .search_box
      width: w(335.2)
      height: h(40)
      margin-top: m_t(20)
      margin-bottom: m_b(20)
      margin-left: m_l(20)
      margin-right: m_r(20)
      border-radius: 6px
      background: $bg_title
      bug(red)
      .icon
        width: 100%
        height: h(40)
        padding-left: p_l(6)
        padding-right: p_r(6)
        display: flex
        // justify-content :center
        align-items: center
        i
          font-size: $font-size-l
          color: $bg
        .input
          // flex:1
          width: w(273.2)
          color: $color_name
          font-size: $font-size-medium
          outline: 0
          height: h(17.6)
          background: $bg_title
          margin-left: m_l(5)
          margin-right: m_r(5)
          border: none
        .icon-dismiss
          font-size: $font-size-medium-x
          color: $bg
    .hot-key
      width: W(335.2)
      // height :h(168)
      margin-left: m_l(20)
      margin-right: m_r(20)
      margin-bottom: m_b(20)
      bug(green)
      .hot
        .titled
          width w(335.2)
          height h(13.6)
          color $color_tab
          font-size $font-size-medium
          margin-bottom m_b(20)
        .ol
          list-style none
          width w(335.2)
          // height h(134.4)
          // bug(yellow)
          height: 100%
          .ulI
            display: inline-block
            width w(76)
            // height h(23.6)
            background $bg_title
            margin-right m_r(20)
            margin-bottom m_b(10)
            text-align center
            line-height l_h(23.6)
            border-radius 5px
            span
              color $color_desc
              font-size $font-size-medium
      .search-history
        bug(red)
        .seach-title
          height h(40)
          display flex
          align-items center
          .text
            color $color_tab
            font-size $font-size-medium
            flex:1
        .search-list
          .search
            list-style none
            .search-item
              height h(40)
              display flex
              align-items center
              .text
                color $color_desc
                font-size $font-size-medium-x
                flex 1
              .clear
                position relative
                width w(36)
                height h(32)
                .icon-delete
                  font-size $font-size-small
                  color $color_desc
                  position absolute
                  top to_p(10)
                  bottom to_p(10)
                  right to_p(0)
                  left to_p(20)

</style>
