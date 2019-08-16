<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="item in comments"
      :key="item.com_id.toString()"
      :title="item.aut_name"
    >
      <!-- 头像 -->
      <div slot="icon">
        <img class="avatar" :src="item.aut_photo" alt="">
      </div>
      <!-- 最右侧的按钮 -->
      <div>
        <van-button type="default" icon="star-o" size="mini">赞</van-button>
      </div>
      <!-- 评论内容 -->
      <div slot="label">
        <p>{{ item.content }}</p>
        <span>{{ item.pubdate | fmtDate }}</span>&nbsp;&nbsp;<span>回复 {{ item.reply_count }}</span>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'

export default {
  name: 'CommentList',
  props: ['id', 'isArticle'],
  data() {
    return {
      comments: [],
      loading: false,
      finished: false,
      // 记录每次获取到的最后一条数据的id，为了获取下一页数据
      offset: null
    };
  },

  methods: {
    async onLoad() {
      try {
        const data = await getComments({
          isArticle: this.isArticle,
          // 文章的id，获取文章的评论 （或者评论的评论）
          source: this.id,
          offset: this.offset
        })
        // 存储所有评论和最后一条数据的id
        this.comments.push(...data.results)
        this.offset = data.last_id

        this.loading = false
        // 判断数据是否全部加载完毕
        if (data.results.length === 0) {
          this.finished = true
        }

      } catch (err) {
        console.log('获取评论失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
    width: 0.66667rem;
    height: 0.66667rem;
    border-radius: 100%;
    margin-right: 0.13333rem;
}
</style>