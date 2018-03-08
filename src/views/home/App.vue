<template>
  <div>
    <HomeHeader></HomeHeader>
    <Swipe></Swipe>
    <Type></Type>
    <HotArea></HotArea>
    <Ticket></Ticket>
    <Activity></Activity>
    <shop-list></shop-list>
    <div class="space"></div>
  </div>
</template>

<script>
  import Nav from '../common/components/navigation.vue'
  import HomeHeader from './components/header.vue'
  import Swipe from './components/swipe.vue'
  import Type from './components/type.vue'
  import HotArea from './components/hotArea.vue'
  import Ticket from './components/tickets.vue'
  import Activity from './components/activity.vue'
  import shopList from '../common/components/shopList'
  export default {
    components: {
      Nav,
      HomeHeader,
      Swipe,
      Type,
      HotArea,
      Ticket,
      Activity,
      shopList
    }
  }
</script>

<style scoped>
.space {
  width: 100%;
  height: 8vh;
}
</style>
