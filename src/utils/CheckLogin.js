export default {
  install (Vue, options) {
    Vue.prototype.$checkLogin = function () {
      // console.log(this.$router)
      // console.log(this.$route)
      // 有登录状态
      if (this.$store.state.user) {
        return true
      }
      // 没有登录
      this.$dialog.confirm({
        title: '登录提示',
        message: '该操作需要登录，确认登录么'
      }).then(() => {
        // on confirm 点击了确认按钮
        this.$router.push({
          name: 'login',
          // 设置redirect，记录当前从哪里跳转到登录页面的
          query: {
            redirect: this.$route.fullPath
          }
        })
      }).catch(() => {
        // on cancel 点击了取消按钮
      });

      return false
    }
  }
}