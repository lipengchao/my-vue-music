//存储数据  状态

import {playMode} from 'style/js/config'
let state ={
  singer:{},
  playing:false,//播放与暂停
  fullScreen:false,//全屏或小屏
  playList:[],//播放单
  sequenceList:[],//播放样式
  mode:playMode.sequence,//播放模式
  currentIndex:-1
}
export default state
