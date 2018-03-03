<template>
  <div>
    <HomeHeader></HomeHeader>
    <Swipe></Swipe>
    <Type></Type>
    <HotArea></HotArea>
  </div>
</template>

<script>
  import Nav from '../common/components/navigation.vue'
  import HomeHeader from './components/header.vue'
  import Swipe from './components/swipe.vue'
  import Type from './components/type.vue'
  import HotArea from './components/hotArea.vue'
  export default {
    components: {
      Nav,
      HomeHeader,
      Swipe,
      Type,
      HotArea
    },
    methods: {
      
    }
  }
</script>

<style scoped>

</style>