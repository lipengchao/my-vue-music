<template>
    <div class="rank">
        <ul class="ul">
            <li class="li">
                <div class="img">
                    <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004Jug0i3bt4ye.jpg" alt="">
                </div>
                <ol class="songlist">
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                </ol>
            </li>
             <li  class="li">
                <div class="img">
                    <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004Jug0i3bt4ye.jpg" alt="">
                </div>
                <ol class="songlist">
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                </ol>
            </li>
             <li  class="li">
                <div class="img">
                    <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004Jug0i3bt4ye.jpg" alt="">
                </div>
                <ol class="songlist">
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                </ol>
            </li> 
            <li  class="li">
                <div class="img">
                    <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004Jug0i3bt4ye.jpg" alt="">
                </div>
                <ol class="songlist">
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                </ol>
            </li>
             <li class="li">
                <div class="img">
                    <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004Jug0i3bt4ye.jpg" alt="">
                </div>
                <ol class="songlist">
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                </ol>
            </li>
             <li class="li">
                <div class="img">
                    <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004Jug0i3bt4ye.jpg" alt="">
                </div>
                <ol class="songlist">
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                    <li class="song">
                        <span>1、</span>
                        <span>火苗-苏晗</span>
                    </li>
                </ol>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{

    }
</script>
<style lang="stylus">
@import '~style/style/index0.styl';
.rank
    bug(red)
    pointer-events: auto;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 0ms;
    transform: translate(0px, 0px) scale(1) translateZ(0px);
    .ul
        list-style :none
        .li
            width :w(335.2)
            // height :h(120)
            margin-left:m_l(20)
            margin-right :m_r(20)
            padding-top:p_t(20) 
            display :flex
            bug(blue)
            .img
                width :w(100)
                height:h(100)
                img     
                    width :100%
                    height :100%
            .songlist
                bug(yelow)
                width :w(235.2)
                align-items center
                padding-right :p_r(20px)
                padding-left:p_l(20)
                background :$bg_title
                flex-direction: column;
                justify-content: center;
                padding-top m_t(10)
                .song
                    width :w(195.2)
                    height :h(25.6)
                    list-style :none
                    line-height :l_h(26)
                    font-size:$font-size-small
                    color :$color_desc
                    margin-right :0
                    padding-top:0 
</style>