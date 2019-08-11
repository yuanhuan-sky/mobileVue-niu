<template>
<!-- 点击遮罩层，隐藏dialog -->
    <!-- v-model="show" 在自定义组件中相当于
      :value="show"
      @input="show = $event"
     -->
  <van-dialog
    :showConfirmButton="false"
    :value="show"
    @input="show = $event"
    closeOnClickOverlay
  >
    Hello world
  </van-dialog>
</template>

<script>
export default {
  name: "MoreAction",
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>