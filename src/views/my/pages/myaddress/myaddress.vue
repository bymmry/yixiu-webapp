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
        list: [],
        //完整的地址信息
        fullAddress: []
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
          this.addressMessage()
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
        this.oldAdd = this.copy(this.fullAddress[index])
        console.log(this.oldAdd)
        console.log(this.fullAddress[index])
        this.ifchange = true;
      },
      //取消编辑
      quite(){
        this.ifchange = false;
        this.oldAdd = {};
      },
      //键入地址数据
      enterAddressList(data,index){
        let listData = {};
        listData.id = index;
        listData.name = data.name;
        listData.tel = data.tel;
        listData.address = `${data.province} ${data.city} ${data.county} ${data.address_detail}`;
        return listData
      },
      //获取地址数据
      async getaddressData(){
        let fade = [{
          name:'文俊霖',  //收货人
          tel:'13368161676',   //电话
          province:'重庆市',  //省份
          city:'重庆市',    //城市
          county:'南岸区',  //区县
          address_detail:'重庆邮电大学',  //详细地址
          postal_code:'400000',   //邮政编码
          is_default:true //是否为默认地址
        },
        {
          name: '余鹏',  //收货人
          tel:'18696835639',   //电话
          province:'重庆市',  //省份
          city:'重庆市',    //城市
          county:'南岸区',  //区县
          address_detail:'重庆邮电大学',  //详细地址
          postal_code:'400000',   //邮政编码
          is_default:false //是否为默认地址
        }]
        return fade
      },
      //地址数据处理
      async addressMessage(){
        let listData = [];
        let getedData = await this.getaddressData();
        this.fullAddress = getedData;

        for(let index in getedData){
          listData[index] = this.enterAddressList(getedData[index],index);
          if (getedData[index].is_default === true) {
            this.chosenAddressId = index;
          }
        }
        this.list = listData;
      }
    },
    created(){
      this.addressMessage();
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