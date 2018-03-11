<template>
	<div class="info">
		<item-header :name="infoName" />

		<div class="info__name">
			<p>品牌名称</p>
			<cube-select
				v-model="phoneRes.name"
				:options="phoneName"
				@change="change"
			/>
		</div>

		<van-field
			v-model="phoneRes.name"
			label="其他品牌"
			placeholder="若没有你想要的品牌名称,请填写你想要的品牌名称"
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
	data () {
		return {
			infoName: '添加手机品牌',
			phoneName: [],
			phoneInfo: [],
			phoneRes: {
				name: '',
				alias: '',
				desc: '',
				cover: '',
				shop: JSON.parse(localStorage.getItem('shopData'))._id
			}
		}
	},
	async mounted () {
		let res = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer');
		res.data.map(item => {
			this.phoneName.push(item.name);
			this.phoneInfo.push(item);
		})
	},
	methods: {
		change(value, index) {
			this.phoneRes['name'] = value;
			this.phoneRes['alias'] = this.phoneInfo[ index ].alias;
		},
		async submit () {
			let phoneRes = await this.$api.sendData('https://m.yixiutech.com/phone/manufacturer', this.phoneRes);
			if (phoneRes.code == 4001) {
				this.prompt(phoneRes.errMsg, 'error').show();
				return;	
			}
			this.prompt('添加成功', 'success').show();
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
	margin-top: 50px;
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
