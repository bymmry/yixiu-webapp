<template>
	<div class="info">
		<div>
			<item-header 
				:name="infoName" 
				v-on:backParent="backParent" 
			/>
			
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
				v-model="service.category.name"
				label="分类名称"
				placeholder="已选择新的分类"
				disabled
			/>

			<div class="box">
				<p>如需更换分类，请选择</p>
				<cube-select
					v-model="categoryRes"
					:options="categoryNames"
					@change="categoryChange"
				/>
			</div>

			

			<div class="box">
				<p>选择已有的手机品牌</p>
				<cube-select
					v-model="manufacturerRes"
					:options="manufacturerNames"
					@change="manufacturerChange"
				/>
			</div>

			<div class="box">
				<p>添加支持的手机型号列表</p>
				<cube-checkbox-group v-model="service.support"  :options="modelNames" >

				</cube-checkbox-group>
			</div>

			<van-button class="submit" size="large" @click="submit">添加</van-button>
		</div>

	</div>
</template>

<script>
import { Field, Button, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'
import addService from './addService';
import addCategory from './addCatagory'
import addManufacturer from './addBrand'
import addModel from './addModel'
import itemHeader from '../components/itemHeader';
export default {
  methods: {
		backParent () {
			this.$router.push('/serviceItem');
		},
		back () {
			this.categoryStatus = false;
			this.manufacturerStatus = false;
			this.modelStatus = false;
		},
		async updateCategory (data) {
			let ownCategory = await this.$api.sendData('https://m.yixiutech.com/category/shop', {type: 'service', shop: this.service.shop._id});
			this.categoryInfo = ownCategory.data;
			this.categoryNames.length = 0;
			ownCategory.data.map(item => {
				this.categoryNames.push(item.name);
			})
		},
		async updateBrand (data) {
			let ownBrand = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer/shop/' + this.service.shop._id);
			this.manufacturerInfo = ownBrand.data;
			this.manufacturerNames.length = 0;
			ownBrand.data.map(item => {
				this.manufacturerNames.push(item.name);
			})
		},
		async updateModel (data) {
			this.modelStatus = false;
			let ownModel = await this.$api.sendData('https://m.yixiutech.com/phone/model/shop', { shop: this.service.shop, manufacturer: this.service.manufacturer });
			this.modelNames = [];
			ownModel.data.map(item => {
				this.modelNames.push({ label: item.name, value: item._id });
			});
		},
		serviceChange (value, index) {
			this.service.price = this.sysServices[ index ].price;
		},
		appendService () {
			this.serviceStatus = !this.serviceStatus;
		},
		categoryChange (value, index) {
			this.service.category = this.categoryInfo[ index ]._id;
			this.categoryRes = value;
		},
		appendCategory () {
			this.categoryStatus = !this.categoryStatus;
			sessionStorage.setItem('category', 'service');
		},
		async manufacturerChange (value, index) {
			this.service.manufacturer = this.manufacturerInfo[ index ]._id;
			this.manufacturerRes = value;

			// 根据店铺id和品牌id获取店铺支持的手机型号
			this.updateModel();
		},
		async submit () {
			const toast = this.$createToast({
				message: '加载中...',
				type: 'loading'
			})
			toast.show();
			let serviceRes = await this.$api.sendData('https://m.yixiutech.com/service', this.service);
			toast.hide();
			if (serviceRes.code !== 200) {
				this.prompt(serviceRes.errMsg, 'error').show();
				return;	
			}
			this.prompt('添加成功!', 'success').show();
			this.$router.push('/sellerHome');

		}
	},
	async mounted () {
		let data = JSON.parse(sessionStorage.getItem('serviceItem'))
		this.service = data;
		console.log(this.service);
		// 查看店铺拥有的分类
		this.updateCategory();

		// 查看店铺之前添加过的手机品牌
		this.updateBrand();
	},
	data () {
		return {
			service: {
				name: '',
				price: '',
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				category: '',
				manufacturer: '',
				support: []
			},
			infoName: '修改手机维修服务',
			serviceNames: [],
			manufacturerRes: '',
			categoryRes: '',
			sysServices: [],
			serviceStatus: false,
			categoryNames: [],
			categoryInfo: [],
			categoryStatus: false,
			manufacturerInfo: [],
			manufacturerNames: [],
			manufacturerStatus: false,
			modelNames: [],
			modelStatus: false
		}
	},
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		addService,
		addCategory,
		addModel,
		addManufacturer,
		itemHeader
	}
}
</script>

<style scoped>
.info {
	text-align: center;
}

.box {
	width: 96%;
	padding: 2%;
	background: #fff;
	margin-bottom: 4%;
}

.box p {
	text-align: left;
}

.box .box-item p {
	padding: 2%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #eee;
}

.info__name {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15px;
	margin-top: 20px;
	font-size: 14px;
	background: #fff;
}

.van-button {
	width: 60%;
	display: inline-block;
	background: #e0620d;
	color: #fff;
	margin-bottom: 20px;
}

.submit {
	color: #fff;
	background: #d81e06;
}
</style>
