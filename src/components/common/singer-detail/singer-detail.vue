<template>
  <transition name="slide">
    <music-list :song="list" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer.js";
import { ERR_OK } from "./../../../api/config";
import { createSong, isValidMusic, processSongsUrl } from "style/js/song.js";
import musicList from "common/common/music-list/music-list";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.img;
    },
    ...mapGetters(["singer"])
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) return this.$router.push("/music-list");
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          //将进程进行接收
          processSongsUrl(this._normalizeSongs(res.data.list)).then(songs => {
            this.list = songs;
          });
        }
      });
    },
    _normalizeSongs(list) {
      // console.log(list)
      let ret = []; //定义空数组
      list.forEach(item => {
        let { musicData } = item;
        //判断songid或alummid存在的话就进行接收
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  created() {
    this._getSingerDetail();
  },
  components: {
    musicList
  }
};
</script>
<style lang="stylus" scoped>
@import '~style/style/index0.styl';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg;
}

.slide-enter-active, .slide-leave-active {
  transition: all 1s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
