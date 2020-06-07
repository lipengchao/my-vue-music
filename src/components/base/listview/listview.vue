<template>
  <Scroll
    :data="data"
    class="listview"
    ref="listview"
    :probeType="porotype"
    :listenScroll="listenScroll"
    @scroll="scroll"
  >
    <ol>
      <li v-for="(item,index) in data" :key="index" class="list-group" :ref="item.title">
        <h2 class="list-group-title">{{item.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item1,index1) in item.item"  @click="clickHand(item1)" :key="index1">
            <img v-lazy="item1.img" alt class="avatar" />
            <span class="name">{{item1.name}}</span>
          </li>
        </ul>
      </li>
    </ol>
    <!-- 索引列表 -->
    <div
      class="list-shortcut"
      ref="shortcut"
      @touchstart="touchstartHand"
      @touchmove="touchmoveHand"
    >
      <ul>
        <li
          v-for="(item,index) in shortcutList"
          :class="item==currentIndex?'current':'item'"
          :data-index="index"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <!-- loading事件 -->
    <div class="loading-container" v-show="!data.length">
      <Loading></Loading>
    </div>
  </Scroll>
</template>
<script>
import Scroll from "common/base/scroll/scroll";
import { getData } from "style/js/dom";
import Loading from "common/base/loading/loading"
let ANCHOR_HEIGHT = 18;
let TITLE_HEIGHT = 30;
export default {
  data() {
    return {
      currentIndex: "热", //当前显示的第几个  高亮显示
      scrollY: -1,
      diff: -1
    };
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = []; //计算高度
    this.porotype = 3;
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  //map():映射 返回一个新的数组
  //forEach() 循环 不会返回一个新的数组
  //计算属性
  computed: {
    shortcutList() {
      //将data数组中的数据进行计算
      return this.data.map(item => {
        //substr(start,length) substr() 方法可在字符串中抽取从 *start* 下标开始的指定数目的字符。
        return item.title.substr(0, 1);
      });
    },
    fixedTitle() {
      //判断滚动y轴的距离小于等于0的跳出
      if (this.scrollY <= 0) return "";
      let startIndex = this.shortcutList.indexOf(this.currentIndex); //获取下标
      return this.data[startIndex] ? this.data[startIndex].title : "";
    }
  },
  methods: {
    clickHand(item){//Fsinger_mid
      // console.log(item)
      this.$emit("hehe",item)
    },
    //按下事件
    touchstartHand(e) {
      let height = this.$refs.shortcut.offsetTop - 108; //获取高度
      let y = e.touches[0].pageY + height; //计算y轴+高度
      this.touch.startY = y; //记录下标值
      //点击的字母在数组里的下标
      let startIndex = this.shortcutList.indexOf(e.target.innerText); //获取下标
      this.touch.startIndex = parseInt(y / ANCHOR_HEIGHT); //获取按下的下标
      let target = e.target.innerText === "热" ? "热门" : e.target.innerText; //判断是否热门，如果是热门就显示热门，否则就显示innerText
      this._scrollTo(target);
    },
    //移动事件
    touchmoveHand(e) {
      let { startY } = this.touch; //获取起始位置
      // console.log()
      let moveY = e.touches[0].pageY - 180; //记录移动位置的值
      let distance = moveY - startY; //获取移动距离 移动距离-起始位置
      let moveNum = parseInt(distance / ANCHOR_HEIGHT); //获取移动距离-容器的噶偶  在进行取整
      let index = this.touch.startIndex + moveNum; //从头开始移动的总格子数 按下格子数+移动格子数
      //判断边界  当总格数小于等于0 时或 总格数大于shortcutList.length就让返回
      if (index <= 0 || index > this.shortcutList.length) return;
      //获取移动的格子的字母
      //用三目表达式  判断是否等于热 等于热门 否则额this.shortcutList[index-1]
      let target =
        this.shortcutList[index - 1] === "热"
          ? "热门"
          : this.shortcutList[index - 1];
      this._scrollTo(target);
    },
    _scrollTo(item) {
      if (this.$refs[item] !== undefined) {
        this.currentIndex = item === "热门" ? "热" : item; //显示高亮显示
        let el = this.$refs[item][0];
        this.$refs.listview.scrollToElement(el, 0);
      }
    },
    //滚动事件
    scroll(pos) {
      let arr = this.getHeight(); //获取移动的高度和top值
      this.scrollY = Math.abs(pos.y); //计算绝对值坐标
      //循环arr里数组尺寸
      for (let i = 0; i < arr.length; i++) {
        //判断是否满足尺寸
        // console.log(arr[i + 1]);
        if (this.scrollY >= arr[i]) {
          this.currentIndex = this.shortcutList[i]; //将数据进行接收
          this.diff = arr[i + 1] - this.scrollY; //数组中的增加项-滚动的距离
        }
      }
      return arr;
    },
    //获取滚动栏的尺寸数据
    getHeight() {
      this.listHeight = [];
      let list = this.$refs; //获取标签对象
      for (let i in list) {
        //遍历对象
        //判断i不等于listview或i不等于shortcut
        if (i !== "listview" && i !== "shortcut" && i !== "fixed") {
          let item = list[i][0].offsetTop; //获取top的值
          this.listHeight.push(item); //接收top值
        }
      }
      return this.listHeight;
    }
  },
  watch: {
    //算法距离  固定标题
    diff(newVal) {
      //判断newVal是否大于0 或newVal的值是否小于top的值 如何是进行相减少 否则为0 
      let fixedTop = (newVal>0&& newVal<TITLE_HEIGHT)?newVal - TITLE_HEIGHT:0;
      //判断是否为假，如果存在就跳出
      if(this.fixedTop===fixedTop) return
      this.fixedTop=fixedTop//将获取的距离进行赋值
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },
  components: {
    Scroll,Loading
  }
};
</script>
<style lang="stylus">
@import '~style/style/index0.styl';

* {
  touch-action: pan-y;
}

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: w(30);

    .list-group-title {
      height: w(30);
      line-height: w(30);
      padding-left: w(20);
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: w(20) 0 0 w(30);

      .avatar {
        width: w(50);
        height: w(50);
        border-radius: 50%;
      }

      .name {
        margin-left: w(20);
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: w(20);
    padding: w(20) 0;
    border-radius: w(10);
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
    }

    .current {
      padding: 3px;
      line-height: 1;
      font-size: $font-size-small;
      color: $color-theme;
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: w(30);
      line-height: w(30);
      padding-left: w(30 -10);
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>