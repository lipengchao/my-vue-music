import jsonp from 'style/js/jsonp.js';
import { commonParams, options } from './config';
import axios from 'axios'

//轮播图
export function getRecommend() {
  //url 路径
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}


//解决跨域问题
//歌曲列表
export function getDisList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url,{
    params:data
  }).then(res=>{
    return Promise.resolve(res.data)
  })
} 