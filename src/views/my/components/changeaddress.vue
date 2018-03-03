<template>
  <div>
    <van-address-edit
      :area-list="areaList"
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
    }
  }
</script>

<style scoped>
  
</style>