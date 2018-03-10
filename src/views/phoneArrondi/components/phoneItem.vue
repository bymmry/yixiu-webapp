<template>
  <div class="phone" :phone="phone" @click="routeDetail">
		<img :src="cover" class="phone__img" alt="" />
		<div class="phone-msg">
			<p class="phone-msg__name">{{ name }}</p>
			<p class="phone-msg__desc">{{ desc }}</p>
			<p class="phone-msg__price">￥{{ price }}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		cover: String,
		desc: String,
		price: Number,
		phone: String
	},
  data () {
		return {

		}
	},
	methods: {
		routeDetail () {
			this.$router.push('/phoneDetail/' + this.phone);
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
	font-size: 20px;
}

.phone-msg .phone-msg__desc {
	padding: 2px 0;
	font-size: 14px;
}

.phone-msg .phone-msg__price {
	padding: 5px 0;
	font-size: 20px;
	color: red;
}
</style>
