<template>
  <div class="info">
		<item-header :name="infoName" v-on:backParent="backParent" />
		
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
				desc: '',
				// shop: '5aa27cf18d78c262b3f19937',
				shop: JSON.parse(localStorage.getItem('shopData'))._id
			}
		}
	},
	methods: {
		backParent () {
			this.$emit('backParent', true);
		},
		typeChange (value ,index) {

		},
		async submit () {
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let categoryRes = await this.$api.sendData('https://m.yixiutech.com/category', this.category);
			toast.hide();
			if (categoryRes.code !== 200) {
				this.prompt(categoryRes.errMsg, 'error').show();
				return;	
			}
			this.prompt('提交成功!', 'success').show();
			this.$emit('updateCategory', true);
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
