<template>
  <div class="recommend">
    <Scroll ref="scoll" :data="disList" class="recommen">
      <div>
        <!--判断list数组中的长度-->
        <div class="banner" v-if="list.length">
          <Slider>
            <div v-for="(item,index) in list" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt />
              </a>
            </div>
          </Slider>
        </div>
        <h1>热门推荐</h1>
        <ul class="rec">
          <li class="red" v-for="(item,index) in disList" :key="index">
            <div class="item">
              <img v-lazy="item.imgurl" alt />
            </div>
            <div class="text">
              <h2>{{item.creator.name}}</h2>
              <p class="desc">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!disList.length">
        <Loading></Loading>
      </div>
    </Scroll>
  </div>
</template>
<script>
import Slider from "common/base/slider/slider"; //封装的轮播图
import { getRecommend, getDisList } from "api/Recommend";
import { ERR_OK } from "api/config";
import Scroll from "common/base/scroll/scroll"; //封装好的scroll
import Loading from "common/base/loading/loading";
export default {
  data() {
    return {
      list: [],
      disList: []
    };
  },
  created() {
    setTimeout(() => {
      this.getBanner();
    }, 3000);

    setTimeout(() => {
      this._getDisList();
    }, 5000);
  },
  methods: {
    //轮播图
    getBanner() {
      getRecommend().then(res => {
        // console.log(res)
        if (res.code === ERR_OK) {
          this.list = res.data.slider;
          // console.log(this.list);
        }
      });
    },
    //歌单列表
    _getDisList() {
      getDisList().then(res => {
        if (res.code === ERR_OK) {
          this.disList = res.data.list;
          // console.log(this.disList);
        }
      });
    },
    loadImage() {
      //showIndex是否为假，如果为假就进行重新计算，并给showIndex为真
      if (!this.showIndex) {
        this.$refs.scoll.refresh();
        this.showIndex = true;
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>
<style lang="stylus" scoped>
@import '~style/style/index0.styl';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommen {
    height: 100%;
    overflow: hidden;
  }

  .banner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  /* img
  width: 100%
  height: 100% */
  h1 {
    font-size: $font-size-l;
    text-align: center;
    height: h(65);
    line-height: l_h(65);
    color: $color-size;
  }

  .rec {
    list-style: none;
    width: w(375.2);
    height: 100%;

    // bug(red);
    .red {
      padding-right: p_r(20);
      padding-left: p_l(20);
      padding-bottom: p_b(20);
      display: flex;

      .item {
        width: w(60);
        height: h(60);
        padding-right: p_r(20);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .text {
      height: h(20);
      font-size: $font-size-medium;

      h2 {
        color: $color_name;
        margin-bottom: m_b(15);
        // line-height:20px
        margin-top: m_t(10);
      }

      .desc {
        color: $color_desc;
      }
    }
  }
}

.loading-container {
  position: absolute;
  width: 100%;
  height: 50%;
  transform: translateY(50%);
}
</style>
