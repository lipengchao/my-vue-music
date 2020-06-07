import state from "./state";

//计算属性
//包装
export let singer = state => state.singer
//播放与暂停
export let playing = state => state.playing
//全屏或小屏幕
export let fullScreen =state =>state.fullScreen
//播放列表
export let playList = state => state.playList
//随机播放
export let sequenceList =state=>state.sequenceList
//获取播放状态
export let mode = state => state.mode
//获取下标
export let currentIndex =state=>state.currentIndex

//播放器中用
export let currentSong = state =>{
    // console.log(state.playList,state.currentIndex)
    //返回播放列表中的第几个下标如果为false 
    return state.playList[state.currentIndex] || {}
}

