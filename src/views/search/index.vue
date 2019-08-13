<template>
  <div>
    <!-- 导航头-搜索框 -->
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      show-action
      @input="handleSuggestion"
      @search="onSearch"
      @cancel="$router.push('/')"
    />

    <!-- 智能提示 -->
    <van-cell-group>
      <van-cell
        v-for="item in suggestionList"
        :key="item"
        :title="item"
        icon="search"/>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import _ from 'lodash'
export default {
  data () {
    return {
      value: '',
      suggestionList: ''
    }
  },
  methods: {
    onSearch () {
      console.log('xxx')
    },
    // 搜索建议
    handleSuggestion: _.debounce(async function () {
      try {
        if (this.value.trim() === '') {
          this.suggestionList = []
          return
        }

        const data = await getSuggestions(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }, 500)
  }
}
</script>

<style>

</style>