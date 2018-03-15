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

		<div class="info__name">
			<p>手机品牌</p>
			<cube-select
				v-model="phoneInfo.name"
				:options="phoneNames"
				@change="phoneChange"
			/>
		</div>

		<div class="info__name">店铺支持的手机型号</div>

		<cube-checkbox-group v-model="service.support"  :options="supportList" >

		</cube-checkbox-group>

		<van-button size="large" @click="submit">确认添加</van-button>

		<div class="space"></div>

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
				// shop: '5aa27cf18d78c262b3f19937',
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				support: []
			},
			manufacturer: '',
			phoneNames: [],
			phoneInfo: [],
			category: [],
			
			supportList: []
		}
	},
	async mounted () {
		const toast = this.$createToast({
			message: '加载中...'
		})
		toast.show();
		let res = await this.$api.getData('https://m.yixiutech.com/category/shop/'+ this.service.shop);
		console.log(res)
		res.data.map(item => {
			this.category.push(item.name);
			this.categoryInfo.push(item);
		})
		let phone = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer/shop/' + this.service.shop);
		toast.hide();
		phone.data.map(item => {
			this.phoneInfo.push(item);
			this.phoneNames.push(item.name);
		})
	},
	methods: {
		async submit () {
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let serviceRes = await this.$api.sendData('https://m.yixiutech.com/service', this.service);
			toast.hide();
			if (serviceRes.code == 4001) {
				this.prompt(serviceRes.errMsg, 'error').show();
				return;	
			}
			this.prompt(serviceRes.data, 'success').show();
			this.$router.push('/sellerHome');
		},
		change (value, index) {
			this.service['category'] = this.categoryInfo[ index ]._id;
		},
		async phoneChange (value, index) {
			this.manufacturer = this.phoneInfo[ index ]._id;
			let msg = { shop: this.service.shop, manufacturer: this.manufacturer };
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let supportRes = await this.$api.sendData('https://m.yixiutech.com/phone/model/shop', msg);
			toast.hide();
			supportRes.data.map(item => {
					// this.supportList.push(item.name);
				this.supportList.push( { label: item.name, value: item._id } );
			})
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

.space {
	width: 100%;
	height: 8vh;
}
</style>
