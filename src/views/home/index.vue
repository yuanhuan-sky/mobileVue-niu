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
      <van-tabs>
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
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-tab>
      </van-tabs>
    
    </van-pull-refresh>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
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
      channels: []
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
        const data = await getUserChannels()
        this.channels = data.channels
      } catch (err) {
        this.$toast.fail('获取频道数据失败' + err)
      }
    },
    // list 组件的
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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

