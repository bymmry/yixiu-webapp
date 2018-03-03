<template>
  <div class="ticket-item" @click="receive">
		<p class="ticket-item__name">{{ name }}</p>
		<p class="ticket-item__award">{{ award }}</p>
		<p class="ticket-item__name">{{ condition }}</p>
		<p class="ticket-item__date">{{ date }}</p>
	</div>
</template>

<script>
  export default {
    props: {
			name: String,
			award: String,
			condition: String,
			date: String
		},
		methods: {
			async receive () {
				const toast = this.$createToast({
					type: 'correct',
          txt: '领取成功!'
				})
				toast.show();
				let res = await this.$api.hello();
				toast.hide();
			}
		}
	}
</script>

<style scoped>
.ticket-item {
	width: 45%;
	height: 100px;
	border: 1px solid #eee;
	border-radius: 5px;
	box-shadow: rgb(145, 143, 143) 0 0 10px;
	margin: 18px 0;
	text-align: center;
}

.ticket-item p {
	padding: 2px 0;
}

.ticket-item .ticket-item__name {
	font-size: 12px;
}

.ticket-item .ticket-item__award {
	font-size: 16px;
	color: #ffbd5c;
}

.ticket-item .ticket-item__date {
	font-size: 10px;
}
</style>