<template>
  <div class="type-container">
    <div class="type">
			<TypeItem 
				v-for="(item, index) in data" 
				:key="index" 
				:name="item.name"
        :icon="item.icon"
				/>
    </div>
  </div>
</template>

<script>
	import TypeItem from './typeItem.vue'
  export default {
    components: {
			TypeItem
    },
    data () {
    	return {
				data: [
          { name: '今日上新', icon: 'shangxin' },
          { name: '手机评测', icon: 'pingce' },
          { name: '配件商城', icon: 'shoujipejian' },
          { name: 'ipad精选', icon: 'ipad' },
          { name: '优惠券', icon: 'youhuiquan' }
        ]
			}
    },
    async mounted () {
      // let res = await this.$ap.get('https://m.yixiutech.com/category/plate/simple');
      // this.data = res.data.slice(0, 4);
    }
  }
</script>

<style scoped>
.type-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.type {
    width: 90%;
    border-radius: 4px;
		justify-content: space-between;
}
</style>