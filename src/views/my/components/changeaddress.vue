<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-search-result
      @save="onSave"
      @delete="onDelete"
    />
    <div class="deleteBtn">
      <van-button type="danger" @click="popupChose">删除该地址</van-button>
    </div>
    <van-popup v-model="popupshow" class="popup">
      <div class="popupTitle">确定删除？</div>
      <div class="popupBtn">
        <van-button type="primary" @click="popupChoseNO">否</van-button>
        <van-button type="danger" @click="popupChoseYES">是</van-button>
      </div>
      
    </van-popup>
  </div>
  
</template>

<script>
  //vant
  import { AddressEdit } from 'vant';
  import { Button } from 'vant';
  import { Popup } from 'vant';
  import areaList from './data/area.json'
  import { addAddress, editAddress, delAddress } from '../../common/api'

  export default {
    data() {
      return {
        popupshow:false,
        areaList,
        addressId:"",
        addressInfo:{
          name:"",  //联系人
          tel:"",   //电话
          province:"",  //省份
          city:"",    //城市
          county: "",  //区县
          address_detail: "",  //详细地址
        }
      }
    },
    props: {
      oldAdd: {
        type:Object
      },
      type: {
        type:String
      }
    },
    components: {
      [AddressEdit.name]: AddressEdit,
      [Button.name]: Button,
      [Popup.name]: Popup,
      addAddress,
      editAddress,
      delAddress
    },
    methods: {
      //将得到的数据转换成组件需要的
      getinfoAddressData(data){
        let addressInfo = {
          name: data.contactName,  //联系人
          tel: data.mobile,   //电话
          province: data.province,  //省份
          city: data.city,    //城市
          county: data.area,  //区县
          address_detail: data.stree,  //详细地址
        }
        return addressInfo;
      },
      //将组件的数据转换成交互需要的
      getPushAddressData(data,id,type){
        let pushData = {
          contactName: data.name,//联系人
          mobile: data.tel,//手机号
          province: data.province,  //省份
          city: data.city,  //城市
          area: data.county,  //区县
          stree: data.address_detail, //详细地址
          desc: "",  //备注
          info: data.province+data.city+data.county+data.address_detail,  //详情 省份城市地区街道 拼接
          user: id //此地址属于哪个用户的标识 为24位用户id
        }
        if (type==="edit") {
          pushData._id = this.addressId
        }
        return pushData;
      },
      //新加地址
      NewAdd(pushData,toast){
        addAddress(pushData)
        .then(res => {
          console.log(res)

          toast.hide()
          const tip = this.$createToast({
            txt: '更新成功!',
            type: 'correct',
            time: 1000
          })
          tip.show()
          this.$emit("addSuccess")
        },(err => {
          console.log(err);
          const tip = this.$createToast({
            txt: '更新失败!',
            type: 'fail',
            time: 1000
          })
          tip.show()
        }))
      },
      //修改地址
      EditAdd(pushData,toast){
        console.log(pushData)
        
        editAddress(pushData)
        .then(res => {
          console.log(res)

          toast.hide()
          const tip = this.$createToast({
            txt: '更新成功!',
            type: 'correct',
            time: 1000
          })
          tip.show()
          this.$emit("addSuccess")
        },(err => {
          console.log(err);
          const tip = this.$createToast({
            txt: '更新失败!',
            type: 'fail',
            time: 1000
          })
          tip.show()
        }))
      },
      async onSave(content) {
        // console.log(content);
        let userData = sessionStorage.getItem("userData");
        userData = JSON.parse(userData);

        let pushData = this.getPushAddressData(content,userData._id,this.type);
        console.log();

        const toast = this.$createToast({
          time: 0,
          txt: '正在更新'
        })
        toast.show();

        console.log(this.pushData)


        //更新需要进行的操作
        
        if (this.type==="new") {
          this.NewAdd(pushData,toast);
        }else if(this.type==="edit"){
          this.EditAdd(pushData,toast);
        }
      },
      //点击删除弹窗
      popupChose(){
        this.popupshow = !this.popupshow;
      },
      //取消删除地址
      popupChoseNO(){
        this.popupshow = !this.popupshow
      },
      //删除地址
      popupChoseYES(){
        const toast = this.$createToast({
          time: 0,
          txt: '正在删除'
        })
        toast.show();

        delAddress(this.addressId)
        .then(res => {

          toast.hide()
          const tip = this.$createToast({
            txt: '删除成功!',
            type: 'correct',
            time: 1000
          })
          tip.show()
          this.$emit("addSuccess")
        },(err => {
          console.log(err);
          const tip = this.$createToast({
            txt: '删除失败!',
            type: 'fail',
            time: 1000
          })
          tip.show()
        }))
      },
      onDelete() {
        alert('delete');
      }
    },
    created(){
      this.addressId = this.oldAdd._id;
      this.addressInfo = this.getinfoAddressData(this.oldAdd);
      console.log(this.addressInfo)
    }
  }
</script>

<style scoped>
  .deleteBtn{
    width: 94%;
    padding:0 3vw;
  }
  .deleteBtn button{
    width: 100%;
  }
  .popup{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width: 80%;
    height: 30%;
  }
  .popupBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .popupTitle{
    margin-bottom: 3vh;
  }
  .popupBtn{
    width: 80%;
  }
  .popupBtn button{
    width: 40%;
  }
</style>