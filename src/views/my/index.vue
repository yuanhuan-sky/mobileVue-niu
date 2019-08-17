<template>
  <div>
    <!-- 未登录 -->
    <un-login v-if="!user"></un-login>
    <!-- 已登录 -->
    <user-info v-else></user-info>
  </div>
</template>

<script>
import UnLogin from './components/UnLogin'
import UserInfo from './components/UserInfo'
import { mapState } from 'vuex'
export default {
  name: 'My',
  components: {
    UnLogin,
    UserInfo
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>