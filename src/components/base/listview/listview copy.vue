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
      <li v-for="(item,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{item.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item1,index1) in item.item" :key="index1">
            <img v-lazy="item1.img" alt class="avatar" />
            <span class="name">{{item1.name}}</span>
          </li>
        </ul>
      </li>
    </ol>
    <!-- 索引列表 -->
    <div class="list-shortcut" @touchstart="touchstartHand" @touchmove.stop.prevent="touchMoveHand">
      <ul>
        <li
          class="item"
          :class="{'current':currentIndex===index}"
          v-for="(item,index) in shortcutList"
          :data-index="index"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
  </Scroll>
</template>
<script>
import Scroll from "common/base/scroll/scroll";
import { getData } from "style/js/dom";
let ANCHOR_HEIGHT = 18;
export default {
  data() {
    return {
      currentIndex: 0, //当前显示的第几个  高亮显示
      scrollY: -1
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
  computed: {
    shortcutList() {
      //将data数组中的数据进行计算
      return this.data.map(item => {
        //substr(start,length) substr() 方法可在字符串中抽取从 *start* 下标开始的指定数目的字符。
        return item.title.substr(0, 1);
      });
    }
  },
  components: {
    Scroll
  },
  methods: {
    //按下事件
    touchstartHand(e) {
      //获取下标
      let anchorIndex = getData(e.target, "index");
      this.touch.y = e.touches[0].pageY; //获取y轴的坐标 按下的距离
      this.touch.anchorIndex = anchorIndex; //记录第几个索引
      this._scrollTo(anchorIndex)
    },
    //滚动的位置
    touchMoveHand(e) {
      this.touch.yy = e.touches[0].pageY; //获取y轴的坐标  获取移动的距离
      let dalta = ((this.touch.yy - this.touch.y) / ANCHOR_HEIGHT) | 0; //计算 获取移动的距离  parseInt((移动的距离 - 按下的距离)/ 元素的高度 （字体高度和padding)  = 总距离
      let anchorIndex = parseInt(this.touch.anchorIndex) + dalta; //获取移动的第几个索引  取整（获取索引） + 获取移动距离
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      //判断index为0时与index不等于0时就ruturn出去
      if(!index && index!==0){
        return
      }
      //处理边界
      if(index<0){
        index=0
      }else if(index>this.listHeight.length-2){
        index=this.listHeight.length-2
      }
      this.scrollY = -this.listHeight[index];
      //见获取指定的目标元素，0
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    //监听scroll事件
    scroll(pos) {
      this.scrollY = pos.y;
    },
    _calculateHeight() {
      this.listHeight = []; //定义个空数组
      let list = this.$refs.listGroup; //获取listGroup元素
      let height = 0; //将高度先设置为0
      this.listHeight.push(height); //接收高度
      //循环list对象中元素
      for (let i = 0; i < list.length; i++) {
        let item = list[i]; //将对象中的每一项进行循环传递item
        height += item.clientHeight; //获取的高度 计算 高度+元素的高度
        this.listHeight.push(height); //接收高度
      }
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._calculateHeight();
      });
    },
    scrollY(newY) {
      let height = this.listHeight; //获取高度中的值\
      //当滚动到顶部，newy>0
      if (newY > 0) return (this.currentIndex = 0);
      //在中间部分滚动
      for (let i = 0; i < height.length - 1; i++) {
        let height1 = height[i]; //将高度中i项传递
        let height2 = height[i + 1]; //将高度中i+1项进行传递
        //判断height2为非时 或 newY大于等于height1 与 newY 小于等于 height2，就进行接收i的下标  ，否则下标为0
        if (!height2 || (-newY >= height1 && -newY <= height2)) {
          this.currentIndex = i;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = height.length - 2;
    }
  }
};
</script>
<style lang="stylus">
@import '~style/style/index0.styl';

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

      &.current {
        color: $color-theme;
      }
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