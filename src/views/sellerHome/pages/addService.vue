<template>
  <div class="info">
		<item-header :name="infoName" />

		<div class="info__name">
			<p>分类名称</p>
			<cube-select
				v-model="categoryName"
				:options="category"
				@change="change"
			/>
		</div>

		<van-field
			v-model="service.name"
			label="服务名称"
			placeholder="请输入服务名称"
		/>

		<van-field
			v-model="service.price"
			label="价格"
			placeholder="请输入服务的价格"
		/>

		<van-field
			v-model="service.cover"
			label="封面链接"
			placeholder="请输入服务封面链接"
		/>


		<van-field
			v-model="service.desc"
			label="服务描述"
			placeholder="请输入服务描述"
			autosize
		/>

		<div class="info__name">店铺支持的手机型号</div>

		<cube-checkbox-group v-model="service.support"  :options="supportList" >

		</cube-checkbox-group>

		<van-button size="large" @click="submit">确认添加</van-button>

	</div>
</template>

<script>
import { Field, Button, Checkbox, CheckboxGroup, } from 'vant'
import ItemHeader from '../components/itemHeader'
export default {
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		ItemHeader
	},
	data () {
		return {
			infoName: '添加手机维修服务',
			categoryName: '',
			categoryInfo: [],
			service: {
				name: '',
				price: '',
				desc: '',
				shop: '5a9fe2a27c67ee2f8c98c9d5',
				support: []
			},
			manufacturer: '5a9665bada3df52e9461430f',
			category: [],
			
			supportList: []
		}
	},
	async mounted () {
		let res = await this.$api.getData('https://m.yixiutech.com/category/shop/'+ this.service.shop);
		res.data.map(item => {
			this.category.push(item.name);
			this.categoryInfo.push(item);
		})
		

		let msg = { shop: this.service.shop, manufacturer: this.manufacturer };
		let supportRes = await this.$api.sendData('https://m.yixiutech.com/phone/model/shop', msg);
		supportRes.data.map(item => {
			this.supportList.push(item.name);
		})
		console.log(this.supportList)
	},
	methods: {
		async submit () {
			let serviceRes = await this.$api.sendData('https://m.yixiutech.com/service', this.service);
			if (serviceRes.code == 4001) {
				this.prompt(serviceRes.errMsg, 'error').show();
				return;	
			}
			this.prompt(serviceRes.data, 'success').show();
			this.$router.push('/sellerHome');
		},
		change (value, index) {
			this.service['category'] = this.categoryInfo[ index ]._id;
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
