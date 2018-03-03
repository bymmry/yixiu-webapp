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
          {name: '手机维修', icon: 'typePhone'}, 
          {name: '精品手机', icon: 'typeNicePhone'}, 
          {name: '家电维修', icon: 'typeCamera'}, 
          {name: '手机配件', icon: 'typeFixing'}, 
          {name: '企业设备维护', icon: 'typeEquipment'}, 
          {name: '汽车维修', icon: 'typeCar'}, 
          {name: '手机回收', icon: 'typeRecovery'}, 
          {name: '全部分类', icon: 'typeAll'}
        ]
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