<template>
  <!-- 此处不用 v-model="" 双向绑定，而我们控制他显示隐藏的值，是在vuex中 -->
  <van-popup
    :value="$store.state.showReplyList"
    position="bottom"
    :style="{ height: '80%' }"
    @click-overlay="$store.commit('setShowReplyList', false)"
    >
    <!-- 头 -->
    <van-nav-bar
      :title="$store.state.currentComment.reply_count + '条评论'"
    />
    <!-- 楼主发的评论 -->
    <van-cell
    >
      <!-- title的插槽 -->
      <div slot="title">{{ $store.state.currentComment.aut_name }} &nbsp;<van-tag>楼主</van-tag></div>
      <!-- 头像 -->
      <div slot="icon">
        <img class="avatar" :src="$store.state.currentComment.aut_photo" alt="">
      </div>
      <!-- 最右侧的按钮 -->
      <div>
        <van-button type="default" icon="star-o" size="mini">赞</van-button>
      </div>
      <!-- 评论内容 -->
      <div slot="label">
        <p>{{ $store.state.currentComment.content }}</p>
        <span>{{ $store.state.currentComment.pubdate | fmtDate }}</span>&nbsp;&nbsp;<span>回复 {{ $store.state.currentComment.reply_count }}</span>
      </div>
    </van-cell>

    <!-- 评论列表 -->
    <h6>全部评论</h6>
    <comment-list :id="$store.state.currentComment.com_id.toString()" :isArticle="false"></comment-list>
  
    <!-- 发布评论 -->
    <send-comment :id="$store.state.currentComment.com_id.toString()" :artId="id"></send-comment>
  </van-popup>
</template>

<script>
import CommentList from './CommentList'
import SendComment from './SendComment'
export default {
  name: 'ReplyList',
  props: ['id'],
  components: {
    CommentList,
    SendComment
  },
  created () {
    console.log(this.$store.state.currentComment)
  },
  data () {
    return {
      show: true
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