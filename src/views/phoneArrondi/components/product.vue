<template>
	<div class="product">
		<p class="title">详细参数</p>
		<div class="item" v-for="(item, index) in data" :key="index">
			<p class="item__title">{{item.itemName}}</p>
			<p class="item__content" v-for="(contentItem, contentIndex) in item.content" :key="contentIndex"> 
				<span class="content__name">{{contentItem.name}}</span>
				<span class="content__value">{{contentItem.value}}</span> 
			</p>
		</div>
		<div class="quit" @click="back">
			<sicon name="quit" scale="5"></sicon>
		</div>
	</div>
</template>

<script>
import parameter from '../data/parameter.json'
export default {
  data () {
		return {
			data: parameter
		}
	},
	methods: {
		back () {
			this.$emit('backDetail', true);
		}
	}
}
</script>

<style scoped>
.product {
	width: 100%;
	position: relative;
}

.title {
	text-align: center;
}

.item {
	width: 92%;
	padding: 4%;
}

.item .item__title {
	font-size: 16px;
	color: #13D1BE;
}

.item .item__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2% 0;
}

.quit {
	position: absolute;
	left: 50%;
	transform: translate(-50%);
}
</style>
