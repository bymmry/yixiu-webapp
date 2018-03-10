<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"></van-pull-refresh>
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
  import { PullRefresh } from 'vant'
  export default {
    components: {
      Nav,
      HomeHeader,
      Swipe,
      Type,
      HotArea,
      Ticket,
      Activity,
      shopList,
      [PullRefresh.name]: PullRefresh
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.prompt('刷新成功', 'success');
          this.isLoading = false;
        }, 500);
      }
    }
  }
</script>

<style scoped>
.space {
  width: 100%;
  height: 8vh;
}
</style>
