<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <!-- 用户看到的个人信息 -->
    <div class="messageTag" v-if="!changedPassword">
      <!-- 信息标题 -->
      <div class="myinfo-title-container">
        <div class="myinfo-title">个人信息</div>
        <div class="myinfo-title-change" @click="changeMessage('info')" v-if="!changed">修改</div>
        <div class="myinfo-title-change" @click="reMessage('info')" v-if="changed">取消</div>
      </div>
      <div class="row-line"></div>
      <!-- 个人信息详细部分 -->
      <div class="myinfo-message" v-if="!changed">
        <div v-for="(info,index) in userInfoItem " :key="index" class="myinfo-message-item">
          <div class="myinfo-message-tag textright">{{ info.name }}</div>
          <div class="myinfo-message-data">{{ userInfo[info.tag] }}</div>
        </div>
      </div>

      <!-- 用户修改个人信息 -->
      <div class="myinfo-message" v-else>
        <div v-for="(info,index) in userInfoItem " :key="index" class="myinfo-message-item">
          <div class="myinfo-message-tag textright">{{ info.name }}</div>

<!--      ID、生日、性别的判断  
          <div class="myinfo-message-data" v-if="info.name==='账号'">
            {{ userInfo[info.tag] }} 
            <van-tag class="myinfo-tag">不可更改</van-tag>
          </div>
          <div class="myinfo-message-data myinfo-choseDay" v-else-if="info.name==='生日'" @click = "changeBirthday">
            {{ newbir }}
          </div>
          <div class="myinfo-message-data myinfo-choseSex" v-else-if="info.name==='性别'">
            <van-radio name="man" v-model="radio" class="myinfo-choseSex-item">男</van-radio>
            <van-radio name="woman" v-model="radio">女</van-radio>
          </div>
 -->          

          <!-- <div class="myinfo-message-data" v-else> -->
          <div class="myinfo-message-data">
            <input type="text" v-model="newuserInfo[info.tag]">
          </div>

        </div>
        <div class="bindphoneOK" v-if="bindOK">绑定成功</div>
        <van-button size="small" :disabled="LoadinggetMessaga" @click="getmessage" class="getmessageBtn">{{ getMessaga }}</van-button>

        <div v-if="bindphoneShow">
          <div class="myinfo-message-item">
            <div class="myinfo-message-tag textright">验证码：</div>
            <div class="myinfo-message-data">
              <input type="text" v-model="Etag">
            </div>
            <div class="bindphoneErr" v-if="errCode">验证码错误</div>
          </div>
          <van-button size="small" @click="bindphone" type="primary" class="getmessageBtn">绑定手机号</van-button>
        </div>
        
        <van-button class="changeBtn" type="primary" @click="changeInfo('info')" :disabled="updataBtnShop">保存</van-button>
      </div>
    </div>

<!-- 修改密码 -->
  <!--
      <div class="messageTag" v-if="!changed">
        <div class="myinfo-title-container">
          <div class="myinfo-title">密码修改</div>
          <div class="myinfo-title-change" @click="changeMessage('pass')" v-if="!changedPassword">修改</div>
          <div class="myinfo-title-change" @click="reMessage('pass')" v-else="changedPassword">取消</div>
        </div>
        <div class="row-line" v-if="changedPassword"></div>
        <div class="myinfo-message" v-if="changedPassword">
  -->
          <!-- 输入原密码 -->
  <!--
          <div>
            <div class="myinfo-message-tag myinfo-pass-margin">
              原密码： 
              <van-tag 
                v-if="password[0].oldPasswordHint === '密码错误'" 
                type="danger" 
                class="myinfo-tag"
              >{{ password[0].oldPasswordHint }}</van-tag>
            </div>
            <input 
              class="myinfo-message-tag myinfo-pass-margin" 
              type="password" 
              placeholder="原密码" 
              v-model="password[0].oldpassword"
            >
          </div>
  -->
          <!-- 输入新密码 -->
  <!--
          <div>
            <div class="myinfo-message-tag myinfo-pass-margin">新密码：</div>
            <input 
              class="myinfo-message-tag myinfo-pass-margin" 
              type="password" 
              placeholder="新密码"
              v-model="password[1].newPassword"
            >
          </div>
  -->
          <!-- 再次输入新密码 -->
  <!--
          <div>
            <div class="myinfo-message-tag myinfo-pass-margin">
              再次输入新密码： 
              <van-tag 
                v-if="password[0].oldPasswordHint === '两次密码不相符'" 
                type="danger" 
                class="myinfo-tag"
              >{{ password[1].reNewPasswordHint }}</van-tag>
            </div>
            <input type="password" placeholder="再次输入新密码" v-model="password[1].reNewPassword">
          </div>

          <van-button class="changeBtn" type="primary" @click="changeInfo('info')" >保存</van-button>
        </div>
  -->

    <!-- </div> -->
    <cube-button @click="loginOut">退出登录</cube-button>
  </div>

</template>

<script>
  import { NavBar,Button,Area,Radio,Tag } from 'vant';
  import { getuserinforByopenId, updateuserinfo, sendmessage, validatemessage } from '../../../common/api'

  export default {
    data () {
      return {
        errCode:false,
        bindOK:false,
        bindphoneShow: false,
        LoadinggetMessaga: false,
        theTime:60,
        getMessaga: "点击获得手机验证码",
        updataBtnShop: true,
        Etag:"",
        changed: false, //是否正在修改信息
        changedPassword: false, //是否正在修改密码
        radio: "",  //心性别选择
        newbir: "",    //新生日选择
        //修改密码时的内容
        password: [
          {
            oldPasswordHint: "",    //旧密码提示，  密码错误
            oldpassword: null     //输入的旧密码
          }, 
          {
            newPassword: null,   //输入的新密码
            reNewPasswordHint: "",    //再次输入新密码提示    两次密码不相符
            reNewPassword: null   //再次输入的新密码
          }
        ],
        id: 0,
        //更新时用于存储数据
        newuserInfo:{  
          email: "",
          mobile: "",
          name: "",
        },
        //用户信息,可往下继续添加需要的内容
        userInfo:{  
          email: "",
          mobile: "",
          name: "",
        },
        //默认信息属性
        userInfoItem:[  
          {
            tag: "name",
            name: "昵称："
          },
          {
            tag: "email",
            name: "邮箱："
          },
          {
            tag: "mobile",
            name: "手机号："
          },
        ]
      }
    },
    components: {
      [Button.name]: Button,
      [NavBar.name]: NavBar,
      [Area.name]: Area,
      [Radio.name]: Radio,
      [Tag.name]: Tag,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      //绑定手机号
      bindphone(){
        if (!this.Etag) {
          alert("请输入验证码");
        }else{
          let a = {
            mobile: this.newuserInfo.mobile,
            code:this.Etag
          }
          validatemessage(a)
          .then(res => {
            console.log(res);
            if (res.errMsg=="验证码错误") {
              this.errCode = true;
            }else if(res.data=="验证成功"){
              this.bindphoneShow = false;
              this.errCode = false;
              this.bindOK = true;
              this.updataBtnShop = false;
            }
            
          },(err => {
            console.log(err);
          }))
        }
      },
      //获取短信
      getmessage(){
        if (!this.newuserInfo.mobile) {
          alert("手机号不能为空");
        }else if(this.mobileReg(this.newuserInfo.mobile)==false){
          alert("请输入正确的手机号");
        }else{
          this.Etag = "";
          let a = {
            mobile: this.newuserInfo.mobile
          }
          sendmessage(a)
          .then(res => {
            console.log(res)
            this.bindOK = false;
            this.bindphoneShow = true;
            this.LoadinggetMessaga = true;
            this.getMessaga = `${this.theTime}秒后重新发送`
            let inter = setInterval(() => {
              this.theTime -= 1;
              this.getMessaga = `${this.theTime}秒后重新发送`
              if (this.theTime == 0) {
                this.getMessaga = "重新获取验证码";
                this.LoadinggetMessaga = false;
                clearInterval(inter)
                this.theTime = 60;
              }
            },1000);
          },(err => {
            console.log(err);
          }))
        }
      },
      //修改个人信息、密码
      async changeMessage(type){
        if (type==="pass") {
          this.changedPassword = true;
        }else if(type==="info"){
          if (this.userInfo.mobile != "") {
            this.updataBtnShop = false;
          }
          this.changed = true;
          this.radio = this.userInfo.sex === "男"? "man" : "woman",
          this.newbir = this.userInfo.birthday;
          this.newuserInfo = this.copy(this.userInfo);
        }
      },
      //取消修改个人信息、密码
      async reMessage(type){
        if (type==="pass") {
          this.changedPassword = false;
        }else if(type==="info"){
          this.changed = false;
          // this.radio = this.userInfo.sex === "男"? "man" : "woman"
          for(let item in this.newuserInfo){
            this.newuserInfo[item] = "";
          }
        }
      },
      //修改生日
      changeBirthday(){
        var nowyear = new Date().getFullYear();
        console.log(nowyear)
        this.$calendar.show({
          year: [nowyear-120,nowyear],  //年份的范围,如果初始化的年份不在这个范围，会自动选最小的年份
          endTime: '2020-2-12',  //终止的日期，这个要在year的范围里面，不然没用
          date: this.userInfo.birthday,  //初始化的日期
          onOk: (date) =>{
            this.newbir = date
          },
          onCancel:()=>{}
        });
      },
      //更新
      async changeInfo(type){
        let newData = {};
        for(let val in this.newuserInfo){
          if (this.newuserInfo[val] !== this.userInfo[val]) {
            newData[val] = this.newuserInfo[val]
          }
        }

        if (JSON.stringify(newData) === "{}") {
          const toast = this.$createToast({
            txt: '没有填写新的信息',
            type: 'fail',
            time: 1300
          })
          toast.show()
        }else{
          //判断邮箱是否更改
          if (newData.email) {
            let rightEmail = this.emailReg(newData.email);
            //判断邮箱格式是否正确
            if(rightEmail == false){
              const toast = this.$createToast({
                txt: '邮箱格式不对!',
                type: 'fail',
                time: 1300
              })
              toast.show()
              return ;
            }
          }
          //判断手机号是否更改
          if(newData.mobile){
            let rightMobile = this.mobileReg(newData.mobile);
            //判断手机号格式是否正确
            if(rightMobile == false){
              const toast = this.$createToast({
                txt: '手机号格式不对!',
                type: 'fail',
                time: 1300
              })
              toast.show()
              return ;
            }
          }
          newData._id = this.id;
          // newData.wx = {};
          // newData.wx.openid = this.openid;
          console.log(newData)

          

          /*  在用上生日和性别后 
          const newData = {
            id: this.userInfo.id,
            birthday: this.newbir,
            sex: this.radio === "man" ? "男" : "女"
          }
          */

          const toast = this.$createToast({
            time: 0,
            txt: '正在更新'
          })
          toast.show();


          //更新需要进行的操作
          //传递的新数据
          updateuserinfo(newData)
          .then(res => {
            toast.hide()
            const tip = this.$createToast({
              txt: '更新成功！重新登录后生效！',
              type: 'correct',
              time: 1300
            })
            tip.show();

            this.userInfo = this.copy(this.newuserInfo);

            console.log(res);
            console.log(this.userInfo)
            console.log(this.newuserInfo)

            // this.userInfo.sex = this.radio === "man" ? "男" : "女";
            // this.userInfo.birthday = this.newbir;
            //更新成功后修改状态还原到最初的情况
            setTimeout(() => { this.reMessage(type); }, 1800);
          },(err => {
            const tip = this.$createToast({
              txt: '更新失败!',
              type: 'fail',
              time: 1000
            })
            tip.show()
          }))
        }
      },
      //获取用户信息
      async getUserinfo(userData){
        getuserinforByopenId(userData.wx.openid)
        .then(res => {
          this.userInfo.email = res.data.email || "";
          this.userInfo.mobile = res.data.mobile || "";
          this.userInfo.name = res.data.name;
          this.id = res.data._id;
        },(err => {
          console.log(err);
        }))
      },
      loginOut(){
        this.$router.push("/userlogin");
      }
    },
    created() {
      let userData = this.getUserInfo();
      // console.log(userData);
      // alert(JSON.stringify(userData));
      this.userInfo.email = userData.email || "";
      this.userInfo.mobile = userData.mobile || "";
      this.userInfo.name = userData.wx.nickname;
      this.id = userData._id;
      // this.getUserinfo(userData);
    }
  }
</script>

<style scoped>
  .myinfo-container{
    min-height: 90vh;
    padding: 2vh 3vw 5vh 3vw;
    background: #fff;
    
  }
  .topblank{
    margin-top: 45.6px;
  }
  .messageTag{
    border: 0.1px solid rgb(240, 241, 245);
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
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .myinfo-message-item{
    position: relative;
    display: flex;
    flex-direction: row;
    margin-bottom: 3vh;
  }
  .myinfo-message-tag{
    min-width: 64px;
    margin-right: 3vw;
    color: #727272;
  }
  .textright{
    text-align: right;
  }
  .myinfo-pass-margin{
    margin-bottom: 3vh;
  }
  .myinfo-message-data{
    min-width: 70%;
    display: flex;
    color: #333;
  }
  .myinfo-message-data input{
    min-width: 80%;
    padding-left: 1vw;
    padding-bottom: 1vh;
    border-bottom: 0.2vw solid #d1d1d1;
  }
  .myinfo-message-data input:focus{
    border-bottom: 0.2px solid rgb(1, 135, 254);
  }
  .getmessageBtn{
    width: 40vw;
    margin-left: 45vw;
    margin-bottom: 3vh;
  }
  .bindphoneOK{
    position: absolute;
    top: 8.3em;
    right: 3em;
    margin-left: 3vw;
    color: #FF5F5F;
    font-size: 3vw;
  }
  .bindphoneErr{
    position: absolute;
    right: 3em;
    margin-left: 3vw;
    color: #FF5F5F;
    font-size: 3vw;
  }
  .myinfo-tag{
    margin-left: 3vw;
  }
  .myinfo-choseDay{
    border-bottom: 0.3px solid #333;
  }
  .myinfo-choseSex{
    display: flex;
    flex-direction: row;
  }
  .myinfo-choseSex-item{
    margin-right: 5vw;
  }
  .changeBtn{
    margin-top: 4vh;
  }

  input[type="password"]{
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
  input[type="password"]:focus{
    border:1px solid #ff7496;
  }
</style>