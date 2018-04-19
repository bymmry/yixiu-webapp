<template>
  <div class="evaStar">
    <p>您觉得这次维修怎么样？</p>
    <p>商品评分：{{score}}</p>
    <ul class="star">
      <li 
        v-for="(itemClass,index) in itemClasses" 
        :key="index" 
        class="star-item" 
        @click="stars(index)" 
        track-by="index"
      >
        <img :src="itemClass" alt="">
      </li>
      <!--性能优化 track-by 数据不改变时不会重新渲染-->
    </ul>
    <div class="comment">
      <p>请输入评价：</p>
      <textarea v-model="commentDes" placeholder="评价"></textarea>
    </div>
    <div class="buttons">
      <cube-button class="button sure" @click="sureCommon">确认评价</cube-button>
      <cube-button class="button" @click="cancleCommon">取消</cube-button>
    </div>
  </div>
</template>

<script>
  import full from '@/assets/img/comon.png';
  import half from '@/assets/img/comhalf.png';
  import off from '@/assets/img/comoff.png';
  export default {
    data() {
      return {
        score: 4,
        off: off,
        half: half,
        full: full,
        nowStar: null,
        commentDes: ""
      }
    },
    computed: { //计算属性
      itemClasses() {
        let result = []; // 返回的是一个数组,用来遍历输出星星
        let score = Math.floor(this.score * 2) / 2; // 计算所有星星的数量
        let hasDecimal = score % 1 !== 0; // 非整数星星判断
        let integer = Math.floor(score); // 整数星星判断
        for (let i = 0; i < integer; i++) { // 整数星星使用on
          result.push(full); // 一个整数星星就push一个CLS_ON到数组
        }
        if (hasDecimal) { // 非整数星星使用half
          result.push(half); // 类似

        }
        while (result.length < 5) { // 余下的用无星星补全,使用off
          result.push(off);
        }
        return result;
      }
    },
    created(){
      // this.nowStar = off;
    },
    methods: {
      stars: function (index) {
        console.log(index);
        this.score = index + 1
      },
      cancleCommon(){
        this.$emit("closeCommon","close");
      },
      sureCommon() {
        let re =  {
          score: this.score,
          comment: this.commentDes
        }
        this.$emit("closeCommon", re);
      }
    }

  }

</script>

<style>
  .evaStar {
    float: right;
    width: 60vw;
    height: auto;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
  }
  .evaStar p{
    padding: 5px 5px;
  }
  .star {
    padding: 0 5px 10px 0;
    font-size: 0;
  }

  .star-item {
    display: inline-block;
    /* background-repeat: no-repeat; */
    /* width: .6rem; */
    /* height: .6rem; */
    /* margin-left: .27rem; */
    /* background-size: 100%; */
  }
  .star-item img{
    display: inline-block;
    padding: 4px;
    width: 18px;
    height: 18px;
  }
  .comment textarea{
    width: 100%;
    height: 60px;
    border: 1px solid #eee;
  }
  .buttons{
    margin-top: 5vh;
    display: flex;
  }
  .buttons .sure{
    background: #f85;
  }
  .buttons .button{
    margin: 5px;
    flex: 1;
  }


</style>
