<template>
<!-- 全屏的进度条 -->
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTochEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from "style/js/dom";
let progressBtnWidth = 16; //按钮的宽度
let transform = prefixStyle("transform");
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    //进度条事件
    progressTouchStart(e) {
      console.log(e);
      this.touch.initiated = true; //初始化
      this.touch.startX = e.touches[0].pageX; //记录x轴的坐标
      this.touch.left = this.$refs.progress.clientWidth; //记录偏移的宽度
      // console.log(this.touch.left);
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) return; //如果没有初始化的化，就进行返回
      let deltaX = e.touches[0].pageX - this.touch.startX; // 获取移动的x轴的距离 - 记录下的x轴距离  获取偏移的宽度
      let clientWidth = Math.max(0, this.touch.left + deltaX); // 获取最大值不能为0，记录偏移的宽度 + 获取偏移的宽度
      let offset = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        clientWidth
      ); //获取最小值 获取宽度 减去 按钮的16，获取最大值
      this._offset(offset);
    },
    progressTochEnd() {
      this.touch.initiated = false;
      this._triggerPercent(); //派发事件
    },
    _triggerPercent() {
      let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth; //获取宽度 减去 按钮的16
      let percent = this.$refs.progress.clientWidth / barWidth; //偏移的宽度 / 条形宽度
      this.$emit("percentChange", percent); // 派发事件
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        "transform"
      ] = `translate3d(${offsetWidth}px,0,0)`;
    },
    //点击事件
    progressClick(e){
      //Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
      let  rect = this.$refs.progressBar.getBoundingClientRect()
      let offsetWidth = e.pageX - rect.left ; //x轴坐标 减 元素距离左边的距离
      this._offset(offsetWidth)
      //这里当我们点击progressBtn 的时候，e.offsetX获取不对
      // this._offset(e.offsetX)
      this._triggerPercent(); //派发事件
    }
  },
  watch: {
    percent(newPercent) {
      // console.log(newPercent)]
      //判断 newpercent大于等于0 或 this.touch.initiated为非时，进行条件体
      if (newPercent >= 0 && !this.touch.initiated) {
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth; //获取宽度 减去 按钮的16
        let offsetWidth = newPercent * barWidth; // 获取的比例 * 获取宽度  获取偏移的宽度
        this._offset(offsetWidth);
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~style/style/index0.styl';

.progress-bar {
  height: w(30);

  .bar-inner {
    position: relative;
    top: w(13);
    height: w(4);
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -w(8);
      top: -w(13);
      width: w(30);
      height: w(30);

      .progress-btn {
        position: relative;
        top: w(-6);
        /* left: w(-7) */
        box-sizing: border-box;
        width: w(16);
        height: w(16);
        border: w(3) solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>