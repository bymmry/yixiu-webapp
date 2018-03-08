<template>
	<div class="type" :link="link" @click="skip">
		<sicon :name="icon" scale="4"></sicon>
		<p>{{ name }}</p>
		<sicon name="right" scale="3"></sicon>
	</div>
</template>

<script>
export default {
  props: {
		name: String,
		icon: String,
		link: String
	},
	methods: {
		skip () {
			this.$router.push(this.link);
		}
	}
}
</script>

<style scoped>
.type {
	width: 96%;
	display: flex;
	align-items: center;
	padding: 2%;
	border-bottom: 2px solid #ffbd5c;
}

.type p {
	flex: 1;
	margin-left: 20px;
}
</style>
