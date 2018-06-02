<!-- h5支付结果判断 -->
<template>
  <cube-popup ref="surePay">
    <div class="isPaySuccess">
      <ul>
        <li @click="paySuccess">支付完成</li>
        <li @click="rePay">支付遇到问题，重新支付</li>
      </ul>
    </div>
  </cube-popup>
</template>

<script>
  export default {
    data() {
      return {};
    },

    components: {},

    methods: {
      paySuccess() {
        this.$emit("hasPaySuccess",true)
      },
      rePay(){
        this.$emit("hasPaySuccess",false)
      }
    }
  }

</script>

<style scoped>
  .isPaySuccess {
    width: 60vw;
    height: 100px;
    background: #fff;
    color: #777;
  }

  .isPaySuccess ul li {
    width: 100%;
    height: 49px;
    text-align: center;
    line-height: 49px;
    border-bottom: 1px solid #777;
  }

</style>

