<template>
  <div>
    <home-header></home-header>
    <div>home body</div>
    <div>
      图标(可设置颜色):
      <sicon name="test" scale="10" color="#EF5350"></sicon>
    </div>
    <cube-button @click="test">发起请求</cube-button>
    <div>
      vant-ui
    </div>
    <van-button type="default">vant默认按钮</van-button>
  </div>
</template>

<script>
  //vant
  import { Button } from 'vant'
  import HomeHeader from './components/header.vue'
  export default {
    components: {
      HomeHeader,
      [Button.name]: Button
    },
    methods: {
      async test() {
        //请求之前的加载动画
        const toast = this.$createToast({
          time: 0,
          txt: '加载中...'
        })

        //使用show调出方法
        toast.show()
        let res = await this.$api.hello()
        //请求结束之后关闭动画,不管请求成功与否
        toast.hide()

        //请求成功之后的处理
        if (res) {
          const tip = this.$createToast({
            txt: '请求成功!',
            type: 'correct',
            time: 1000
          })
          toast.show()
        }
      }
    }
  }
</script>

<style scoped>

</style>