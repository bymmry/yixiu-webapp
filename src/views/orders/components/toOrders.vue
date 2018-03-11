<template>
  <div class="toOrders">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'to-orders'
    };
</script>

<style scoped>
.toOrders{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 8vh;
}
</style>
