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
            @click="showVideo(item, i)"
          ><sicon name="action" scale="1.3"></sicon><span>{{index}}-{{i+1}}&nbsp;{{item.name}}</span>
          <div class="video">
            <video ref="video">
              <source :src="item.url" type="video/mp4" />
            </video>
          </div>
          </li>
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
      isShowVideoDes: false,
      videoSrc: ""
    };
  },

  components: {},
  props: {
    name: String,
    claId: String,
    train: String,
    index: Number,
    state: String,
    isfree: {
      type: Boolean,
      default: false
    }
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
      }
      
    },
    showVideo(item, i){
      if(this.state == "hasBuy" || this.isfree){
        console.log(item, i);
        let player = this.$refs.video[i];
        this.videoSrc = item.url;
        if(this.videoSrc != ""){
          const toast = this.$createToast({
            txt: '视频加载中，请稍候...',
            type: 'loading',
            time: 5000
          });
          toast.show();
          player.play();
          player.onloadedmetadata = () => {
            console.log("play")
            toast.hide();
          }
          player.error = () => {
            this.$toast("视频加载失败，请点击重新加载");
          }
          
        }
      }else{
        this.$toast("请先购买此视频");
      }
      
      
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
  height: auto;
  line-height: 30px;
  color: #777;

}
.classChapterDes > ul > li >ul {
  width: auto;
}
.classChapterDes > ul > li > ul >li {
  height: 30px;
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
.video{
  width: 100%;
  height: 0px;
  overflow: hidden;
}
.video video{
  width: 100%;
  height: 0px;
}
</style>