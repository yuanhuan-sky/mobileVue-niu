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
        v-validate="'required|digits:11'"
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
        clearable
        left-icon="contact"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-model="user.code"
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        label="验证码"
        placeholder="请输入验证码"
        clearable
        left-icon="gem-o"
      >
        <van-button slot="button" size="small" type="default">发送验证码</van-button>
      </van-field>

      <div class="login-btn">
        <van-button
          :loading="loading"
          loading-type="spinner"
          loading-text="登录中..."
          @click="handleLogin"
          class="btn"
          type="info">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  created () {
    // 配置自定义错误信息
    const dict = {
      custom: {
        mobile: {
          required: '手机号不能为空',
          digits: '手机号必须为11位数字'
        },
        code: {
          required: '验证码不能为空',
          digits: '验证码必须为6位数字'
        }
      }
    };
    // or use the instance method
    this.$validator.localize('zh_CN', dict);
  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 控制按钮显示正在加载...
      loading: false
    }
  },
  methods: {
    // 点击按钮登录
    async handleLogin () {
      this.loading = true
      try {
        // 验证表单输入
        const valide = await this.$validator.validate()
        // 如果验证失败返回
        if (!valide) {
          this.loading = false
          return
        }

        // 登录状态 -- token
        const data = await login(this.user)

        // 跳转之前保持登录状态
        this.$store.commit('setUser', data)
        // 跳转到 home
        this.$router.push({
          name: 'home'
        })
        this.$toast.success('登录成功')

      } catch (err) {
        console.log('登录失败' + err)
        this.$toast.fail('登录失败')
      }
      this.loading = false
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

