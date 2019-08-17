<template>
  <div class="page-user-chat">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <!-- 聊天列表 -->
    <div class="chat-list" ref="chatList">
      <!-- 聊天消息 -->
      <div
        v-for="(msg, index) in messages"
        :key="msg.timestamp + index"
        class="chat-item"
        :class="msg.robot ? 'left' : 'right'">
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="chat-pao">{{ msg.msg }}</div>
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么...">
        <van-loading v-if="commentLoading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value: '',
      commentLoading: false,
      socket: null,
      // 存储所有的消息
      messages: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 创建socket对象
    this.socket = io('http://ttapi.research.itcast.cn', {
      // 设置token
      query: {
        token: this.user.token
      }
    })
    // 注册事件
    this.socket.on('connect', () => {
      console.log('连接成功')
      // this.socket.send({ msg: '你好', timestamp: Date.now() })
      // this.socket.emit('message', { msg: '你好', timestamp: Date.now() })
    })
    this.socket.on('message', (data) => {
      // console.log(data) {msg, timestamp}
      // 接收到服务器返回的消息
      this.messages.push({
        robot: true,
        ...data
      })
      // 
      this.handleScroll()
    })
    this.socket.on('disconnect', () => {
      console.log('断开连接')
    })
  },
  methods: {
    send () {
      const msg = {
        msg: this.value,
        timestamp: Date.now(),
        robot: false
      }
      // 存储消息
      this.messages.push(msg)
      // 发送消息
      this.socket.send(msg)
      this.handleScroll()
    },
    // 发送消息，处理滚动条
    handleScroll () {
      // 数据更新之后，等待本次更新后的数据在界面上渲染之后再执行
      this.$nextTick(() => {
        // 设置 chat-list 的滚动出去的距离，是chat-list的最大告诉scrollHeight
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    }
  }
}
</script>

<style scoped lang='less'>
.page-user-chat {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 92px 0 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 20px;
      .van-image{
        vertical-align: top;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 70%;
        min-height: 80px;
        line-height: 80px;
        border: 0.5px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before{
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 26px;
          border-top:1px solid #c2d9ea;
          border-right:1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 30px;
    &::before{
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 30px;
    margin-right: 0;
    &::before{
      left: -12px;
      transform: rotate(-135deg);
    }
  }
}
.van-image{
  width: 80px;
  height: 80px;
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>