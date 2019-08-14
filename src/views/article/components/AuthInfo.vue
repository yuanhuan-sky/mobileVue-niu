<template>
  <div class="auth-info" v-if="article">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{ article.aut_name }}</p>
        <p>{{ article.pubdate | fmtDate }}</p>
      </div>
    </div>
    <div>
      <van-button
        @click="handleFollow"
        :type="article.is_followed ? 'default' : 'danger'"
        :loading="false"
      >{{ article.is_followed ? '已' : '' }}关注</van-button>
    </div>
  </div>
</template>

<script>
import { unFollowUser, followUser } from '@/api/user'
export default {
  name: 'AuthInfo',
  props: ['article'],
  methods: {
    // 点击关注按钮
    async handleFollow () {
      // 判断是否登录，提示

      try {
        if (this.article.is_followed) {
          // 如果当前是已关注，调用unFollowUser
          await unFollowUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // followUser
          await followUser(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
