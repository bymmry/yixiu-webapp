<!-- h5支付结果判断 -->
<template>
  <div ref="surePay">
    <cube-poup class="isPaySuccess">
      <h3>请确认支付是否完成</h3>
      <ul>
        <li class="com" @click="paySuccess">支付完成</li>
        <li class="re" @click="rePay">支付遇到问题，重新支付</li>
      </ul>
    </cube-poup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },

    components: {},

    methods: {
      paySuccess() {
        this.$emit("hasPaySuccess", true)
      },
      rePay() {
        this.$emit("hasPaySuccess", false)
      }
    }
  }

</script>

<style scoped>

  .isPaySuccess {
    /* background: #eee; */
    width: 60vw;
    height: 150px;
    background: #fff;
    color: #777;
    border-radius: 5px;
  }

  .isPaySuccess h3 {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .isPaySuccess ul li {
    width: 100%;
    text-align: center;
    border-top: 1px solid #eee;
  }

  .isPaySuccess ul li.com {
    color: red;
    height: 69px;
    line-height: 69px;
  }

  .isPaySuccess ul li.re {
    height: 39px;
    line-height: 39px;
    font-size: 13px;
  }

</style>

