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
  import lrz from "lrz"

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

        console.log(file.file)

        let fd = new FormData();

        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }

        if (file.file.type==="image/gif") {

          fd.append('file', file.file);
          
          axios.post('https://m.yixiutech.com/upload2', fd, config)
          .then(res => {
            console.log(res);
            if (res.data.data.match(/\.gif/)) {
              this.$emit("addnewphoto", res.data.data);
            }else{
              this.$emit("addnewphoto", res.data.data+"?x-oss-process=image/quality,q_80");
            }
            const tip = Toast.success('上传成功');
            toast.clear();
          })
        }else{
          lrz(file.file)
          .then( (rst) => {
              // 处理成功会执行
              return rst;
          })
          .catch(function (err) {
              // 处理失败会执行
          })
          .always(function () {
              // 不管是成功失败，都会执行
          }).then((zphoto)=>{
            console.log(zphoto);

            // var newfile = new File([zphoto], file.file.name,{type:"image/jpeg"});

            // console.log(newfile)
            // console.log(file)

            fd.append('file', zphoto.file);
            // fd.append('name', zphoto.file.name);
            
            axios.post('https://m.yixiutech.com/upload2', fd, config)
            .then(res => {
              console.log(res)
              if (res.data.data.match(/\.gif/)) {
                this.$emit("addnewphoto", res.data.data);
              }else{
                this.$emit("addnewphoto", res.data.data+"?x-oss-process=image/quality,q_80");
              }  
              const tip = Toast.success('上传成功');
              toast.clear();
            })
          })
        }

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
          
          
          // fd.append('file', file.file);

          
          // axios.post('https://m.yixiutech.com/upload2', fd, config)
          // .then(res => {
          //   if (res.data.data.match(/\.gif/)) {
          //     this.$emit("addnewphoto", res.data.data);
          //   }else{
          //     this.$emit("addnewphoto", res.data.data+"?x-oss-process=image/quality,q_80");
          //   }
          //   const tip = Toast.success('上传成功');
          //   toast.clear();
          // })
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
    width: 100%;
    height: 8vh;
    min-height: 50px;
    max-height: 60px;
    padding: 2vh 0vw;
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
    width: 60px;
    padding-left: 2vw;
    margin-left: -10px;
  }
  .addphoto{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px; 
    height: 100%;
    /*margin-left: -10px;*/
  }
</style>