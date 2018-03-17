<template>
  <div class="position">
    <div class="position__header">
      <div class="icon" @click="back"></div>
      <sicon name="back" scale="3"></sicon>
      <p class="header__title">选择城市</p>
    </div>

    <p class="position__item" @click="pitchOn" v-for="(city, index) in citys" :key="index">
      {{city}}
    </p>

    <div class="space"></div>
  </div>
</template>

<script>
  import Header from '../components/itemHeader.vue'
  import PositionItem from '../components/positionItem.vue'
  import city from '../data/city.json'
  export default {
    components: {
      Header,
      PositionItem
    },
    data () {
      return {
        citys: city
      }
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
	background: #ffbd5c;
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
