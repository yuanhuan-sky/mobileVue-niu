<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            v-show="!showClose"
            @click="showClose=true"
            type="danger"
            plain
            size="mini"
          >编辑</van-button>
          <div v-show="showClose" class="btn">
            <span>全部删除</span>&nbsp;
            <span @click="showClose=false">完成</span>
          </div>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          @click="handleMy(index)"
          v-for="(item, index) in channels"
          :key="item.id">
          <span class="text" :class="{ active: index === activeIndex }">{{ item.name }}</span>
          <!-- 删除按钮 -->
          <van-icon class="close-icon" name="close" v-show="showClose && item.name!=='推荐' " />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 全部频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          @click="handleSelect(item)"
          v-for="item in recommendChannels"
          :key="item.id">
          <div class="info">
            <span class="text">{{ item.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteUserChannel } from '@/api/channel'
export default {
  name: 'HomeChannel',
  props: ['value', 'channels', 'activeIndex'],
  data () {
    return {
      showClose: false,
      // 存储所有的频道
      allChannels: []
    }
  },
  created () {
    // 加载所有频道
    this.loadAllChannels()
  },
  computed: {
    // 获取推荐的频道列表
    recommendChannels () {
      // 获取我的频道的所有id
      // map的作用遍历数组，根据数据内容返回一个新的数组
      const ids = this.channels.map((item) => {
        return item.id
      })
      return this.allChannels.filter((item) => {
        return !ids.includes(item.id)
      })
    }
  },
  methods: {
    // 加载所有频道
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        this.allChannels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // 点击我的频道，把当前索引传递给home组件，并且隐藏当前组件
    async handleMy (index) {
      // 如果是推荐，什么都不做
      if (index === 0) {
        return
      }
      // 判断当前是否是编辑模式
      if (!this.showClose) {
        this.$emit('selectMyIndex', index)
      } else {
        // 获取当前点击的频道的id
        const id = this.channels[index].id
        // 仅仅删除了内存中的数据
        this.channels.splice(index, 1)
        // 判断用户是否登录，用户登录，发送请求
        if (this.$store.state.user) {
          // 发送请求，记录当前我的频道
          // 判断异常
          await deleteUserChannel(id)
        } else {
          // 用户没有登录保存到本地存储
          window.localStorage.setItem('channels', JSON.stringify(this.channels))
        }
      }
    },
    // 点击推荐频道，把点击的频道添加到我的频道
    handleSelect (item) {
      this.channels.push(item)
      // 发送请求，保存我的频道到服务器
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .btn {
      font-size: 30px;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
