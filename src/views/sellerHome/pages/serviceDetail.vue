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
				disabled
			/>

			<van-field
				v-model="service.price"
				label="价格"
				placeholder="请输入服务的价格"
				disabled
			/>

			<van-field
				v-model="service.category.name"
				label="分类名称"
				placeholder="已选择新的分类"
				disabled
			/>

			<div class="info__name">
				<p>已选中手机型号</p>
			</div>
			<div class="phoneList">
				<p class="model" v-for="(item, index) in service.support" :key="index">
					<span>{{ item.name }}</span>
					<span @click="remove(index)">
						<sicon name="quit" scale="2.4"></sicon>
					</span>
				</p>
			</div>

			<div class="box">
				<p>选择品牌</p>
				<div class="service">
					<single-select ref="select"  v-for="(item, index) in brand.list"
						:type="brand.type"
						:key="index" 
						v-on:cancelOther="cancel"
						:data="item.name"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<div class="box">
				<p>添加最新的型号支持</p>
				<div class="service">
					<selects v-for="(item, index) in modelNames"
						:type="brand.type"
						:key="index"
						@sendMsg="sendMsg(index)"
						@remove="removeModel(index)"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<van-button class="submit" size="large" @click="submit">修改</van-button>
		</div>

	</div>
</template>

<script>
import { Field, Button, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'
import addService from './addService';
import selects from '../components/select'
import singleSelect from '../components/singleSelect'
import addCategory from './addCatagory'
import addManufacturer from './addBrand'
import addModel from './addModel'
import itemHeader from '../components/itemHeader';
export default {
  methods: {
		sendMsg (index) {
			let status = true;
			this.service.support.map(item => {
				if (item._id == this.models[ index ]._id) {
					this.prompt('该服务下已存在相同的手机型号', 'error').show();
					status = false;
				}
			})
			status && this.modelRes.push(this.models[ index ]);
		},
		removeModel (index) {
			let id = this.models[ index ]._id;
			this.modelRes.map( (item, index) => {
				item._id == id ? this.modelRes.splice(index, 1) : null;
			})
		},
		async updateBrand () {
			this.brandStatus = false;
			let ownBrand = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer/shop/' + this.shop);
			this.brand.list = ownBrand.data;
		},
		async cancel (data) {
			let zData = data.split('&');
			let type = zData[1];
			let name = zData[0];
			this.manufacturer = zData[2]
			this.brandName = name;
			
			// 根据手机品牌获取型号
			const toast = this.$createToast({
				txt: '加载中...',
				type: 'correct'
			})
			toast.show();
			this.updateModel();
			toast.hide();

			// 取消其他几个子项的选中
			this.$refs.select.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		remove (index) {
			this.service.support.splice(index, 1);
		},
		backParent () {
			this.$router.push('/viewServices');
		},
		back () {
			this.categoryStatus = false;
			this.manufacturerStatus = false;
			this.modelStatus = false;
		},
		async updateModel () {
			this.modelStatus = false;
			let model = await this.$api.sendData('https://m.yixiutech.com/phone/model/shop/', { shop: this.shop, manufacturer: this.manufacturer });
			this.models = model.data;
			this.modelNames  = [];
			model.data.map(item => {
				this.modelNames.push(item.name);
			})
		},
		async submit () {
			const toast = this.$createToast({
				message: '加载中...',
				type: 'loading'
			})
			this.service.support = this.service.support.concat(this.modelRes);
			toast.show();
			let serviceRes = await this.$api.sendData('https://m.yixiutech.com/service/update/', this.service);
			toast.hide();
			if (serviceRes.code !== 200) {
				this.prompt(serviceRes.errMsg, 'error').show();
				return;
			}
			this.prompt('更新成功!', 'correct').show();
			this.$router.push('/sellerHome');
		}
	},
	async mounted () {
		window.status = false;
		let data = JSON.parse(sessionStorage.getItem('serviceItem'));
		this.service = data;
		this.updateBrand();
	},
	data () {
		return {
			models: [],
			modelNames: [],
			phoneModel: [],
			modelRes: [],
			shop: JSON.parse(localStorage.getItem('shopData'))._id,
			service: {
				name: '',
				price: '',
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				category: '',
				manufacturer: '',
				support: []
			},
			brand: {
				type: 'brand',
				list: []
			},
			result: [],
			list: [],
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
		itemHeader,
		selects,
		singleSelect
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

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:flex-start;
}

.model {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2% 4%;
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
