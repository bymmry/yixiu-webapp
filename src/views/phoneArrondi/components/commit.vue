<template>
  <div class="commit-box">
		<p>机友评价</p>
		<div class="commit">
			<p class="commit__head">
				<span class="commit__user">
					<sicon name="user" scale="2.4"></sicon>
					18883994599	
				</span>
				<span>2018-3-20</span>
			</p>
			<p class="commit__desc">看不出是二手的，很赞</p>
			<div class="commit__img">
				<img src="" alt="" />
			</div>
			<p class="commit__desc">购买商品: 95新 iPhone 7 128G金</p>
		</div>
	</div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.commit-box {
	width: 100%;
}

.commit {
	padding: 4%;
	border-bottom: 1px solid #eee;	
}

.commit p {
	padding: 1% 0;
}

.commit__head {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.commit__desc {
	font-size: 12px;
}

.commit__user {
	display: flex;
	align-items: center;
}

.commit__img {
	width: 100%;
}
</style>
