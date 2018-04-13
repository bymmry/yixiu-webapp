<!-- 已购买课程详细信息 -->
<template>
  <transition name="slide">
    <div>123</div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

}

</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>