<template>
  <!--封装轮播图-->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex===index }"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from "../../../commin/js/dom";

 export default {
    name: 'slider',
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      //是否可以轮播
      loop: {
        type: Boolean,
        default: true
      },
      //自动轮播
      autoplay: {
        type: Boolean,
        default: true
      },
      //轮播的间隔
      interval: {
        type: Number,
        default: 1000
      }
    },
    mounted() {
     this.$nextTick(()=>{
       this._setSliderWidth()//设置滑块宽度
       this._initDots()//初始化dot
       this._initSlilder()//初始化文件
       //判断autoplay是否为true，如果为true调用该方法
       if (this.autoplay){
         this._play()
       }
     })
      window.addEventListener('resize',()=>{
        //判断this.slider是否为false,我们就return出去
        if (!this.slider) return
        //执行滑块的宽度
        this._setSliderWidth(true)
        //重新计算
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        //获取sliderGroup的所有子元素
        this.children = this.$refs.sliderGroup.children
        //设置宽度为0
        let width = 0
        //获取slider总的宽度
        let slideWidth = this.$refs.slider.clientWidth
        //循环所有的子元素
        for (let i = 0; i < this.children.length; i++) {
          //获取每一个子元素
          let child = this.children[i]
          addClass(child, 'slider-item')
          //获取去总元素的宽度
          child.style.width = slideWidth + 'px'
          //累加 宽度+总的宽度
          width += slideWidth
        }
        //判断loop为真时候或isResize为假的时候，就进行增加
        if (this.loop && !isResize) {
          //总的宽度*2
          width += 2 * slideWidth
        }
        //给sliderGroup设置样式宽度 获取宽度
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlilder() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,//横向坐标
          scrollY: false,//纵向坐标
          momentum: false,//滚动的动画
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 1000
        })
        this.slider.on("scrollEnd", () => {
          //当前第几个子元素
          let pageIndex = this.slider.getCurrentPage().pageX
          //判断loop是否为true，如果为true就进行下标-1
          if (this.loop) pageIndex  -= 1
          //将获取下标
          this.currentPageIndex=pageIndex
          //判断是否自动轮播
          if (this.autoplay) {
            //停止定时器
            clearTimeout(this.timer)
            //启动自动轮播
            this._play()
          }
        })
      },
      _initDots() {
        //接收数组 chidren的所有子元素的长度
        this.dots = new Array(this.children.length)
        // console.log(this.dots)
      },
      _play(){
        //将下标进行加1
        let index= this.currentPageIndex+1
        //判断loop是否为true，如果为true则进行index进行相加
        if (this.loop) index+=1
        // 启动定时器
        this.timer=setTimeout(()=>{
          this.slider.goToPage(index,0,1000)
        },this.interval)
      }
    },
   destroyed(){
      //清掉定时器
      clearTimeout(this.timer)
   }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/style/index0.styl';

  .slider
    min-height: w(1)
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: w(0)
      left: w(0)
      bottom: w(12)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 w(4)
        width: w(8)
        height: w(8)
        border-radius: 50%
        background: $color_tab
        &.active
          width: w(20)
          border-radius: w(5)
          background: $bg_active
</style>
