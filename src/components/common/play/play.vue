<template>
  <div class="player" v-show="playList.length>0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="leaveEnter"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <!-- 背景层 -->
          <img width="100%" height="100%" :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <!-- 头部 -->
          <h1 class="titled" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" ref="imageWrapper">
                <img ref="image" :class="cdCls" class="image" :src="currentSong.image" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>
          <div class="lyric-wrapper">
            <div>
              <p ref="lyricLine" class="text"></p>
            </div>
            <div class="pure-music">
              <p></p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <!-- <div class="dot-wrapper">
            <span class="dot" ></span>
            <span class="dot"></span>
          </div> -->
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar ref="progressBar" :percent='percent' @percentChange='onProgressBarChange'></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <!-- 播放模式 -->
            <div class="icon i-left" :class="disableCls" @click="changeModel">
            <!-- <div class="icon i-left" :class="disableCls"> -->
              <i :class="iconModel"></i>
            </div>
            <!-- 后退 -->
            <div class="icon i-left" @click="prev" :class="disableCls">
              <i class="icon-prev"></i>
            </div>
            <!-- 暂停与播放 -->
            <div class="icon i-center" :class="disableCls">
              <!-- 暂停与播放 -->
              <i @click="taggeplay" :class="playIcon"></i>
            </div>
            <!-- 前进 -->
            <div class="icon i-right" @click="next" :class="disableCls">
              <i class="icon-next"></i>
            </div>
            <!-- 收藏 -->
            <div class="icon i-right" :class="disableCls">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 尾部 -->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <!-- 图片动画 -->
          <div class="imgWrapper" ref="miniWrapper">
            <img ref="miniImage" width="40" height="40" :class="cdCls" :src="currentSong.image" />
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius='radius' :percent='percent'>
            <!-- click.stop阻止冒泡事件 -->
            <i class="icon-mini" :class="this.playing ? 'icon-pause-mini' : 'icon-play-mini'" @click.stop="taggeplay"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>

    <!-- <playlist ref="playlist"></playlist> -->
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "style/js/dom";
import progressBar from 'common/base/progress-bar/progress-bar'
import ProgressCircle from 'common/base/progress-circle/progress-circle'
import {playMode} from 'style/js/config.js'
import {shuffle} from 'style/js/util.js'
// import { getSongUrl } from "api/songs";
// import { ERR_OK } from "api/config";

let transform = prefixStyle("tarbsform");
export default {
  components:{progressBar,ProgressCircle},
  data() {
    return {
      songReady: false,
      currentTime:0,
      radius:32
    };
  },
  computed: {
    //暂停与播放
    playIcon() {
      //判断是否暂停如果为true，就进入icon-pause 否则：icon-play
      return this.playing ? "icon-pause" : "icon-play";
    },
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    disableCls(){
      return this.songReady ? '' : 'disable'
    },
    //进行比例
    percent(){  //获取比例
      return this.currentTime / this.currentSong.duration //当前的时间 / 总的时间  返回剩余的时间
    },
    //播放模式
    iconModel(){
      if(this.mode === playMode.sequence){
        return 'icon-sequence'
      }else if(this.mode === playMode.loop){
        return 'icon-loop'
      }else{
        return 'icon-random'
      }
    },
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex",
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    //显示小屏
    back() {
      //点击小屏
      this.setFullScreen(false);
    },
    //显示全屏
    open() {
      this.setFullScreen(true);
    },
    //操作dom  实现动画效果  create-keyframe-animation 动画
    enter(el, done) {
      let { x, y, scale } = this._getPosAndScale(); //获取参数值
      // 设置动画帧数
      let animation = {
        0: {
          tarbsform: `trabslate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          tarbsform: `trabslate3d(0,0,0) scale(1.1)`
        },
        100: {
          tarbsform: `trabslate3d(0,0,0) scale(1)`
        }
      };
      //注册动画
      animations.registerAnimation({
        name: "move",
        animation, //插入自定义动画
        //参数配置
        presets: {
          durantion: 400, //持续时间
          easing: "linear" //过度效果
          // delay:500,//延迟时间
          // terations:1,//实现动画的次数
          //   delay:0,//延迟
          //   direction:'normal',//方向
          //   resetWhenDone:false,//if true 将最后动画状态应用为 ‘变换’属性
          //     clearTransformsBeforeStart:false//是否在动画开始之前清楚现有的转换
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    //回调函数
    afterEnter() {
      animations.unregisterAnimation(); //取消动画
      this.$refs.cdWrapper.style.animation = ""; //清空处理
    },
    //结束
    leave(el, done) {
      this.$refs.cdWrapper.style.transform = "all 0.4s"; //设置动画的秒数
      let { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transition", done); //监听事件
    },
    //结束回调函数
    leaveEnter() {
      this.$refs.cdWrapper.style.transition = ""; //清空处理
    },
    _getPosAndScale() {
      let targetWidth = 40; //定义宽度
      let paddingLeft = 40; //左边的距离
      let paddingTop = 80; //上面的距离
      let paddingBottom = 30; //下边的距离
      let width = window.innerWidth * 0.8; //屏幕的宽度*0.8  获取总宽度
      let scale = targetWidth / width; //获取初始的缩放比例
      let x = -(window.innerWidth / 2 - paddingLeft); // 获取x坐标值
      let y = window.innerHeight - paddingTop - width / 2 - paddingTop; //获取y轴的坐标值
      return {
        x,
        y,
        scale
      };
    },
    //暂停与播放
    taggeplay() {
      if (!this.songReady) return; //如果非songReady时候，就返回值
      this.setPlayingState(!this.playing); //获取播放的状态
    },
    //前进和后退
    next() {
      // console.log(this.currentIndex)
      if (!this.songReady) return; //如果非songReady时候，就返回值
      let index = this.currentIndex + 1; //下标进行加1
      if (index === this.playList.length) index = 0; //判断下标是否等于播放列表中长度 如果为true 就让他index = 0
      this.setCurrentIndex(index); //进行 获取下标进行传递 改变播放音乐
      if (!this.playing) this.taggeplay(); //如果playing为暂停时候，就进行调用暂停与播放
      this.songReady = false; //让他当点击的时候，让他为false
      /*
        下一曲
        点击下一曲的时候，获取下标进行跳转
        当点击下一曲进行跳转
      */
    },
    prev() {
      if (!this.songReady) return; //如果非songReady时候，就返回值
      // console.log('你好')
      let index = this.currentIndex - 1; //下标进行减1
      //判断下标是否等于-1 如果等于-1的就让他获取列表的最后歌曲-1
      if (index === -1) index = this.playList.length - 1;
      this.setCurrentIndex(index);
      if (!this.playing) this.taggeplay(); //如果playing为暂停时候，就进行调用暂停与播放
      this.songReady = false; //让他当点击的时候，让他为false
    },
    ready() {
      this.songReady = true; // 判断是否播放
    },
    error() {
      this.songReady = true; // 判断是否播放
    },
    //进度条 功能
    //当前时间
    updateTime(e){
      this.currentTime=e.target.currentTime //获取时间戳
    },
    //解析时间戳
    format(interval){
      interval = interval | 0  //向下取整
      let minute = interval / 60 | 0 //获取分钟
      // minute = minute >= 10 ?  minute : '0'+minute
      let second = interval % 60 //获取秒
      second = second >= 10 ? second : '0'+second
      return `${minute} : ${second}`
    },
    onProgressBarChange(percent){
      this.$refs.audio.currentTime = this.currentSong.duration * percent  //总时间 * 拖到的事件 获取偏移的事件
      if (!this.playing) this.taggeplay(); //如果playing为暂停时候，就进行调用暂停与播放
      // if(this.$refs.audio.currentTime  === this.currentSong.duration) this.next
    },
    //播放模式
    changeModel(){
      let mode = (this.mode + 1) % 3  //或mode进行加+1 % 3
      this.setPlayMode(mode)
      // console.log(playMode.random)
      let list = null //设置list为空
      //判断获取是否随机数，如果是的化就进入随机数据，否则就是循环播放,顺序播放
      if(mode === playMode.random){
        list = shuffle(this.sequenceList)
      }else{
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list){
      //符合条件的数组第一个元素位置
      let index = list.findIndex(item=>{
        //返回 item中的id是否与currentSong中的id是否一致]
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)//改变下标
    },
    end(){
      // this.next()
      // this.currentTime = 0
      //判断是否是顺序播放，是正正常播放
      if(this.mode === playMode.loop){
        this.loop()
      }else{
        this.next()
      }
    },
    loop(){
      this.$refs.audio.currentTime = 0 ; //可读写
      this.$refs.audio.play()
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE", //播放与暂停
      setCurrentIndex: "SET_CURRENT_INDEX", // 下标
      setPlayMode : 'SET_PLAY_MODE',//播放样式
      setPlayList : 'SET_SEQUENCE_LIST' //播放样式
    })
  },
  watch: {
    currentSong(newSong,oldSong) {
      if(newSong.id === oldSong.id ) return  //判断新的id是否等于老的id为真，返回
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    //暂停与播放
    playing(newplaying) {
      let audio = this.$refs.audio;
      // this.$nextTick(() => {
      // });
      this.$nextTick(() => {
        newplaying ? audio.play() : audio.pause();
      });
    },
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~style/style/index0.styl';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(w(20));
    }

    .top {
      position: relative;
      margin-bottom: w(25);

      .back {
        position: absolute;
        top: 0;
        left: w(6);
        z-index: 50;

        .icon-back {
          display: block;
          padding: w(9);
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .titled {
        width: 70%;
        margin: 0 auto;
        line-height: w(40);
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: w(20);
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: w(80);
      bottom: w(170);
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }

            .play {
              animation: rotate 20s linear infinite;
            }

            .pause {
              animation-play-state: paused;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: w(30) auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: w(20);
            line-height: w(20);
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: w(32);
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: w(32);
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: w(50);
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: w(8);
          height: w(8);
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: w(20);
            border-radius: w(5);
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: w(10) 0;

        .time {
          color: $color-text;
          font-size: $font-size-small-s;
          flex: 0 0 w(30);
          line-height: w(30);
          width: w(30);

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: w(30);
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 w(20);
          text-align: center;

          i {
            font-size: w(40);
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: w(60);
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 w(40);
      width: w(40);
      height: w(40);
      padding: 0 w(10) 0 w(20);

      .imgWrapper {
        height: 100%;
        width: 100%;

        img {
          border-radius: 50%;

          &.play {
            animation: rotate 10s linear infinite;
          }

          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: w(20);
      overflow: hidden;

      .name {
        margin-bottom: w(2);
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 w(30);
      width: w(30);
      padding: 0 w(10);

      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: w(30);
        color: $color-theme-d;
      }

      .icon-mini {
        font-size: w(30);
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>