<template>
<!-- 点击遮罩层，隐藏dialog -->
  <van-dialog
    :showConfirmButton="false"
    v-model="show"
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