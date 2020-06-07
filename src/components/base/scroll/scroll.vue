<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.iniyScroll();
    });
  },
  methods: {
    iniyScroll() {
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      // 判断listenScroll是否为真，如果为重就进行监听,否则跳出
      if(this.listenScroll){
        let me = this
        //监听pos
        this.scroll.on('scroll',(pos)=>{
          me.$emit("scroll",pos)
        })
      }
    }, 
    //启动
    enable() {
      this.scroll && this.scroll.enable();
    },
    //禁止
    disable() {
      this.scroll && this.scroll.disable();
    },
    //重新计算 
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //滚动到指定的位置
    scrollTo(){
      this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    //滚动到指定的目标元素
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
  },

  watch: {
    data() {
      this.$nextTick(() => {
        this.refresh();
      });
    }
  }
};

</script>
<style>
</style>