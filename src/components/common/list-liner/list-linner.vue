<template>
  <!--tab-->
  <div class="list-inner">
    <ul>
      <li class="item">
        <h2 class="name">歌舞：你好2020 (Live)</h2>
        <p class="desc">朱一龙/周冬雨/李沁/李现/马思纯·2020年中央电视台春节联欢晚会</p>
      </li>
      <li class="item">
        <h2 class="name">歌舞：你好2020 (Live)</h2>
        <p class="desc">朱一龙/周冬雨/李沁/李现/马思纯·2020年中央电视台春节联欢晚会</p>
      </li>
      <li class="item">
        <h2 class="name">歌舞：你好2020 (Live)</h2>
        <p class="desc">朱一龙/周冬雨/李沁/李现/马思纯·2020年中央电视台春节联欢晚会</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "list-linner"
  }
</script>

<style lang="stylus" scoped>
  @import "~style/style/index0.styl" ；
  .list-inner
    bug(#000)
    padding 20px 30px
    display flex
    ul
      list-style none
      .item
        width w(315.2)
        height h(64)
        .name
          margin-top m_t(12)
          height h(20)
          color $color_name
          font-size $font-size-medium
          line-height h(20)
        .desc
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          margin-top h(4)
          no-wrap()
          font-size $font-size-medium
          color $bg_btn
    .no-result-wrapper
        height h(133.6)
        bug(blue)
        /*.no-result
          .no-result-icon*/

</style>
