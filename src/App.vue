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
  import { reguser } from './views/common/api'

  export default {
    name: 'App',
    components: {
      navigation
    },
    created() {
      let userData = this.urlDataTurnObj(this.$route.path)

      // let userData = sessionStorage.getItem("userData");
      userData = JSON.parse(userData);
      // console.log(userData)
      let pushData = this.reguserinfo(userData)
      // console.log(pushData)

      reguser(pushData).then(res => {
        //注册成功
        // console.log(res)
        
        // if (Data !== {} && Data !== null) {
        let userData2 = JSON.stringify(res.data);

        console.log(res.data)
          sessionStorage.setItem("userData", userData2);
          console.log(sessionStorage.getItem("userData"))
        // }
      },(err => {
        console.log(err)
      }))

      // console.log(userData);
      // sessionStorage.setItem("userData", userData); 
    }
  }
</script>

<style>


</style>
