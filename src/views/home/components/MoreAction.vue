<template>
<!-- 点击遮罩层，隐藏dialog -->
    <!-- v-model="show" 在自定义组件中相当于
      :value="show"
      @input="show = $event"
     -->
  <van-dialog
    :showConfirmButton="false"
    :value="value"
    @input="$emit('input', $event)"
    closeOnClickOverlay
  >
    <van-cell-group v-show="!isReportShow">
      <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReportShow=true" />
      <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')" />
    </van-cell-group>

    <van-cell-group v-show="isReportShow">
      <van-cell icon="arrow-left" @click="isReportShow=false"/>
      <van-cell title="标题夸张" icon="location-o" />
      <van-cell title="低俗色情" icon="location-o" />
      <van-cell title="错别字多" icon="location-o" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
import { blackUserList } from '@/api/user'

export default {
  name: "MoreAction",
  props: ['value', 'currentArticle'],
  data () {
    return {
      // 控制反馈内容是否显示
      isReportShow: false
    }
  },
  methods: {
    // 点击cell的时候执行
    handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklist()
          break
      }
    },
    // 不感兴趣
    async dislike () {
      // console.log(this.currentArticle)
      try {
        const id = this.currentArticle.art_id
        // 发送请求
        await dislikeArticle(id)
        // 提示成功还是失败
        // 如果成功，告诉home组件--》隐藏moreaction，移除不感兴趣的文章
        // 触发一个成功的事件，告诉home组件
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    },
    // 拉黑作者
    async blacklist () {
      try {
        // 作者的id
        const id = this.currentArticle.aut_id
        // 发送请求
        await blackUserList(id)
        // 根据成功失败，做提示
        this.$toast.success('操作成功')
        // 成功--->通知home组件，隐藏MoreAction，屏蔽作者
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    }
  }
}
</script>

<style>

</style>