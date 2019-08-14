export default {
  install (Vue, options) {
    Vue.prototype.$checkLogin = function () {
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
          name: 'login'
        })
      }).catch(() => {
        // on cancel 点击了取消按钮
      });

      return false
    }
  }
}