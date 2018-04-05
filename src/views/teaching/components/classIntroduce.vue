<!-- 介绍模块 -->
<template>
  <div class="classIntroduce">
    <div class="des">
      <p>{{introduce}}</p>
    </div>
    <div class="info">
      <div><span>{{type}}</span></div>
      <div><span>{{time}}小时</span></div>
      <div><span>{{number}}人</span></div>
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
    introduce: String,
    type: String,
    time: String,
    number: Number
  },

  components: {},

}

</script>

<style scoped>
.classIntroduce{
  width: 80%;
  height: auto;
  margin: 10px auto;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 6px #d4e5f8;
}
.classIntroduce .des{
  width: 90%;
  margin: 0 auto;
  padding: 0 0 10px 0;
  height: auto;
  border-bottom: 1px solid #f1f5f6;
}
.classIntroduce .des p{
  color: #737373;
  line-height: 30px;
}
.classIntroduce .info{
  display: flex;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #737373;
}
.classIntroduce .info > div{
  flex: 1;
}
.classIntroduce .info > div span{
  font-size: 12px;
}
</style>