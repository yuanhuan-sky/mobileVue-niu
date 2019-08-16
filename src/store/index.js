import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化的时候，直接从本地存储中，获取登录状态
    user: getUser(),
    // 控制replylist显示隐藏
    showReplyList: false,
    // 当前点击回复按钮的评论对象
    currentComment: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      // 存储到本地存储中
      setUser(user)
    },
    setShowReplyList (state, value) {
      state.showReplyList = value
    },
    setCurrentComment (state, value) {
      state.currentComment = value
    }
  },
  actions: {

  }
})
