<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      @click-left="$router.back()"
    />
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{ article.title }}</h2>
      <!-- 作者信息 -->
      <auth-info :article="article"></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">
      </div>
      <!-- 点赞和取消 -->
      <more-action :article="article"></more-action>
      <!-- 评论列表 -->
      <!-- 组件将来要重复使用，可能展示文章的评论，还可能展示评论的评论 -->
      <comment-list :id="article.art_id.toString()" :isArticle="true"></comment-list>
      <!-- 发布评论 -->
      <send-comment :id="article.art_id.toString()"></send-comment>
      <!-- 回复评论的列表 -->
      <reply-list :id="id" v-if="$store.state.showReplyList"></reply-list>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/AuthInfo'
import MoreAction from './components/MoreAction'
import { getArticle } from '@/api/article'
import CommentList from './components/CommentList'
import SendComment from './components/SendComment'
import ReplyList from './components/ReplyList'

export default {
  name: 'Article',
  props: ['id'],
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList
  },
  data () {
    return {
      article: null
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 加载文章详情
    async loadArticle () {
      const toast = this.$toast.loading({
        mask: true,
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在加载中...'
      })

      try {
        const data = await getArticle(this.id)
        this.article = data
      } catch (err) {
        console.log(err)
      }

      toast.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 92px;
  padding: 0px 20px;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
