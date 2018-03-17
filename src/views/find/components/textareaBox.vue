<template>
  <!-- <div class="edit-div"
     v-html="innerText"
     :contenteditable="true"
     @focus="isLocked = true"
     @blur="isLocked = false"
     @input="changeText">
  </div> -->
  <div>
    <textarea class="inputTextarea" placeholder="请输入问题描述" v-model="text" @input="changeInputText">
    </textarea>

    <div class="line"></div>
    <div class="imgTip">上传的图片：</div>
    
    <div class="imgArea">
      <div v-for="url in imgs" @click="bigphoto(url)" v-if="url">
        <img :src="url">
      </div>
      <!-- <img v-for="img in imgs" src="img"> -->
    </div>
  <seebigphoto v-if="bigImgUrl!==''" :imgurl="bigImgUrl" @closeimg="closeimg" @delimg="delimg"></seebigphoto>
  

  </div>
</template>

<script>
  //vant
  import { Toast } from 'vant';
  import seebigphoto from "../../common/components/seeBigPhoto"
  export default {
    props: {
      imgs: Array
      // value:{
      //   type: String,
      //   default: ''
      // },
      // canEdit: {
      //   type: Boolean,
      //   default: true
      // }
    },
    data(){
      return{
        bigImgUrl:"",
        text:"",
        // innerText: this.value,
        // isLocked: false
      }
    },
    components: {
      seebigphoto,
      [Toast.name]:Toast
    },
    watch: {
      // 'value'(){
      //   if (!this.isLocked || !this.innerText) {
      //     this.innerText = this.value;
      //   }
      // }
    },
    methods: {
      changeInputText(){
        // console.log(this.text)
        this.$emit("input", this.text)
      },
      closeimg(){
        this.bigImgUrl = "";
      },
      bigphoto(url){
        // console.log(url)
        this.bigImgUrl = url;
      },
      delimg(){
        for(let ind in this.imgs){
          if (this.bigImgUrl == this.imgs[ind]) {
            this.bigImgUrl = "";
            delete this.imgs[ind];
            Toast.success('删除成功');
          }
        }
      }
      // changeText(){
      //   this.$emit('input', this.$el.innerHTML);
      // }
    }
  }
</script>

<style scoped>
  .inputTextarea{
    width: 100%;
    /*height: 100%;*/
    min-height: 40vh;
    font-size: 14px;
    margin-top: 17px;
    line-height: 16px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    background: transparent;
    border: 0;
    z-index: 10;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
  .imgArea{
    display: table;
    width: 100%;
    min-height: 10vh;
  }
  .imgArea div{
    display: table-cell;
    vertical-align: middle;
    display: inline-block;
    max-width: 20%;
    max-height: 10vh;
    margin-left: 2%;
    margin-right: 2%;
    margin-top:5px;
    margin-bottom: 5px;
    overflow: hidden;
  }
  .imgArea >>> img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .line{
    width: 100vh;
    margin-left: -3.9vw;
    margin-top: 10px;
    background: rgb(238, 238, 238);
    height: 2px;
  }
  .imgTip{
    font-size: 3vw;
    margin-top: 10px;
  }


  /*
  .edit-div >>> img{
    max-width: 100%;
    max-height: 40vh; 
  }
  .edit-div {
    width: 100%;
    height: 100%;
    min-height: 60vh;
    font-size: 14px;
    margin-top: 17px;
    line-height: 16px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    background: transparent;
    z-index: 10;
    -webkit-user-select:text;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
  */
</style>