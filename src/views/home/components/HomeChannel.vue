<template>
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '90%' }"
  >
    Hello World
  </van-popup>
</template>

<script>
export default {
  name: 'HomeChannel',
  data() {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>