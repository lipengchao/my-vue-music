<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgstyle" ref="bgImage">
      <div class="play-wrappe" v-show="song.length>0" ref="playWarapper"  @click="random">
        <div class="player">
          <i class="icon-play"></i>
          <span class="textt">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      @scroll="scroll"
      :data="song"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      class="lists"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="song"></song-list>
      </div>
      <div class="loading-container" v-show="!song.length">
        <Loading></Loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "common/base/scroll/scroll";
import SongList from "common/base/song-list/song-list";
import { prefixStyle } from "style/js/dom.js";
import Loading from "common/base/loading/loading.vue";
import { mapActions } from "vuex";
let RESERVED_HEIGHT = 40; //top为40px
let transform = prefixStyle("transform");
let background = prefixStyle("background-filte");
export default {
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    song: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scrollY: 0,
      play: true
    };
  },
  computed: {
    bgstyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  },
  methods: {
    //滚动的方法
    scroll(pos) {
      this.scrollY = pos.y; //获取scrolly 的 偏移量
    },
    back() {
      this.$router.back(); //返回
    },
    selectItem(item, index) {
      this.selectPlay({
        list:this.song,
        index:index
      })
    },
    random(){
      this.randomPlay({
        list:this.song
      })
    },
    ...mapActions(['selectPlay','randomPlay'])
  },
  watch: {
    //监听滚动y轴  跟随滚动
    scrollY(newy) {
      //bg-layer 跟着滚动
      let translateY = Math.max(this.minTrabslateY, newy); //获取最大的距离
      let zIndex = 0; //定义下标
      let state = 1;
      let blue = 0;
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;

      //下拉放大效果
      let percent = Math.abs(newy / this.imgHeight); //获取绝对值 当监听y的值 / 图片的高度、
      if (newy > 0) {
        //下拉大于0时，进入条件体
        //将1+ 获取的绝对值 进行赋值给state
        state = 1 + percent;
        zIndex = 10; //将下标设置为十
      } else {
        blue = Math.min(20 * percent, 20); //获取最小值
      }
      this.$refs.filter[background] = `blur(${blue}px)`;

      //将state中数据进行添加
      this.$refs.bgImage.style[transform] = `scale(${state})`;

      if (newy < this.minTrabslateY) {
        //判断newY的距离大于获取的距离，如果大于就行top为0，高度为40px，否则反之
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = RESERVED_HEIGHT + "px";
        this.$refs.playWarapper.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "70%";
        this.$refs.bgImage.style.height = 0;
        this.$refs.playWarapper.style.display = "";
      }
      this.$refs.bgImage.style.zIndex = zIndex; //将回去的index的传递
    }
  },
  created() {
    //监听scroll位置
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imgHeight = this.$refs.bgImage.clientHeight; //获取图片的高度
    this.minTrabslateY = -this.imgHeight + RESERVED_HEIGHT; //获取最的距离
    this.$refs.list.$el.style.top = `${this.imgHeight}px`;
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~style/style/index0.styl';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: w(6);
    z-index: 50;

    .icon-back {
      display: block;
      padding: w(10);
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrappe {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .player {
        box-sizing: border-box;
        width: w(135);
        padding: w(7) 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: w(100);
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: w(6);
          font-size: $font-size-medium-x;
        }

        .textt {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .lists {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    // overflow hidden
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
