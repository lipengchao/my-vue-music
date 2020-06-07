//方法 事件回调函数
//定义修改的操作
import * as types from './mutation-types'

let mutations = {
 [types.SET_SINGER](state, payload) {
    // console.log(payload)
    state.singer=payload
  },
  //播放与暂停
  [types.SET_PLAYING_STATE](state,flag){
    state.playing=flag
  },
  //全屏或小屏
  [types.SET_FULL_SCREEN](state,flag){
    console.log(flag)
    state.fullScreen=flag
  },
  //播放样式列表
  [types.SET_pLAYLIST](state,list){
    console.log(list)
    state.playList=list
  },
  //随机播放、顺序播放、单曲循环
  [types.SET_SEQUENCE_LIST](state,list){
    console.log(list)
    state.sequenceList=list
  },
  //播放
  [types.SET_PLAY_MODE](state,mode){
    state.mode=mode
  },
  //下标
  [types.SET_CURRENT_INDEX](state,index){
    state.currentIndex=index
    // console.log(state)
  }
}
export default mutations
