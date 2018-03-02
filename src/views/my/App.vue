<template>
  <div class="my-container">
    <!-- 个人中心-信息 -->
    <router-link to="/my/information">
      <div class="box-container">
        <div class="infobox">
          <div class="profile-picture">
            <img :src="userInfo.img">
          </div>
          <div class="userinfo">
            {{ userInfo.id }}
          </div>
        </div>
        <div class="userinfo moreInfo">会员信息<sicon name="my-rightArr" scale="1.7"></sicon></div>
      </div>
    </router-link>

    <!-- 个人中心-优惠券 -->
    <div class="box-container">
      <div class="coupon-container">
        <router-link to="/my/mycoupus" class="coupon">
            <div>
              <div>我的优惠券</div>
              <div class="use-coupon" v-if=" userInfo.name!='' ">{{ userInfo.coupon }}张可用</div>
            </div>
            <div><sicon name="my-rightArr" scale="1.7" color="#a6a6a6"></sicon></div>
        </router-link>
        <div class="coupon-line"></div>

        <router-link to="/my/mycoupus" class="coupon">
          <div>
            <div>领券中心</div>
          </div>
          <div><sicon name="my-rightArr" scale="1.7" color="#a6a6a6"></sicon></div>
        </router-link>
      </div>
    </div>

    <!-- 个人中心-其他 -->
    <div class="box-container">
      <div class="list-container">

        <div v-for="(catalog, index) in catalogs">
          <!-- 分割线 -->
          <div class="list-line" v-if="index != 0"></div>
          <router-link  :to="{ path: catalog.url }" :key="index" class="list-box" v-if="catalog.name==='我的地址'">
            <div class="list-L">
              <sicon :name="catalog.icon" scale="2" color="#353535"></sicon>
              <div>{{ catalog.name}}</div>
            </div>
            <div><sicon name="my-rightArr" scale="1.3" color="#a6a6a6"></sicon></div>
          </router-link>
          <div class="list-box" v-else @click="toast_no">
            <div class="list-L">
              <sicon :name="catalog.icon" scale="2" color="#353535"></sicon>
              <div>{{ catalog.name}}</div>
            </div>
            <div><sicon name="my-rightArr" scale="1.3" color="#a6a6a6"></sicon></div>
          </div>
        </div>
        

      </div>
    </div>

    <van-button type="default" @click="sign_out">退出</van-button>

  </div>
</template>

<script>
  //van
  import { Button } from 'vant'
  export default {
    data () {
      return {
        //用户信息
        userInfo:{   
          img: "https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
          id: "13368161676",
          coupon: 1,
        },
        //功能菜单列表
        catalogs:[    
          {
            name: "我的积分",
            icon: "my-coin",
            url: ""
          },
          {
            name: "我的收藏",
            icon: "my-collect",
            url: ""
          },
          {
            name: "我的地址",
            icon: "my-address",
            url: "my/myaddress"
          },
          {
            name: "问题反馈",
            icon: "my-question",
            url: ""
          }
        ]
      }
    },
    components: {
      [Button.name]: Button
    },
    methods: {
      //功能无法使用的提示
      async toast_no() {
        const toast = this.$createToast({
          txt: '本功能即将到来',
          type: 'error',
          time: 1500
        })
        //使用show调出方法
        toast.show()
      },
      async sign_out(){
        const toast = this.$createToast({
          time: 0,
          txt: '正在退出'
        })
        toast.show();


        //退出需要进行的操作
        let res = 1



        toast.hide()
        if (res) {
          const tip = this.$createToast({
            txt: '您已退出!',
            type: 'correct',
            time: 1000
          })
          toast.show()
        }
      }
    }
  }
</script>

<style scoped>
  .my-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 2vh 3vw 5vh 3vw;
    background: rgb(240, 241, 245);
  }
  .box-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 0.1vw solid #ddd;
    padding: 3vw;
    margin-bottom: 2vw;
    background: #fff;
    -moz-box-shadow:0.5vw 0.5vh 3vw #DDD; 
    -webkit-box-shadow:0.5vw 0.5vh 3vw #DDD; 
    box-shadow:0.5vw 0.5vh 3vw #DDD;
  }
  .infobox{
    display: flex;
    flex-direction: row;
    align-items:center;
    height: 9vh;
  }
  .profile-picture{
    width: 12vw;
    height: 12vw;
    margin-right: 2vw;
    overflow: hidden;
    border-radius: 50%;
  }
  .profile-picture img{
    width: 100%;
    height: 100%
  }
  .userinfo {
    color:#313131;
    font-size: 5vw;
  }
  .moreInfo{
    display: flex;
    flex-direction: row;
    align-items:center;
  }


  .coupon-container{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .coupon{
    width: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #353535
  }
  .coupon-line{
    display: inline-block;
    height: 8vh;
    width: 0.5vw;
    background: #ecebeb;
    margin:0 2vw;
  }
  .use-coupon{
    margin-top: 1vh;
    color: #a6a6a6;
    font-size: 14px;
  }


  .list-container{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .list-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7vh;
  }
  .list-line{
    width: 100%;
    height: 0.3vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    background: #ecebeb;
  }
  .list-L{
    font-size: 5vw;
    display: flex;
    flex-direction: row;
    color: #353535;
  }
  .list-L svg{
    margin-left: 1vw;
    margin-right: 3vw;
  }
</style>