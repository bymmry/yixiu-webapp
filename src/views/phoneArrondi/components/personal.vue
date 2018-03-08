<template>
	<div class="personal">
		<img :src="src" alt="" srcset="" class="personal__img" />
		<div class="personal__msg">
			<p>我是大表哥</p>
			<p><span>30分钟前来过</span> <span>发布于杭州</span> </p>
		</div>
	</div>
</template>

<script>
export default {
  data () {
		return {
			src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3146109938,3614262430&fm=27&gp=0.jpg',
		}
	}
}
</script>

<style scoped>
.personal {
	width: 92%;
	padding: 4%;
	display: flex;
	align-items: center;
	border-bottom: 1px solid gray;
}

.personal .personal__img {
	width: 60px;
	height: 60px;
	border-radius: 50%;
}

.personal .personal__msg {
	margin-left: 20px;
}

.personal .personal__msg p:nth-child(1) {
	font-size: 16px;
}

.personal .personal__msg p:nth-child(2) {
	font-size: 14px;
	color: gray;
}
</style>
