<template>
	<div class="info">
		<item-header :name="infosName" @backParent="back" />

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

		<div v-show="chooseBrand">
			<div class="box">
				<p>选择型号</p>
				<div class="service">
					<single-select ref="model" v-for="(item, index) in model.list"
						:type="model.type"
						:key="index" 
						v-on:cancelOther="modelCancel"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<!-- <div class="info__name">
				<p>内存</p>
				<cube-select
					v-model="product.storage"
					:options="storages"
				/>
			</div> -->

			<div class="box">
				<p>选择内存</p>
				<div class="service">
					<single-select ref="storage" v-for="(item, index) in storage.list"
						:type="storage.type"
						:key="index" 
						v-on:cancelOther="storageChange"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<div class="box">
				<p>选择颜色</p>
				<div class="service">
					<single-select ref="color" v-for="(item, index) in colors.list"
						:type="colors.type"
						:key="index" 
						v-on:cancelOther="colorChange"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<!-- <van-field
				v-model="product.color"
				label="颜色"
				placeholder="请输入手机颜色"
			/> -->

			<div class="box">
				<p>网络</p>
				<div class="service">
					<selects ref="select" v-for="(item, index) in networks"
						:key="index"
						@sendMsg="sendMsg"
						@remove="remove"
						:data="item"
					/>
				</div>
			</div>

			<div class="box">
				<p>选择成色</p>
				<div class="service">
					<single-select ref="quality" v-for="(item, index) in quality.list"
						:type="quality.type"
						:key="index" 
						v-on:cancelOther="qualityChange"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<!-- <div class="info__name">
				<p>版本</p>
				<cube-select
					v-model="product.version"
					:options="versions"
				/>
			</div> -->

			<div class="box">
				<p>选择版本</p>
				<div class="service">
					<single-select ref="version" v-for="(item, index) in version.list"
						:type="version.type"
						:key="index" 
						v-on:cancelOther="versionChange"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

			<van-field
				v-model="product.screenSize"
				label="屏幕尺寸"
				placeholder="请输入屏幕尺寸"
			/>

			<van-field
				v-model="product.ratio"
				label="分辨率"
				placeholder="请输入屏幕分辨率"
			/>

			<van-field
				v-model="product.phoneSize"
				label="手机尺寸"
				placeholder="请输入手机尺寸"
			/>

			<van-field
				v-model="product.SIM"
				label="SIM卡规格"
				placeholder="请输入SIM卡规格"
			/>		

			<van-field
				v-model="product.frontCamera"
				label="前置摄像头"
				placeholder="请输入前置摄像头信息"
			/>

			<van-field
				v-model="product.backCamera"
				label="后置摄像头"
				placeholder="请输入后置摄像头信息"
			/>

			<van-field
				v-model="product.cpu"
				label="CPU"
				placeholder="请输入CPU信息"
			/>

			<van-field
				v-model="product.basicFrequency"
				label="主频信息"
				placeholder="请输入主频信息"
			/>
			
			<van-button size="large" @click="submit">确认添加</van-button>
		</div>

	</div>
</template>

<script>
import { Field, Button } from 'vant'
import selects from '../components/select'
import itemHeader from './itemHeader'
import singleSelect from './singleSelect';
export default {
	methods: {
		versionChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.product.version = name;
			// 取消其他几个子项的选中
			this.$refs.version.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		storageChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.product.storage = name;
			// 取消其他几个子项的选中
			this.$refs.storage.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		qualityChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.product.quality = name;
			// 取消其他几个子项的选中
			this.$refs.quality.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		colorChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.product.color = name;
			// 取消其他几个子项的选中
			this.$refs.color.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		modelCancel (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.product.model = name;
			// 取消其他几个子项的选中
			this.$refs.model.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})

			this.models.map(item => {
				item.name == name ? this.colors.list = item.color : null;
			})
		},
		async updateModel () {
			this.modelStatus = false;
			let model = await this.$api.getData('https://m.yixiutech.com/phone/model/' + this.manufacturer);
			this.models = model.data;
			this.model.list  = [];
			model.data.map(item => {
				this.model.list.push(item.name);
			})
		},
		submit () {
			console.log(this.product);
			this.$emit('addParamInfo', this.product);
		},
		sendMsg (data) {
			this.product.network.push(data);
			console.log(this.product);
		},
		back () {
			this.$emit('backToPublish', true)
		},
		remove (data) {
			this.product.network.map( (item, index) => {
				item == data ? this.product.network.splice(index, 1) : null;
			})
		},
		async cancel (data) {
			let zData = data.split('&');
			let type = zData[1];
			let name = zData[0];
			this.manufacturer = zData[2]
			this.brandName = name;

			let sysBrand = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer');
			sysBrand.data.map(item => {
				item.name == this.brandName ? this.brandId = item._id : null;
			})

			let sysModel = await this.$api.getData('https://m.yixiutech.com/phone/model/' + this.brandId);
			
			this.sysModel = sysModel.data;

			this.phoneModel = [];
			
			this.sysModel.map(item => {
				this.phoneModel.push({
					text: item.name,
					value: item._id
				})
			})
			
			// 根据手机品牌获取型号
			const toast = this.$createToast({
				txt: '加载中...',
				type: 'correct'
			})
			toast.show();
			this.updateModel();
			toast.hide();
			this.chooseBrand = true;

			// 取消其他几个子项的选中
			this.$refs.select.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		}
	},
	async mounted () {
		const toast = this.$createToast({
			message: '加载中...'
		})
		toast.show();
		let res = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer');
		this.brand.list = res.data;
		toast.hide();
		res.data.map(item => {
			this.phoneName.push(item.name);
			this.phoneInfo.push(item);
		})
		window.status = false;
	},
  components: {
		[Field.name]: Field,
		[Button.name]: Button,
		selects,
		singleSelect,
		itemHeader
	},
	data () {
		return {
			infosName: '添加手机参数',
			networks: ['联通4G', '移动4G', '电信4G'],
			modelNames: [],
			chooseBrand: false,
			phoneInfo: [],
			phoneName: [],
			version: {
				type: 'version',
				list: ['国行', '港版', '其他']
			},
			storage: {
				type: 'storage',
				list: ['16G', '32G', '64G', '128G']
			},
			model: {
				type: 'model',
				list: []
			},
			brand: {
				type: 'brand',
				list: []
			},
			quality: {
				type: 'quality',
				list: ['99新', '95新', '9新', '8新'],
			},
			colors: {
				type: 'color',
				list: []
			},
			product: {
				model: '',
				storage: '',
				color: '',
				network: [],
				quality: '',
				version: '',
				screenSize: '',
				ratio: '',
				phoneSize: '',
				SIM: '',
				frontCamera: '',
				backCamera: '',
				cpu: '',
				basicFrequency: ''
			},
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
	margin-top: 50px;
	font-size: 14px;
}

.info__name p {
	width: 90px;
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

.box {
	width: 96%;
	padding: 2%;
	background: #fff;
	margin-bottom: 4%;
	text-align: left;
}
</style>
