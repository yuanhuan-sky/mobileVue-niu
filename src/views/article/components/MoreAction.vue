<template>
  <div class="more-action">
    <van-button
      @click="handleLike"
      :icon="isLike ? 'star' : 'star-o'"
      round
      :loading="likeLoading"
      type="default"
    >{{ isLike ? '取消' : '' }}点赞</van-button>

    <van-button
      @click="handleUnlike"
      :icon="unLike ? 'clear' : 'close'"
      round
      :loading="unlikeLoading"
      type="default"
    >{{ unLike ? '取消' : '' }}不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, disLikeArticle, unDislikeArticle, unLikeArticle } from '@/api/article'

export default {
  name: 'MoreAction',
  props: ['article'],
  computed: {
    isLike () {
      // 是否点赞
      return this.article.attitude === 1
    },
    unLike () {
      // 不喜欢
     return this.article.attitude === 0
    }
  },
  data () {
    return {
      // 加载提示
      likeLoading: false,
      unlikeLoading: false
    }
  },
  methods: {
    // 处理点赞
    async handleLike () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      this.likeLoading = true
      try {
        // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
        // 判断当前是否已点赞
        if (this.isLike) {
          // 取消点赞
          await unLikeArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          // 点赞
          await likeArticle(this.article.art_id)
          this.article.attitude = 1
        }

      } catch (err) {
        this.$toast.fail('操作失败'+err)
      }
      this.likeLoading = false
    },
    // 处理不喜欢
    async handleUnlike () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }

      this.unlikeLoading = true
      try {
        // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
        // 判断当前是否是不喜欢
        if (this.unLike) {
          // 取消不喜欢
          await unDislikeArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          // 不喜欢
          await disLikeArticle(this.article.art_id)
          this.article.attitude = 0
        }

      } catch (err) {
        this.$toast.fail('操作失败'+err)
      }
      this.unlikeLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
