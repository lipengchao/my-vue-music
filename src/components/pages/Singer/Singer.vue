<template>
  <div class="singer">
    <ListView @hehe="clickHand" :data="singerList"></ListView>
    <router-view></router-view>
  </div>
</template>
<script>
import { getsingerList } from "api/singer";
import { ERR_OK } from "api/config";
import { hasClass } from "style/js/Image.js";
import ListView from "common/base/listview/listview";
import {mapMutations} from 'vuex'
let HOT_NAME = "热门";
let HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singerList: [],
      list: []
    };
  },
  created() {
    this._getsingerList();
  },
  methods: {
    ...mapMutations({
      Singer :'SET_SINGER'
    }),
    clickHand(item) {
      console.log(item)
      this.$router.push({
        path: `/music-list/${item.id}`
      });
      // console.log(item)
      this.Singer(item)
      return
    },
    //获取接口数据
    _getsingerList() {
      getsingerList().then(res => {
        // console.log(res)
        if (res.code === ERR_OK) {
          this.singerList = this._nrmalizeSinger(res.data.list);
        }
      });
    },
    //处理歌手数据  热门数据 聚合数据
    _nrmalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      };
      //遍历对象
      list.forEach((item, index) => {
        //判断下标给定义的值是否小于10，如果小于的化就进行接收，否则跳出
        if (index <= HOT_SINGER_LEN) {
          //获取热门数据
          map.hot.item.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            img: hasClass(item.Fsinger_mid)
          });
        }

        let key = item.Findex;
        //判断map[key]为不存在的时候，否则跳出 聚合
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          };
        }
        //判断map[key]进行接收  id  name  img
        map[key].item.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          img: hasClass(item.Fsinger_mid)
        });
      });
      //为了得到有序列表，我们需要处理map
      let hot = []; //热门
      let ret = [];
      //遍历map数组
      for (let i in map) {
        let val = map[i];
        //正则判断是否title是为字母
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      //进行排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  },
  components: {
    ListView
  }
};
</script>
<style lang="stylus">
@import '~style/style/index0.styl';

.singer {
  position: fixed;
  top: w(88);
  bottom: 0;
  width: 100%;
}

.list {
  // height :h(454)
  width: w(18);
  background: $bg_list;
  bug(yellow);
  padding-top: p_t(20);
  padding-bottom: p_b(20);
  position: absolute;
  // bottom:-50%
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  right: 0;
  text-align: center;
  border-radius: 10px;

  .ol {
    list-style: none;

    .item {
      color: $color_tab;
      font-size: $font-size-small;
      padding: p_t(3);
      text-align: center;
    }

    .active {
      color: $color-size;
    }
  }
}
</style>
