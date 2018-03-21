<template>
	<div class="info">
		<item-header :name="infosName" @backParent="back" />

		<van-field
			v-model="product.model"
			label="型号"
			placeholder="请输入手机型号"
		/>

		<div class="info__name">
			<p>内存</p>
			<cube-select
				v-model="product.storage"
				:options="storages"
			/>
		</div>

		<van-field
			v-model="product.color"
			label="颜色"
			placeholder="请输入手机颜色"
		/>

		<div class="info__name">
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

		<van-field
			v-model="product.quality"
			label="成色"
			placeholder="请输入手机成色"
		/>

		<div class="info__name">
			<p>版本</p>
			<cube-select
				v-model="product.version"
				:options="versions"
			/>
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
</template>

<script>
import { Field, Button } from 'vant'
import selects from '../components/select'
import itemHeader from './itemHeader'
export default {
	methods: {
		submit () {
			this.$emit('addParamInfo', this.product);
		},
		sendMsg (data) {
			this.product.network.push(data);
		},
		back () {
			this.$emit('backToPublish', true)
		},
		remove (data) {
			this.product.network.map( (item, index) => {
				item == data ? this.product.network.splice(index, 1) : null;
			})
		}
	},
  components: {
		[Field.name]: Field,
		[Button.name]: Button,
		selects,
		itemHeader
	},
	data () {
		return {
			infosName: '添加手机参数',
			versions: ['国版', '港版', '其他'],
			storages: ['16G', '32G', '64G', '128G'],
			networks: ['联通4G', '移动4G', '电信4G'],
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
</style>
