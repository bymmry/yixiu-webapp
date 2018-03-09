<template>
  <div class="info">
		<item-header :name="infoName" />
		
		<div class="info__name">
			<p>分类类型</p>
			<cube-select
				v-model="category.type"
				:options="categoryList"
				@change="typeChange"
			/>
		</div>

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
			v-model="category.parent"
			label="此分类的父级"
			placeholder="请输入次分类的父级"
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
			categoryList: [
				{value: 'plate', text: '平台板块'},
				{value: 'service', text: '维修服务'},
				{value: 'goods', text: '普通商品'}
			],
			infoName: '添加手机分类',
			category: {
				type: '',
				name: '',
				cover: '',
				desc: ''
			}
		}
	},
	methods: {
		typeChange (value ,index) {

		},
		async submit () {
			let categoryRes = await this.$api.sendData('https://yixiu.natappvip.cc/category', this.category);
			if (categoryRes.code == 4001) {
				this.prompt(categoryRes.errMsg, 'error').show();
				return;	
			}
			this.prompt('提交成功!', 'success').show();
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
