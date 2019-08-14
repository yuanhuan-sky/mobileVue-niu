<template>
  <div>
    搜索结果
  </div>
</template>

<script>
export default {
  props: ['q'],
  created () {
    console.log(this.q)
  }
// 获取动态路由参数
// this.$route.params.id
}
</script>

<style>

</style>