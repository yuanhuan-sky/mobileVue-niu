<template>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从相册选择" @click="handleSelectPhoto" />
      <input type="file" @change="handleFile" ref="file" style="display: none">
      <van-cell title="拍照" />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  name: 'UploadPhoto',
  props: ['value'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    // 点击从相册选择，弹出选择文件的对话框
    handleSelectPhoto () {
      // 获取file标签，点击
      this.$refs.file.click()
    },
    // 当从file中选择文件后要去预览图片
    handleFile () {
      //this.$refs.file.files[0]
      // 关闭选择图片的弹出框
      this.$emit('input', false)
      // 图片的预览
      ImagePreview({
        images: [
          URL.createObjectURL(this.$refs.file.files[0])
        ],
        showIndex: false,
        onClose() {
          // do something
        }
      })
    }
  }
}
</script>

<style>

</style>