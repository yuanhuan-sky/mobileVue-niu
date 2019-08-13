<template>
  <div>
    <!-- 导航头-搜索框 -->
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      show-action
      @search="onSearch"
      @cancel="$router.push('/')"
    />

    <!-- 智能提示 -->
    <van-cell-group>
      <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      console.log('xxx')
    }
  }
}
</script>

<style>

</style>