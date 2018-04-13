<template>
  <div class="position">
    <div class="position__header">
      <div class="icon" @click="back"></div>
      <sicon name="back" scale="3" color="#676767"></sicon>
      <p class="header__title">选择城市</p>
    </div>

    <city-title></city-title>

    <cube-scroll class="scroll" :data="citys">

    <spaceCity @pitchOn2="pitchOn2"></spaceCity>

    
      <div>
    <p class="position__item" @click="pitchOn" v-for="(city, index) in citys" :key="index">
      {{city}}
    </p>

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
  import city from '../data/city.json'
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
        citys: []
      }
    },
    mounted(){
      this.citys = city;
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
      }
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
  font-size: 18px;
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
</style>
