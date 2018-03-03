<template>
	<div class="hot">
		<p class="hot__title">新用户专区</p>
		<div class="hot__content">
			<type-item
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
				data: ['电池电源', '屏幕问题', '摄像头问题', '声音问题', '按键问题', '外壳边框', '信号|有线|无线', '全部服务']
			}
		}
	}
</script>

<style scoped>
.hot {
	width: 100%;
	text-align: center;
}
.hot__content {
	width: 90%;
	display: inline-block;
	border: 2px solid #eee;
	border-radius: 4px;
}
</style>