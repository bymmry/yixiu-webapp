<template>
  <div class="myadd-container">
    <van-nav-bar
      title="我的地址"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
      v-if="!ifchange"
    />
    <van-nav-bar
      title="更新地址"
      left-text="取消"
      fixed
      left-arrow
      @click-left="quite"
      v-if="ifchange"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <!-- 刷新区域 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="myadd-minh" v-if="!ifchange">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        v-if="!ifchange"
      />
    </van-pull-refresh>

    <change-address v-if="ifchange" :old-add="oldAdd"></change-address>
    
    
  </div>

</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import { AddressList } from 'vant';
  import { PullRefresh } from 'vant';
  import changeAddress from '../../components/changeaddress.vue'

  export default {
    data () {
      return {
        ifchange: false,  //是否修改
        chosenAddressId: '1',   //默认地址
        oldAdd: {},   //修改地址时传入的参数
        isLoading: false,   //是否刷新
        //地址名单
        list: [
          {
            id: '1',
            name: '文俊霖',
            tel: '13368161676',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ]
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [AddressList.name]: AddressList,
      [PullRefresh.name]: PullRefresh,
      changeAddress
    },
    methods: {
      //刷新
      onRefresh() {

        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
        setTimeout(() => {
          location.reload()
        }, 1000);
      },
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      //添加新的地址
      onAdd() {
        this.ifchange = true;
      },
      //编辑现有地址
      onEdit(item, index) {
        this.ifchange = true;
      },
      //取消编辑
      quite(){
        this.ifchange = false;
      }
    }
  }
</script>

<style scoped>
  .myadd-container{
    padding: 0.3vh 0vw 5vh 0vw;
    margin-bottom: 70px;
    background: #fff;
  }
  .topblank{
    margin-top: 45.6px;
  }
  .van-address-list .van-address-list__group{
    padding-top: 10px;
    padding-bottom: 0;
  }
  .myadd-minh{
    min-height: 80vh;
  }
  
</style>