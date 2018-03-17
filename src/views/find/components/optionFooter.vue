<template>
  <div class="newOption">
      <div class="optionBox">
        <div class="addphotoBox">
          <van-uploader :after-read="onRead" class="addphoto">
            <sicon name="find-addphoto" scale="2.2"></sicon>
          </van-uploader>
        </div>
        <div class="anonymousBox" @click="changeAnonymous">
          <sicon name="find-unselect" scale="2.5" v-if="anonymous===false"></sicon>
          <sicon name="find-select" scale="2.5" color="rgb(68, 219, 94)" v-else></sicon>
          <div>匿名</div>
        </div>

      </div>
      
      
  </div>
</template>

<script>
  import { Uploader,Toast } from 'vant';
  import axios from 'axios'
  // import lrz from "lrz"

  export default {
    data(){
      return {
        anonymous:false,  //匿名
      }
    },
    components: {
      [Uploader.name]: Uploader,
      [Toast.name]: Toast,
    },
    methods: {
      //点击 上传图片
      onRead(file) {
        const toast = Toast.loading({
          mask: true,
          message: '上传中...'
        });

        // lrz(file.file)
        // .then( (rst) => {
        //     // 处理成功会执行
        //     return rst
        // })
        // .catch(function (err) {
        //     // 处理失败会执行
        // })
        // .always(function () {
        //     // 不管是成功失败，都会执行
        // }).then((zphoto)=>{
          let fd = new FormData();
          
          fd.append('file', file.file);

          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          axios.post('https://m.yixiutech.com/upload', fd, config)
          .then(res => {
            if (res.data.data.match(/\.gif/)) {
              this.$emit("addnewphoto", res.data.data);
            }else{
              this.$emit("addnewphoto", res.data.data+"?x-oss-process=image/quality,q_80");
            }
            const tip = Toast.success('上传成功');
            toast.clear();
          })
      },
      //更改 是否匿名
      changeAnonymous(){
        this.functionunavailable();
        // this.anonymous = !this.anonymous;
        // this.$emit("changeanonymous",this.anonymous)
      },

    }
  }
</script>

<style scoped>
  .newOption{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:flex-end;
    width: 94%;
    height: 27px;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .optionBox{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .anonymousBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.9vh 2vw;
    border-radius: 3px;
  }
  .anonymous{
    color: #0086ff
  }
  .addphotoBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 40px;
  }
  .addphoto{
    display: flex;
    align-items: center;
    justify-content: center;
    /*width:40px; */
    height: 100%;
  }
</style>