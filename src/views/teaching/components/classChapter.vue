<!-- 章节模块 -->
import { fadegettracking } from '../../common/api';
<template>
  <div class="classChapterDes">
    <ul>
      <li @click.self="getClassDestail('self')">{{name}}
        <ul 
          v-if="videoDes.length != 0 && isShowVideoDes"
          @click.stop="getClassDestail"
          >
          <li 
            v-for="(item,i) in videoDes"
            :key="i"
            @click="showVideo"
          ><sicon name="action" scale="1.3"></sicon><span>{{index}}-{{i+1}}&nbsp;{{item.name}}</span></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoDes: [],
      isShowVideoDes: false
    };
  },

  components: {},
  props: {
    name: String,
    claId: String,
    train: String,
    index: Number
  },
  methods: {
    async getClassDestail(val){
      if(val == "self"){
        this.isShowVideoDes = !this.isShowVideoDes;
        this.videoDes = [];

        const toast = this.$createToast({
          txt: '加载中'
        })
        toast.show();
        let req = {
          collection: "TrainVideo",
          trainChapter: this.claId,
          train: this.train
        };
        let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
        if(res.code == 200){
          this.videoDes = res.data;
          toast.hide();
        }
        console.log(res);
      }
      
    },
    showVideo(){
      console.log("showVide");
    }
  }
}

</script>

<style scoped>
.classChapterDes {
  width: auto;
  height: auto;
  padding: 10px 0;
}
.classChapterDes > ul{
  width: auto;
  height: auto;
}
.classChapterDes > ul > li{
  /* height: 30px; */
  line-height: 30px;
  color: #777;
}
.classChapterDes > ul > li >ul {
  width: auto;
}
.classChapterDes > ul > li > ul >li {
  padding: 0 20px;
  font-size: 13px;
  color: #4891e4;
}
.classChapterDes > ul > li > ul >li svg{
  vertical-align: middle;
}
.classChapterDes > ul > li > ul >li span{
  vertical-align: middle;
  margin-left: 10px;
}
</style>