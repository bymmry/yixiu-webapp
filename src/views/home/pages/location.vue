<template>
  <div class="position">

    <div class="navBox">
      <a href="#backTop">顶部</a>
      <a v-for="pos in jump" :href="`#${pos}`" >{{ pos }}</a>
    </div>
    
    <div class="position__header">
      <div class="icon" @click="back"></div>
      <sicon name="back" scale="3" color="#676767"></sicon>
      <p class="header__title" >选择城市</p>
    </div>

    <city-title ></city-title>
    
    <cube-scroll class="scroll">
      <spaceCity @pitchOn2="pitchOn2" id="backTop"></spaceCity>
      <div>
        <div v-for="(city, index) in citysData" :key="index">
          <p class="itemKind" :id="city.letter">{{city.letter}}</p>
          <p class="position__item" @click="pitchOn" v-for="(citys, index) in city.data" :key="index">
            {{citys}}
          </p>
        </div>
        <div class="space"></div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import Header from '../components/itemHeader.vue'
  import PositionItem from '../components/positionItem.vue'
  import cityTitle from '../components/itemtitle.vue'
  import spaceCity from '../components/itemSpaceCity.vue'
  // import city from '../data/city.json'
  import city2 from '../data/city2.json'
  import scroll from '../../common/base/scroll'
  export default {
    components: {
      Header,
      PositionItem,
      cityTitle,
      spaceCity,
      scroll
    },
    data () {
      return {
        // citys: [],
        citysData:[],
        jump:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      }
    },
    mounted(){
      // this.citys = city;
      this.citysData = city2
    },
    methods: {
      back () {
        this.$emit('back', true);
      },
      pitchOn: function (e) {
        let currentItem = e.target.innerHTML.trim();
        this.$emit('changeCity', currentItem);
      },
      pitchOn2(item){
        this.$emit('changeCity', item);
      },
      //将中文数组按照首字母顺序排序
      /*
      pySegSort(arr,empty) {
        if(!String.prototype.localeCompare){
          return null;
        }

        var letters = "*abcdefghjklmnopqrstwxyz".split('');
        var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

        var segs = [];
        var curr;
        for(let i in letters){
          curr = {letter: letters[i].toUpperCase(), data:[]};
          for(let j in arr){
            let jx = new String(arr[j])
            
            if((!zh[i-1] || zh[i-1].localeCompare(jx,"zh") <= 0) && jx.localeCompare(zh[i],"zh") == -1) {
                curr.data.push(jx.replace(/"/g,""));
            }
          }
          if(empty || curr.data.length) {
            segs.push(curr);
            curr.data.sort(function(a,b){
              return a.localeCompare(b,"zh");
            });
          }
        }
        return segs;
      }
      */
    },
    created(){

      
    }
  }
</script>

<style scoped>
  .scroll{
    width: 100%;
    height: 77vh;
  }
  .space {
    width: 100%;
    height: 8vh;
  }

.position__item {
  margin-left: 3vw;
  padding-top: 1vh;
  height: 5vh;
  width: 97%;
  font-size: 4.8vw;
  /*font-size: 18px;*/
  border-bottom: 1px solid #eee;
}

.position__header {
	background: #f9f9f9;
	padding: 8px;
  border-bottom: 1px solid #d8d8d8;
	display: flex;
	align-items: center;
  position: relative;
}

.icon {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
}

.header__title {
  color: #626262;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}
.itemKind{
  background: #f4f4f4;
  color: 969696;
  font-size: 4.4vw;
  padding-left: 2.3vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  border-top: 1px solid #d8d8d8;
}
.navBox{
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10vw;
  top: 16.5vh;
  max-height: 74vh;
  right: 0;
  z-index: 100;
  overflow: scroll;
}
.navBox a{
  display: inline-block;
  width: 100%;
  padding-bottom: 2vh;
  font-size: 2vh;
  text-align: center;
  color: rgb(97, 149, 247);
}
</style>
