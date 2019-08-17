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
import { uploadPhoto } from '@/api/user'
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
        onClose: this.handleUpload
      })
    },
    // 上传文件
    async handleUpload () {
      // 弹出确认框
      this.$dialog.confirm({
        message: '是否设置该图片为头像'
      }).then(async () => {
        // 加载提示
        const toast = this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传...'
        })

        // on confirm
        // 上传图片
        try {
          const data = await uploadPhoto('photo', this.$refs.file.files[0])
          // 更改父组件中显示的头像
        
          this.$toast.success('上传成功')
        } catch (err) {
          this.$toast.fail('上传失败' + err)
        }

        toast.clear()

      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style>

</style>