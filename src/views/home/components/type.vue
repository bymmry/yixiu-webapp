<template>
  <div class="type-container">
    <div class="type">
			<TypeItem 
				v-for="(item, index) in data" 
				:key="index" 
				:name="item.name"
        :icon="item.fe.icon"
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
          
        ]
			}
    },
    async mounted () {
      let res = await this.$api.getData('https://m.yixiutech.com/category/plate/simple');
      console.log(res.data);
      this.data = res.data;
    }
  }
</script>

<style scoped>
.type-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

.type {
    width: 90%;
    border: 2px solid #eee;
    border-radius: 4px;
		justify-content: space-between;
}
</style>