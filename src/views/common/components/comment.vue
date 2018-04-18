<!-- 评论 -->
<template>
  <div class="comment">
    <div class="commentDes" v-if="userData.length == comment.length" v-for="(item, index) in comment" :key="index">
      <div class="user">
        <div class="img">
          <img :src="userData[index].header" alt="">
        </div>
        <div class="info">
          <p class="name">{{userData[index].name}}</p>
          <p class="score">评分：{{item.score}}</p>
        </div>
      </div>
      
      <p class="commentP">{{item.comment}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: []
    };
  },
  props: {
    comment: Array
  },

  components: {},

  created(){
    console.log(this.comment);
    if(this.comment.length != 0){
      this.comment.map(item => {
        let req = {
          collection: "User",
          _id: item.user
        }
        this.getUserData(req);
      })
    }
  },
  methods: {
    async getUserData(req){
      let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
      if(res.code == 200){
        res.data.map(item => {
          let user = {
            header: item.wx.headimgurl,
            name: item.wx.nickname
          }
          this.userData.push(user);
        })
      }
    }
  }
}

</script>

<style scoped>
.comment{
  width: 100%;
  height: auto;

}
.comment .commentDes{
  width: 100%;
  height: auto;
  padding: 10px;
  border-bottom: 5px solid #eee;
}
.comment .commentDes .user{
  width: auto;
  height: 40px;
}
.comment .commentDes .user .img{
  float: left;
  /* display: inline-block; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  
}
.comment .commentDes .user .img img{
  width: 40px;
  height: 40px;
}
.comment .commentDes .user .info{
  float: left;
  /* display: inline-block; */
  margin-left: 15px;
  width: auto;
  height: 40px;
}
.comment .commentDes .user .info p{
  display: block;
  font-size: 10px;
  height: 50%;
  line-height: 20px;
}
.comment .commentDes p.commentP{
  line-height: 25px;
  font-size: 13px;
}
</style>