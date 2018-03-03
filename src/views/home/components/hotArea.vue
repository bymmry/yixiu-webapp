<template>
	<div class="hot">
		<p class="hot__title">新用户专区</p>
		<div class="hot__content">
			<type-item
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
					{name: '电池电源', icon: 'hotBattery'}, 
					{name: '屏幕问题', icon: 'hotScreen'}, 
					{name: '摄像头问题', icon: 'hotCamera'}, 
					{name: '声音问题', icon: 'hotSound'}, 
					{name: '按键问题', icon: 'hotKeyBoard'}, 
					{name: '外壳边框', icon: 'hotHull'}, 
					{name: '信号|有线|无线', icon: 'hotWire'}, 
					{name: '全部服务', icon: 'hotAll'}
				]
			}
		}
	}
</script>

<style scoped>
.hot {
	width: 100%;
	text-align: center;
	margin-top: 20px;
}
.hot__content {
	width: 90%;
	display: inline-block;
}
</style>