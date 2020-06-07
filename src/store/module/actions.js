//异步操作
import * as types from './mutation-types'
import {playMode} from 'style/js/config'
import {shuffle} from 'style/js/util'

export let selectPlay=function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list)//顺序播放
    if(state.mode===playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_pLAYLIST,randomList)//播放列表
        index = findIndex(randomList, list[index])
    }else{
        commit(types.SET_pLAYLIST,list)//播放列表
    }
    commit(types.SET_CURRENT_INDEX,index) //下标
    commit(types.SET_FULL_SCREEN,true)//全屏或小屏
    commit(types.SET_PLAYING_STATE,true)//播放与暂停
}

//随机播放
export let randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE,playMode.random)//随机播放
    commit(types.SET_SEQUENCE_LIST,list)//顺序播放
    let randomList = shuffle(list)
    commit(types.SET_pLAYLIST,randomList)//播放列表
    commit(types.SET_CURRENT_INDEX,0)//下标
    commit(types.SET_FULL_SCREEN,true)//全屏或小屏
    commit(types.SET_PLAYING_STATE,true)//播放与暂停
}