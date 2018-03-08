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
      //将url中的对象存储下来并转换成json对象
      let userData = this.urlDataTurnObj(this.$route.path)
      userData = JSON.parse(userData);
      //将url中的对象按照注册接口需要的参数赋值，保存到PushData
      let pushData = this.reguserinfo(userData)
      //注册
      reguser(pushData).then(res => {
        let user = JSON.stringify(res.data);
        //将用户信息储存到userData中
        sessionStorage.setItem("userData", user);
        
        // console.log(sessionStorage.getItem("userData"))
      },(err => {
        console.log(err)
      }))
    }
  }
</script>

<style>


</style>
