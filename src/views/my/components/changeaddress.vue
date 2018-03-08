<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
  //vant
  import { AddressEdit } from 'vant';
  import areaList from './data/area.json'

  export default {
    data() {
      return {
        areaList,
        addressInfo:{
          name:"",  //收货人
          tel:"",   //电话
          province:"",  //省份
          city:"",    //城市
          county:"",  //区县
          address_detail:"",  //详细地址
          postal_code:"",   //邮政编码
          is_default:"" //是否为默认地址
        }
      }
    },
    props: {
      oldAdd: {
        type:Object
      }
    },
    components: {
      [AddressEdit.name]: AddressEdit,
    },
    methods: {
      async onSave(content) {
        console.log(content);
        const toast = this.$createToast({
          time: 0,
          txt: '正在更新'
        })
        toast.show();


        //更新需要进行的操作
        
        
        let res = 1

        
        toast.hide()
        if (res) {
          const tip = this.$createToast({
            txt: '更新成功!',
            type: 'correct',
            time: 1000
          })
          toast.show()

        }else {
          const tip = this.$createToast({
            txt: '更新失败!',
            type: 'fail',
            time: 1000
          })
          toast.show()
        }
      },
      onDelete() {
        alert('delete');
      }
    },
    created(){
      this.addressInfo = this.oldAdd;
    }
  }
</script>

<style scoped>
  
</style>