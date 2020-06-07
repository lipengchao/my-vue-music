import Vue from 'vue'
import Vuex from 'Vuex'
import * as actions from './module/actions'
import * as getters from './module/getters'
import state from './module/state'
import mutations from './module/mutation'
import createLogger from 'vuex/dist/logger';//日志

Vue.use(Vuex)

//开发时候使用
let debug =process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict:debug,
  plugins:debug? [createLogger()] : []
})
