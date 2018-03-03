<template>
  <div class="type-container">
    <div class="type">
			<TypeItem 
				v-for="(name, index) in data" 
				:key="index" 
				:name="name"
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
				data: ['手机维修', '精品手机', '家电维修', '手机配件', '企业设备维护', '汽车维修', '手机回收', '全部分类']
			}
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