<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      fixed
      title="黑马头条"
    />
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

      <!-- 频道列表 -->
      <van-tabs v-model="activeTabIndex">
        <van-tab
          v-for="channel in channels"
          :title="channel.name"
          :key="channel.id">
          <!-- 文章列表-自带上拉加载更多 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <!-- 展示文章列表 -->
            <van-cell
              v-for="item in channel.articles"
              :key="item.art_id"
              :title="item.title"
            />
          </van-list>
        </van-tab>
      </van-tabs>
    
    </van-pull-refresh>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getUserArticles } from '@/api/article'
export default {
  name: 'Home',
  data () {
    return {
      // list 需要的数据
      list: [],
      loading: false,
      finished: false,
      // 下拉刷新需要的数据
      isLoading: false,
      // 存储频道数据
      channels: [],
      // 激活的频道的tab的索引
      activeTabIndex: 0,
      timestamp: Date.now()
    }
  },
  created () {
    // 加载用户的频道数据  
    this.loadChannels()
  },
  methods: {
    // 加载频道数据
    async loadChannels () {
      try {
        // 判断用户是否登录
        // 如果用户登录，调用getUserChannels获取频道数据
        if (this.$store.state.user) {
          const data = await getUserChannels()
          this.channels = data.channels
        } else {
          // 如果用户没有登录
          //    从本地存储中获取数据
          //    如果本地存储中没有数据，调用getUserChannels获取频道数据
          //    把获取到的频道数据，存储到本地存储中
          this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
          if (this.channels.length === 0) {
            const data = await getUserChannels()
            this.channels = data.channels
            window.localStorage.setItem('channels', JSON.stringify(this.channels))
          }
        }

        // this.channels ===> [{id:1,name:'xx'}]
        // 希望 this.channels ===> [{id:1,name:'xx',articles:[]}]
        // 给每一个频道对象，添加一个属性 文章列表 articles
        this.channels.forEach((item) => {
          item.articles = []
        })
      } catch (err) {
        this.$toast.fail('获取频道数据失败' + err)
      }
    },
    // list 组件的
    async onLoad() {
      // 当list组件的load事件触发，会把loading设置为true
      // 获取当前频道的id
      const activeChannel = this.channels[this.activeTabIndex]
      const id = activeChannel.id
      const data = await getUserArticles({ channelId: id, timestamp: this.timestamp })

      // 把文章列表存储到 channel的articles属性中
      // activeChannel.articles = data.results
      // [{},{}, {}]
      activeChannel.articles.push(...data.results)

      // 保存data中的pre_timestamp
      this.timestamp = data.pre_timestamp

      this.loading = false
      console.log(data)
      // 发送请求

      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    // 下拉刷新组件的
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  margin-bottom: 100px;
  margin-top: 92px;
}
// 在scoped里面，动态生成的内容，对应的样式不起作用
// .van-tabs /deep/ .van-tabs__content {
//   margin-top: 300px;
//   color: red;
// }
</style>

