<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input v-model="content" type="text" placeholder="请输入评论内容">
    </div>
    <div class="more-wrap">
      <van-icon
        v-if="artId"
        name="star-o"></van-icon>
      <van-button
        @click="handleSend"
        :disabled="content.length === 0"
        size="small">发布</van-button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/api/comment'

export default {
  name: 'SendComment',
  props: ['id', 'artId'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async handleSend () {
      if (!this.$checkLogin()) {
        return
      }

      try {
        const data = await sendComment({
          target: this.id,
          content: this.content,
          artId: this.artId
        })
        // 刚刚发表的评论对象
        // data.new_obj
        // 因为在index.vue 中 CommentLIst和SendCOmment是兄弟组件
        // 可以使用event but 把刚刚发布的评论，通过事件的机制，通知给CommentLIst。显示最新评论
        // console.log(data)
        this.$toast.success('操作成功')

      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
