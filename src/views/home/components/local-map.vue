<template>
  <div class="position">
    <div id="container"></div> 
    <p class="point-title">如果定位不精确，可手动选择指定地点</p>
    <!-- <p>当前经度：{{ lng }}</p> -->
    <!-- <p>当前维度：{{ lat }}</p> -->
    <p class="point">当前地点：{{ city }}</p>
    <!-- <p>选中经度：{{ nlng }}</p> -->
    <!-- <p>选中维度：{{ nlat }}</p> -->
    <p class="point">选中地点：{{ ncity }}</p>

    <div class="pointbtn">
      <van-button type="default" @click="close">返回</van-button>
      <van-button type="primary" @click="changePoint" :disabled="changed">更改</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
  export default {
    components: {
      [Button.name]:Button
    },
    data () {
      return {
        lng:null,
        lat:null,
        city:"",
        nlng:null,
        nlat:null,
        ncity:"",
        ncityData:"",
        changed:true
      }
    },
    mounted(){
      this.initPosition();
    },
    methods: {
      initPosition(){
        let cityData = JSON.parse(sessionStorage.getItem('nowposition'));
        this.city = cityData.province+cityData.city+cityData.district+cityData.street+cityData.street_number;
        this.lng = localStorage.getItem('lng');
        this.lat = localStorage.getItem('lat');
        var map = new BMap.Map("container");    
        var point = new BMap.Point(this.lng, this.lat);    
        map.centerAndZoom(point, 14);    
        var marker = new BMap.Marker(point);        // 创建标注    
        map.addOverlay(marker);  
        marker.setAnimation(BMAP_ANIMATION_DROP)
        var geoc = new BMap.Geocoder();

        var point2,marker2;
        map.addEventListener("touchend", (e) =>{
          this.changed = false;
          map.removeOverlay(marker2);
          this.nlng = e.point.lng;
          this.nlat = e.point.lat;
          point2 = new BMap.Point(this.nlng, this.nlat);  
          marker2 = new BMap.Marker(point2);        // 创建标注    
          map.addOverlay(marker2);  

          var pt = e.point;
          geoc.getLocation(pt, (rs)=>{
            var addComp = rs.addressComponents;
            this.ncityData = addComp;
            this.ncityData.street_number = addComp.streetNumber;
            delete this.ncityData.streetNumber;
            this.ncity = addComp.province+addComp.city+addComp.district+addComp.street+addComp.street_number;
          });

        });
      },
      close(){
        this.$emit("close")
      },
      changePoint(){
        localStorage.setItem('lng',this.nlng);
        localStorage.setItem('lat',this.nlat);
        sessionStorage.setItem('nowposition', JSON.stringify(this.ncityData));
        this.$emit("close")
      }
    },
    created(){  
    }
  }
</script>

<style scoped>
 .position{
  position: absolute;
  width: 100%;
  height: 85vh;
  top: 0;
  margin-left: -4vw;
  background: #fff;
  z-index: 100;
 }
 #container{
  width:100%;
  height:50vh;
 }
 .bm-view {
  width: 100%;
  height: 300px;
  z-index: 100;
}
.point-title{
  text-align: center;
  margin-top: 10px;
  padding-bottom: 9px;
  font-weight: 700;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
}
.point{
  margin-bottom: 5px;
  padding-left: 4vw;
}
.pointbtn{
  width: 100%;
  margin-top: 20px;
}
.pointbtn button{
  width: 40vw;
  margin-left: 5vw;
}
</style>
