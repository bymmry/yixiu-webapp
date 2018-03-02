<template>
  <div class="myinfo-container">
    <div class="messageTag" v-if="!changedPassword">
      <div class="myinfo-title-container">
        <div class="myinfo-title">个人信息</div>
        <div class="myinfo-title-change" @click="changeMessage('info')" v-if="!changed">修改</div>
        <div class="myinfo-title-change" @click="reMessage('info')" v-if="changed">取消</div>
      </div>
      <div class="row-line"></div>
      <div class="myinfo-message" v-if="!changed">
        <div v-for="(info,index) in userInfoItem " class="myinfo-message-item">
          <div class="myinfo-message-tag">{{ info.name }}</div>
          <div class="myinfo-message-data">{{ userInfo[info.tag] }}</div>
        </div>
      </div>
      <div class="myinfo-message" v-else>
        <div v-for="(info,index) in userInfoItem " class="myinfo-message-item">
          <div class="myinfo-message-tag">{{ info.name }}</div>
          <div class="myinfo-message-data" v-if="info.name==='账号'">{{ userInfo[info.tag] }}</div>
        </div>
        <van-button class="changeBtn" type="primary" @click="changeInfo('info')" >保存</van-button>
      </div>
    </div>

    <div class="messageTag" v-if="!changed">
      <div class="myinfo-title-container">
        <div class="myinfo-title">密码修改</div>
        <div class="myinfo-title-change" @click="changeMessage('pass')" v-if="!changedPassword">修改</div>
        <div class="myinfo-title-change" @click="reMessage('pass')" v-else="changedPassword">取消</div>
      </div>
      <div class="row-line" v-if="changedPassword"></div>
      <div class="myinfo-message" v-if="changedPassword">
        <div>
          <div class="myinfo-message-tag">原密码：</div>
          <input class="myinfo-message-tag" type="text" placeholder="原密码">
        </div>
        <div>
          <div class="myinfo-message-tag">新密码：</div>
          <input class="myinfo-message-tag" type="text" placeholder="新密码">
        </div>
        <div>
          <div class="myinfo-message-tag">再次输入新密码：</div>
          <input type="text" placeholder="再次输入新密码">
        </div>
        <van-button class="changeBtn" type="primary" @click="changeInfo('info')" >保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'vant'
  export default {
    data () {
      return {
        changed: false, //是否正在修改信息
        changedPassword: false,

        //用户信息,可往下继续添加需要的内容
        userInfo:{  
          id: "13368161676",
          // birthday: "1997-02-12",
          // sex: "男"
        },
        //默认信息属性
        userInfoItem:[  
          {
            tag: "id",
            name: "账号"
          },
          // {
          //   tag: "birthday",
          //   name: "生日"
          // },
          // {
          //   tag: "sex",
          //   name: "性别"
          // }
        ]

      }
    },
    components: {
      [Button.name]: Button
    },
    methods: {
      async changeMessage(type){
        if (type==="pass") {
          this.changedPassword = true;
        }else if(type==="info"){
          this.changed = true;
        }
      },
      async reMessage(type){
        if (type==="pass") {
          this.changedPassword = false;
        }else if(type==="info"){
          this.changed = false;
        }
      },
      async changeInfo(type){
        const toast = this.$createToast({
          time: 0,
          txt: '正在更新'
        })
        toast.show();


        //更新需要进行的操作
        
        
        let res = 1

        //
        //

        
        toast.hide()
        if (res) {
          const tip = this.$createToast({
            txt: '更新成功!',
            type: 'correct',
            time: 1000
          })
          toast.show()


          //修改成功后的操作
          //
          //

          //更新成功后修改状态还原到最初的情况
          if (type==="pass") {
            this.changedPassword = false;
          }else if(type==="info"){
            this.changed = false;
          }
        }else {
          const tip = this.$createToast({
            txt: '更新失败!',
            type: 'fail',
            time: 1000
          })
          toast.show()
        }
      }
    }
  }
</script>

<style scoped>
  .myinfo-container{
    height: 100vh;
    padding: 2vh 3vw 5vh 3vw;
    background: rgb(240, 241, 245);
  }
  .messageTag{
    background: #fff;
    padding: 3vh 4vw 4vh 4vw;
    margin-bottom: 4vh;
  }
  .myinfo-title-container{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 2vh;
  }
  .myinfo-title{
    color: #727272;
    font-size: 4vw;
  }
  .myinfo-title-change{
    color: #139bff;
    font-size: 5vw;
  }
  .row-line{
    width: 100%;
    height: 0.3vh;
    margin-top: 4vh;
    margin-bottom: 4vh;
    background: #ecebeb;
  }

  .myinfo-message{
    display: flex;
    flex-direction: column;
  }
  .myinfo-message-item{
    display: flex;
    flex-direction: row;
    
  }
  .myinfo-message-tag{
    margin-right: 3vw;
    margin-bottom: 3vh;
    color: #727272;
  }
  .myinfo-message-data{
    color: #333;
  }
  .changeBtn{
    margin-top: 4vh;
  }

  input[type="text"]{
    box-sizing: border-box;
    text-align: center;
    font-size: 4vw;
    height: 10vw;
    border-radius:4px;
    border:1px solid #c8cccf;
    color:#6a6f77;
    -web-kit-appearance:none;
    -moz-appearance: none;
    display:block;
    outline:0;
    padding:0 1em;
    text-decoration:none;
    width:100%;
  }
  input[type="text"]:focus{
    border:1px solid #ff7496;
  }

</style>