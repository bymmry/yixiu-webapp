<template>
	<div class="info">
		<item-header :name="infosName" @backParent="back" />

		<van-field
			v-model="qualityParam.name"
			label="工程师姓名"
			placeholder="请输入质检工程师姓名"
		/>

		<van-field
			v-model="qualityParam.academicTitle"
			label="职称名称"
			placeholder="请输入职称名称"
		/>

		<van-field
			v-model="qualityParam.agency"
			label="质检地址"
			placeholder="请输入质检地址"
		/>
		
		<van-field
			v-model="qualityParam.number"
			label="质检数量"
			placeholder="请输入质检数量"
		/>

		<van-field
			v-model="qualityParam.sum"
			label="质检结论"
			placeholder="请输入质检结论"
		/>

		<van-button class="btn" size="large" @click="submit">确认添加</van-button>

	</div>
</template>

<script>
import itemHeader from './itemHeader'
import { Field, Button, Toast } from 'vant'
import selects from './select'
export default {
	methods: {
		submit () {
			this.$emit('addQualityInfos', this.qualityParam);
		},
		back () {
			this.$emit('backToPublish', true)
		}
	},
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		itemHeader,
		selects
	},
  data () {
		return {
			infosName: '添加质检数据',
			qualityParam: {
				sum: '',
				name: '',
				academicTitle: '',
				agency: '',
				number: ''
			}
		}
	}
}
</script>

<style scoped>
.info__name {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15px;
	margin-top: 10px;
	font-size: 14px;
}

.info__name p {
	width: 90px;
}

.btn {
	width: 80%;
	display: inline-block;
	color: #fff;
	margin-top: 20px;
	background: #e0620d;
}

.info__name .cube-select {
	width: 60%;
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:space-between;
}
</style>
