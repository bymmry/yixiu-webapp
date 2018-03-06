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
				data: []
			}
    },
    mounted () {
      this.$ajax.get('https://m.yixiutech.com/category/plate/simple')
        .then(response => {
          console.log(response);
          this.data = response.data.slice(0, 4)
        }).catch(error => {
          console.log(error)
        })
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