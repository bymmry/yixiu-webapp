<template>
  <div class="phone" @click="routeDetail">
		<img :src="data.cover" class="phone__img" alt="" />
		<div class="phone-msg">
			<p class="phone-msg__name">{{ data.name }} {{ data.info ? data.info.productParam.storage : null }} {{ data.info ? data.info.productParam.color : null }}</p>
			<p class="phone-msg__desc">{{ data.desc }}</p>
			<p class="phone-msg__price"> <span>￥{{ data.price }}</span> <span>￥{{ data.info ? data.info.primeCost : null }}</span> </p>
			<P class="save"> <span>省 {{ data.info ? ( data.info.primeCost - data.price ) : null }}</span> </P>
		</div>
	</div>
</template>

<script>
export default {
	mounted () {
		console.log(this.data);
	},
	props: {
		data: Object
	},
  data () {
		return {

		}
	},
	methods: {
		routeDetail () {
			sessionStorage.setItem('detail', JSON.stringify(this.data));
			this.$router.push('/phoneDetail');
		}
	}
}
</script>

<style scoped>
.phone {
	display: flex;
	align-items: center;
	padding: 4%;
	border-bottom: 1px solid gray;
}

.phone .phone__img {
	width: 100px;
	height: 100px;
}

.phone .phone-msg {
	margin-left: 20px;
}

.phone-msg .phone-msg__name {
	padding: 5px 0;
	font-size: 16px;
	font-weight: bold;
}

.phone-msg .phone-msg__desc {
	padding: 2px 0;
	font-size: 14px;
}

.phone-msg__price span:nth-child(1) {
	padding: 5px 0;
	font-size: 20px;
	color: red;
}

.phone-msg__price span:nth-child(2) {
	padding: 5px 0;
	font-size: 14px;
	color: #000;
	text-decoration: line-through;
}

.save  span {
	padding: 4px 20px;
	color: #fff;
	background: #fe6547;
}
</style>
