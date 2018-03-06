<template>
  <div class="info">
		<div v-if="active === 0">
			<p class="info__title">添加手机品牌</p>

			<cube-select
				v-model="phoneRes.name"
				:options="phoneName"
				@change="change"
			/>

			<van-field
				v-model="phoneRes.desc"
				label="描述"
				placeholder="请输入品牌描述"
			/>

			<van-field
				v-model="phoneRes.cover"
				label="封面"
				placeholder="请输入封面地址"
			/>

		</div>
		<div v-if="active === 1">
			<p class="info__title">添加手机型号</p>

			<cube-select
				v-model="phoneModelRes"
				:options="phoneModel"
				@change="modelChange"
			/>

			<van-field
				v-model="phoneModelRes.desc"
				label="描述"
				placeholder="请输入品牌描述"
			/>

			<van-field
				v-model="phoneModelRes.cover"
				label="封面"
				placeholder="请输入封面地址"
			/>

			<p class="info__title">选择手机颜色</p>

			<cube-select
				v-model="phoneModelColorRes"
				:options="phoneModelColor"
				@change="colorChange"
			/>

		</div>
		<div v-if="active === 2">
			<p class="info__title">添加分类</p>

			<p class="info__title">请选择分类类型</p>
			<cube-select
				v-model="category.type"
				:options="categoryList"
				@change="typeChange"
			/>

			<van-field
				v-model="category.name"
				label="分类名称"
				placeholder="请输入分类名称"
			/>

			<van-field
				v-model="category.cover"
				label="封面图片链接"
				placeholder="请输入分类封面图片信息"
			/>

			<van-field
				v-model="category.desc"
				label="分类描述"
				placeholder="请输入分类描述"
			/>

			<van-field
				v-model="category.shop"
				label="所属商铺标识"
				placeholder="请输入商铺标识"
			/>

			<van-field
				v-model="service.name"
				label="此分类的父级"
				placeholder="请输入次分类的父级"
			/>
			

		</div>
		<div v-if="active === 3">
			<p class="info__title">添加手机维修服务</p>

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


		</div>
		
		<van-button size="large" @click="next">下一步</van-button>
		<div class="space"></div>
  </div>
</template>

<script>
import { Field, Button, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'
export default {
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup
	},
	data () {
		return {
			active: 0,
			phoneName: [],
			phoneInfo: [],
			phoneRes: {
				name: '',
				alias: '',
				phoneBrandId: '',
				shop: '',
				desc: '',
				cover: ''
			},
			phoneModel: [],
			phoneModelAlias: '',
			phoneModelInfo: [],
			phoneModelColor: [],
			phoneModelColorRes: '',
			phoneModelRes: [],
			categoryList: ['平台板块', '维修服务', '普通商品'],
			shop: '5a9e91a1a17f286baf0bf8a6',
			manufacturer: '',
			service: {
				name: '',
				price: '',
				desc: ''
			},
			category: {
				type: '',
				name: '',
				cover: '',
				desc: '',
				shop: '',
				parent: ''
			}
		}
	},
	mounted () {
		let _this = this;
		this.$ajax.get('https://m.yixiutech.com/phone/manufacturer')
			.then( response => {
				let res = response.data;
				res.map(item => {
					_this.phoneName.push(item.name);
					_this.phoneInfo.push(item);
				})
			}).catch( error => {
				console.log(error)
			})
	},
	methods: {
		 change(value, index) {
			this.phoneRes = { name: value, alias: this.phoneInfo[ index ].alias, phoneBrandId: this.phoneInfo[ index ]._id, shop: this.shop };
			this.manufacturer = this.phoneInfo[ index ]._id;
    },
		modelChange (value, index) {
			this.phoneModelRes = { name: value, alias: this.phoneModelInfo[ index ].alias, manufacturer: this.manufacturer, shop: this.shop };
			this.phoneModelColor = this.phoneModelInfo[ index ].color;
		},
		typeChange (value, index) {

		},
		colorChange (value, index) {
			this.phoneModelRes['color'] = value;
		},
		async next () {
			this.submitByType();
			this.active++;
		},
		submitByType () {
			switch (this.active) {
				case 0:
					console.log(this.phoneRes);
					this.post('https://m.yixiutech.com/phone/manufacturer', this.phoneRes);
					this.get('https://m.yixiutech.com/phone/model/' + this.manufacturer, res => {
						res.data.map(item => {
							this.phoneModel.push(item.name);
							this.phoneModelInfo.push(item);
						})
					})
					break;
				case 1:
					console.log(this.phoneModelRes)
					this.post('https://m.yixiutech.com/phone/model', this.phoneModelRes);
					break;
				case 2:
					console.log(this.catagory)
					this.post('https://m.yixiutech.com/category', this.category);
					break;
				case 3: 
					this.service['shop'] = this.shop;
					this.service['catagory'] = 1;
					console.log(this.service);
					this.post('https://m.yixiutech.com/service', this.service);
					break;
			}
		},
		get (url, callback) {
			this.$ajax.get(url, callback)
				.then((response) => {
					console.log(response)
					callback(response);
				}).catch((error) => {
					console.log(error);
				})
		},
		post (url, data) {
			this.$ajax.post(url, data)
				.then((response) => {
					console.log(response)
				}).catch((error) => {
					console.log(error);
				})
		}
	}
}
</script>

<style scoped>
.info .info__title {
	margin-left: 10px;
}

.info .van-button {
	margin-top: 30px;
}

.info .cube-select {
	margin: 20px 0;
}

.space {
	width: 100%;
	height: 8vh;
}
</style>


// 