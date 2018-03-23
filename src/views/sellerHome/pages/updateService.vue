<template>
	<div class="infos">

		<item-header 
			:name="infoName"
			v-on:backParent="back"
		/>

		<div v-show="!brandStatus && !modelStatus && !categoryStatus">
			<!-- <div class="box">
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
				<van-button size="large" @click="openBrand">添加品牌</van-button>
			</div> -->
			
			<!-- <div class="box">
				<p>选择型号</p>

				<div class="service">
					<selects v-for="(item, index) in modelNames"
						:type="brand.type"
						:key="index" 
						@sendMsg="sendMsg(index)"
						@remove="remove(index)"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
				<van-button size="large" @click="openModel">添加型号</van-button>
				
			</div> -->
			
			<!-- <div class="box">
				<p>选择颜色</p>
				<div class="service">
					<single-select ref="select" v-for="(item, index) in colors.list"
						:type="colors.type"
						:key="index"
						v-on:cancelOther="colorSelect"
						:data="item"
					/>
				</div>
			</div> -->

			<div class="box">
				<p>选择问题分类</p>
				<div class="box-item" v-for="(item, index) in categoryinfos" :key="index">
					<p @click="showItem(index)"><sicon name="add" scale="2.4"></sicon><span class="box__name">{{ item.name }}</span></p>
					<div v-show="item.show">
						<p class="concrete-service" v-for="(listItem, listIndex) in item.list" :key="listIndex">
							<input type="text" v-model="listItem.name" placeholder="服务的名称" />
							<input type="text" v-model="listItem.price" placeholder="服务的价格"/>
						</p>
						<van-button size="large" @click="addService(index, item._id)">添加服务</van-button>
					</div>
					
				</div>
				<van-button size="large" @click="openCategory">添加服务分类</van-button>

				<van-button size="large" @click="submit">提交</van-button>
			</div>
		</div>

		
		
	</div>
</template>

<script>
import selects from '../components/select'
import singleSelect from '../components/singleSelect'
import { Checkbox, CheckboxGroup, Cell, CellGroup, Button } from 'vant'
import addBrand from './addBrand'
import addModel from './addModel'
import addCategory from './addCatagory'
import itemHeader from '../components/itemHeader'
export default {
  components: {
		selects,
		singleSelect,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Button.name]: Button,
		addBrand,
		addModel,
		addCategory,
		itemHeader
	},
	data () {
		return {
			brand: {
				type: 'brand',
				list: []
			},
			infoName: '更新服务价格',
			models: [],
			modelNames: [],
			modelRes: [],
			categoryNames: [],
			categoryinfos: [],
			active: '',
			res: {},
			modelStatus: false,
			brandStatus: false,
			categoryStatus: false,
			services: [],
			shop: JSON.parse(localStorage.getItem('shopData'))._id,
			result: [],
			colors: {
				type: 'color',
				list: []},
			service: []
		}
	},
	async mounted () {

		let data = { shop: this.shop };

		const toast = this.$createToast({
			txt: '加载中...',
			type: 'loading'
		})
		toast.show();
		this.updateCategory();
		let serviceMap = await this.$api.sendData('https://m.yixiutech.com/service/shop', data);
		serviceMap.code == 200 ? this.services = serviceMap.data : null;
		this.services.map(item => {
			this.categoryinfos.map(categoryItem => {
				categoryItem.name == item.category.name ? categoryItem.list.push(item) : null;
			})
		})
		toast.hide();
	},
	methods: {
		back () {
			this.$router.go(-1);
		},
		submit () {
			this.service = [];
			this.categoryinfos.map(item => {
				item.list.map(childItem => {	
						if (childItem.name !== undefined) {
							let obj = Object.assign(childItem, {shop: this.shop, support: this.modelRes})
							this.service.push(obj);	
						}
				})
			})
			console.log(this.service);
			const toast = this.$createToast({
				txt: '请稍后...',
				type: 'loading'
			})
			toast.show();
			this.service.map(async item => {
				let res = await this.$api.sendData('https://m.yixiutech.com/service/update/', item);
			})
			toast.hide();
			this.prompt('更新成功!', 'correct').show();
			this.$router.push('/sellerHome');
		},
		sendMsg (index) {
			this.modelRes.push(this.models[ index ]._id);
		},
		remove (index) {
			let id = this.models[ index ]._id;
			this.modelRes.map( (item, index) => {
				item == id ? this.modelRes.splice(index, 1) : null;
			})
		},
		openCategory () {
			this.categoryStatus = true;
		},
		openBrand () {
			this.brandStatus = true;
		},
		openModel () {
			this.modelStatus = true;
		},
		backParent () {
			this.brandStatus = false;
			this.modelStatus = false;
			this.categoryStatus = false;
		},
		addService (index, categoryId) {
			this.categoryinfos[ index ].list.push({
				category: categoryId
			}); 
		},
		colorSelect (data) {
			let color = data.split('&')[0];
		},
		modelChange (value, index) {
			this.colors.list = this.models[ index ].color;
		},
		async updateCategory (data) {
			this.categoryStatus = false;
			let ownCategory = await this.$api.sendData('https://m.yixiutech.com/category/shop', {type: 'service', shop: this.shop});
			ownCategory.data.map(item => {
				this.categoryinfos.push({
					_id: item._id,
					name: item.name,
					show: false,
					list: []
				})
			})
		},
		showItem (index) {
			this.categoryinfos[index].show = !this.categoryinfos[index].show;
		}
	}
}
</script>

<style scoped>
.infos {
	background: #eee;
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:flex-start;
}

.service-item {
	position: relative;
}

.service-item .price {
	position: absolute;
	right: 0;
	top: 50%;
	width: 30%;
	transform: translate(0, -50%);
}

.service-item .price input {
	width: 100%;
}

.van-button {
	margin: 10px 0;
}

.box {
	width: 96%;
	padding: 2%;
	background: #fff;
	margin-bottom: 4%;
}

.box .box-item p {
	padding: 2%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #eee;
}

.concrete-service {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.box .svg-icon {
	display: inline-block;
}

.box .box__name {
	display: inline-block;
	margin-left: 10px;
}

</style>
