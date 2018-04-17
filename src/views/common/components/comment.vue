<!-- 评论 -->
<template>
  <div class="comment">
    <div class="commentDes" v-for="(item, index) in comment" :key="index">
      <p class="score">评分：{{item.score}}</p>
      <p class="commentP">{{item.comment}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
        
      })
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
.comment .commentDes p{
  font-size: 13px;
}
</style>