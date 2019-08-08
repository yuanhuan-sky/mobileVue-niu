<template>
  <div class="login-wrap">
    <!-- 导航头 -->
    <van-nav-bar
      title="标题"
    />
    <!-- 登录框 -->
    <van-cell-group>
      <!-- 表单验证插件的配置 v-validate -->
      <!-- 想要用该插件提供的功能，文本框必须要有name属性 -->
      <!-- errors.first('文本框的name属性的值') -->
      <van-field
        name="mobile"
        v-validate="'required'"
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
        clearable
        left-icon="contact"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        clearable
        left-icon="gem-o"
      >
        <van-button slot="button" size="small" type="default">发送验证码</van-button>
      </van-field>

      <div class="login-btn">
        <van-button @click="handleLogin" class="btn" type="info">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 点击按钮登录
    async handleLogin () {
      try {
        // 登录状态 -- token
        const data = await login(this.user)

        // 跳转之前保持登录状态
        this.$store.commit('setUser', data)
        // 跳转到 home
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.log('登录失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>

