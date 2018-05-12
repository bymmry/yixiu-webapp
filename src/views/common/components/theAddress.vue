<template>
  <div class="myadd-container">
    <h3>点击选择地址</h3>
    <p v-if="fullAddress.length == 0">你还没有地址，去个人中心<button @click="addMyAddress">添加</button>一个吧</p>
    <ul v-else>
        <li 
          v-for="(add,index) in fullAddress" 
          :key="index"
          @click="selectAddress(index)">
            <p>
                <span>{{add.contactName}}</span>
                <span>{{add.mobile}}</span>
            </p>
            <p>{{add.info}}</p>
        </li>
    </ul>
    <div>
      <change-address v-show="addressStatus" :type="type" @addSuccess="addSuccess"></change-address>
    </div>
  </div>

</template>

<script>
  //vant
  import { NavBar, Button, Dialog } from 'vant';
  import { AddressList } from 'vant';
  import { PullRefresh } from 'vant';
  import { getaddressById } from '../api';
  import addAddress from './addAddress'
  import changeAddress from './changeaddress'
  export default {
    name: 'theAddress',
    data () {
      return {
       fullAddress: [],
       list:[],
       addressStatus: false,
       type: "",
      }
    },
    components: {
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [AddressList.name]: AddressList,
      addAddress,
      changeAddress
    },
    methods: {
      //获取地址数据
      addMyAddress () {
        this.addressStatus = true;
        this.type = "new";
      },
      addSuccess() {
        this.addressStatus = false;
        this.addressMessage();
      },
      async getaddressData(id){
        let addressData = await getaddressById(id)

        return new Promise((resolve, reject) => {
          resolve(addressData.data)
        })
      },
      //地址数据处理
      async addressMessage(){
        let userData = this.getUserInfo();

        let getedData = await this.getaddressData(userData._id);

        this.fullAddress = getedData
        console.log(this.fullAddress)
      },
      selectAddress: function(index){
        this.$emit("returnAddress", this.fullAddress[index]);
      }
    },
    created(){
      this.addressMessage();
    },
  }
</script>

<style scoped>
    .myadd-container{
        /*padding: 0.3vh 0vw 5vh 0vw;*/
        background: #fff;
        width: 100vw;
        padding: 20px 0;
    }
    .myadd-container h3{
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
    }
    .myadd-container ul{
        padding: 15px;
    }
    .myadd-container ul li{
        padding: 5px;
        border-bottom: 1px solid #eee;
    }
    .myadd-container ul li p span{
        margin-right: 5px;
        font-size: 13px;
    }
  
</style>