<template>
  <div class="position">
    <div class="position__header">
      <div class="icon" @click="back"></div>
      <sicon name="back" scale="3"></sicon>
      <p class="header__title">选择城市</p>
    </div>

    <cube-scroll class="scroll" :data="citys">
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
  import city from '../data/city.json'
  import scroll from '../../common/base/scroll'
  export default {
    components: {
      Header,
      PositionItem,
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
      }
    }
  }
</script>

<style scoped>
  .scroll{
    width: 100%;
    height: 91vh;
  }
  .space {
    width: 100%;
    height: 8vh;
  }

.position__item {
  padding: 5%; 
  width: 90%;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}

.position__header {
	background: #66c6ff;
	padding: 8px;
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
	color: #fff;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}
</style>
