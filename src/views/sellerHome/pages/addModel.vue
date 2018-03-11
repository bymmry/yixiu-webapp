<template>
  <div class="info">

		<item-header :name="infoName" />

		<div class="info__name">
			<p>品牌名称</p>
			<cube-select
				v-model="model.brandName"
				:options="phoneName"
				@change="nameChange"
			/>
		</div>

		<div class="info__name">
			<p>型号名称</p>
			<cube-select
				v-model="model.name"
				:options="phoneModel"
				@change="modelChange"
			/>
		</div>

		<van-field
			v-model="model.name"
			label="其他型号"
			placeholder="如果没有你想要的型号名,请填写你想要的型号名"
		/>

		<van-field
			v-model="model.desc"
			label="描述"
			placeholder="请输入品牌描述"
		/>

		<van-field
			v-model="model.cover"
			label="封面"
			placeholder="请输入封面地址"
		/>

		<div class="info__name">
			<p>手机颜色</p>
			<cube-select
				v-model="phoneModelColorRes"
				:options="phoneModelColor"
				@change="colorChange"
			/>
		</div>

		<van-field
			v-model="phoneModelColorRes"
			label="其他颜色"
			placeholder="如果没有你想要的颜色,请填写颜色"
			@change="colorChange"
		/>

		<van-button size="large" @click="submit">确认添加</van-button>

	</div>
</template>

<script>
import { Field, Button } from 'vant'
import ItemHeader from '../components/itemHeader'
export default {
  components: {
		[Field.name]: Field,
		[Button.name]: Button,
		ItemHeader
	},
	async mounted () {
		let res = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer/shop/' + this.model.shop);
		res.data.map(item => {
			this.phoneName.push(item.name);
			this.phoneInfo.push(item);
		})
	},
	data () {
		return {
			infoName: '添加手机型号',
			phoneName: [],
			phoneInfo: [],
			phoneModel: [],
			phoneModelAlias: '',
			phoneModelInfo: [],
			phoneModelColor: [],
			phoneModelColorRes: '',
			model: {
				brandName: '',
				name: '',
				alias: '',
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				desc: '',
				cover: '',
				color: [],
				manufacturer: ''
			}
		}
	},
	methods: {
		async nameChange(value, index) {
			this.model['manufacturer'] = this.phoneInfo[ index ]._id;
			let manufacturer = await this.$api.sendData('https://m.yixiutech.com/phone/model/shop/', {shop: this.model.shop, manufacturer: this.model.manufacturer});
			manufacturer.data.map(item => {
				this.phoneModel.push(item.name);
				this.phoneModelInfo.push(item);
			})
		},
		modelChange (value, index) {
			this.model['name'] = value;
			this.phoneModelColor = this.phoneModelInfo[ index ].color;
		},
		colorChange (value) {
			this.model.color.push(this.phoneModelColorRes);
		},
		async submit () {
			let modelRes = await this.$api.sendData('https://m.yixiutech.com/phone/model', this.model);
			if (modelRes.code == 4001) {
				this.prompt(modelRes.errMsg, 'error').show();
				return;	
			}
			this.prompt(modelRes.data, 'success').show();
			this.$router.push('/sellerHome');
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
	margin-top: 20px;
	font-size: 14px;
}

.info__name p {
	width: 90px;
}

.van-button {
	margin-top: 50px;
}

.info__name .cube-select {
	width: 60%;
}
</style>
