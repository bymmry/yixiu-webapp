<template>
	<div class="info">
		<item-header 
			:name="infoName"  
			v-on:backParent="backParent"
			v-show="show"
			/>

		<div class="info__name">
			<p>品牌名称</p>
		</div>

		<div class="info__name">
			<div class="service">
				<selects ref="select" v-for="(item, index) in brand.list"
					:type="brand.type"
					:key="index"
					:data="item.name"
					@sendMsg="sendMsg(index, item.name)"
					@remove="remove(index, item.name)"
					:index="index"
				/>
			</div>
		</div>

		<!-- <van-field
			v-model="phoneRes.name"
			label="其他品牌名称"
			placeholder="若没有想要的,请输入其他品牌名称"
		/>

		<van-field
			v-model="phoneRes.alias"
			label="名称的别名"
			placeholder="若没有想要的,请输入其他品牌名称的别名"
		/> -->

		<!-- <van-field
			v-model="phoneRes.desc"
			label="描述"
			placeholder="请输入品牌描述"
		/>

		<van-field
			v-model="phoneRes.cover"
			label="封面"
			placeholder="请输入封面地址"
		/> -->

		<van-button size="large" @click="submit" v-show="show">确认添加</van-button>

	</div>
</template>

<script>
import { Field, Button, Toast } from 'vant'
import ItemHeader from '../components/itemHeader'
import selects from '../components/select'

export default {
	props: {
		show: Boolean
	},
  components: {
		[Field.name]: Field,
		[Button.name]: Button,
		ItemHeader,
		selects
	},
	data () {
		return {
			infoName: '添加手机品牌',
			phoneName: [],
			phoneInfo: [],
			brand: {
				type: 'brand',
				list: []
			},
			phones: [],
			phoneRes: {
				name: '',
				alias: '',
				desc: '',
				cover: '',
				// shop: '5aa27cf18d78c262b3f19937',
				shop: JSON.parse(localStorage.getItem('shopData'))._id
			}
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
	},
	methods: {
		sendMsg (index) {
			this.phones.push({
				name: this.phoneInfo[ index ].name,
				alias: this.phoneInfo[ index ].alias,
				shop: this.phoneRes.shop
			})
		},
		remove (index, data) {
			this.phones.map( (item, index) => {
				item.name == data ? this.phones.splice(index, 1) : null;
			})
		},
		async cancel (data) {
			let zData = data.split('&');
			let type = zData[1];
			let name = zData[0];
			let index = zData[3];
			this.manufacturer = zData[2]
			this.phoneRes.name = name;
			this.phoneRes.alias = this.phoneInfo[ index ].alias;

			// 取消其他几个子项的选中
			this.$refs.select.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		backParent () {
			this.$emit('backParent', true);
		},
		change(value, index) {
			this.phoneRes['name'] = value;
			this.phoneRes['alias'] = this.phoneInfo[ index ].alias;
		},
		async submit () {
			this.phones.map( async item => {
				let phoneRes = await this.$api.sendData('https://m.yixiutech.com/phone/manufacturer', item);
				if (phoneRes.code !== 200) {
					this.prompt(phoneRes.errMsg, 'error').show();
					return;	
				}
				this.prompt('添加成功', 'correct').show();
				this.$emit('updateBrand', true);
			})
		}
	}
}
</script>

<style scoped>
.info {
	background: #fff;
}
.info__name {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15px;
	margin: 20px 0;
	font-size: 14px;
}

.info__name p {
	width: 90px;
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:flex-start;
}

.van-button {
	margin-top: 50px;
}

.info__name .cube-select {
	width: 60%;
}
</style>
