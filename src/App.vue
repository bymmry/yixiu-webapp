<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件-->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件-->
    </router-view>

    <!--顶部导航-->
   <navigation></navigation>
  </div>
</template>

<script>
  import navigation from './views/common/components/navigation';

  export default {
    name: 'App',
    components: {
      navigation
    },
    created() {
      let userData = this.urlDataTurnObj(this.$route.path)
      sessionStorage.setItem("userData", userData); 
    }
  }
</script>

<style>


</style>
