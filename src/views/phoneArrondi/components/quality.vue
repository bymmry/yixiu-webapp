<template>
  <div class="quality">
	  <item-header
			:name="name"
		/>
		<div class="shadow"></div>
		<div class="content">
			<p class="num">
				<span>翼修优品第8888份报告</span>
				<span>No.956541235787</span>
			</p>
			<p class="content__title">{{ data.name }}</p>
			<p class="content__desc">{{ data.info ? data.info.productParam.storage : null }} <span>/容量</span></p>
			<p class="content__desc">{{ data.info ? data.info.productParam.color : null }} <span>/颜色</span></p>
			<p class="content__desc">354*****56 <span>/imei</span></p>
			<p class="content__desc"> {{ data.info ? data.info.productParam.network.join(',') : null }} <span>/网络制式</span></p>
		</div>
		
		<div class="content spec">
			<sicon name="shandian" scale="6"></sicon>
			<div class="desc">
				<p class="desc__title">翼修</p>
				<p class="desc__content">为您的手机保驾护航</p>
			</div>
		</div>

		<div class="content">
			<div class="expert">
				<sicon name="zhijian" scale="3"></sicon>
				<div class="expert__info">
					<p>{{ data.info ? data.info.qualityParam.name : null }}   <span class="info__academic">{{ data.info ? data.info.qualityParam.academicTitle : null }}</span></p>
					<p> <span class="info__address">{{ data.info ? data.info.qualityParam.agency : null }}</span> </p>
					<p>已检测 {{ data.info ? data.info.qualityParam.num : null }} 台机器</p>
				</div>
			</div>
			<div class="content__sum">
				<p class="sum__title">总体质检结论</p>
				<p class="sum__content">{{ data.info ? data.info.qualityParam.sum : null }}</p>
			</div>
		</div>

		<div class="quit" @click="back">
			<sicon name="quit" scale="5"></sicon>
		</div>
	</div>
</template>

<script>
import itemHeader from '../components/header'
export default {
	components: {
		itemHeader
	},
	mounted () {
		this.data = JSON.parse(sessionStorage.getItem('info'))
	},
	data () {
		return {
			name: '质检报告',
			data: {}
		}
	},
  methods: {
		back () {
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped>
.quality {
	width: 100%;
	height: 100%;
	position: relative;
	background: rgb(248, 247, 247);
}

.shadow {
	width: 100%;
	height: 150px;
	position: absolute;
	left: 0;
	top: 46px;
	background: -webkit-linear-gradient(-90deg,rgba(2,181,157,.85) 2%,rgba(22,146,183,.85) 100%);
	z-index: 0;
}

.content {
	width: 82%;
	position: relative;
	margin: 20px auto 10px auto;
	padding: 4%;
	background: #fff;
	z-index: 2;
}

.spec {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.spec .desc {
	margin-left: 10%;
}

.content .num {
	color: gray;
	font-size: 12px;
	display: flex;
	justify-content: space-between;
}

.content .content__title {
	font-size: 26px;
}

.content .content__desc {
	font-size: 14px;
}

.content__desc span {
	color: gray;
}

.desc__title {
	font-size: 20px;
	color: rgba(2,181,157,.85);
}

.desc__content {
	font-size: 10px;
	color: gray;
}

.expert {
	display: flex;
	justify-content: flex-start;
	font-size: 12px;
}

.expert__info {
	margin-left: 10px;
}

.expert__info p {
	padding: 2px 0;
}

.info__academic {
	margin-left: 20px;
}

.info__address {
	color: #fff;
	background: rgba(2,181,157,.85);
	padding: 4px;
}

.content__sum .sum__title {
	font-size: 16px;
	font-weight: bold;
}

.content__sum .sum__content {
	font-size: 14px;
}

.quit {
	position: absolute;
	left: 50%;
	transform: translate(-50%);
}
</style>
