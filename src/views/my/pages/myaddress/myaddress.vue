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

    <change-address v-if="ifchange" :old-add="oldAdd" :type="type" @addSuccess="addSuccess"></change-address>
    
    
  </div>

</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import { AddressList } from 'vant';
  import { PullRefresh } from 'vant';
  import changeAddress from '../../components/changeaddress.vue'
  import { getaddressById } from '../../../common/api'

  export default {
    data () {
      return {
        ifchange: false,  //是否修改
        chosenAddressId: "0",   //默认地址
        //空白地址
        blandAdd:{
          name:"",  //联系人
          tel:"",   //电话
          province:"",  //省份
          city:"",    //城市
          county: "",  //区县
          address_detail: "",  //详细地址
          is_default:"" //是否为默认地址
        },
        //修改或者新加
        type:"",
        //修改地址时传入的参数
        oldAdd: {
          name:"",  //联系人
          tel:"",   //电话
          province:"",  //省份
          city:"",    //城市
          county: "",  //区县
          address_detail: "",  //详细地址
          is_default:"" //是否为默认地址
        },   
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
        this.type = "new"
      },
      //编辑现有地址
      onEdit(item, index) {
        this.type = "edit"
        this.oldAdd = this.copy(this.fullAddress[index])
        // console.log(this.oldAdd)
        // console.log(this.fullAddress[index])
        this.ifchange = true;
      },
      //取消编辑
      quite(){
        this.ifchange = false;
        this.oldAdd = this.copy(this.blandAdd);
      },
      //键入地址数据
      enterAddressList(data,index){
        let listData = {};
        listData.id = index;
        listData.name = data.contactName;
        listData.tel = data.mobile;
        listData.address = data.info;
        return listData
      },
      //获取地址数据
      async getaddressData(id){
        let addressData = await getaddressById(id)

        return new Promise((resolve, reject) => {
          resolve(addressData.data)
        })
      },
      //地址数据处理
      async addressMessage(){
        let userData = sessionStorage.getItem("userData");
        userData = JSON.parse(userData);

        let listData = [];
        let getedData = await this.getaddressData(userData._id);

        this.fullAddress = getedData;

        for(let index in getedData){
          listData[index] = this.enterAddressList(getedData[index],index);
        }
        this.list = listData;
        console.log(this.fullAddress)
      },
      //地址更新成功
      addSuccess() {
        this.ifchange = false;
        this.oldAdd = {};
        this.addressMessage()
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