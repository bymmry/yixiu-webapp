<template>
	<div class="info">
		<item-header :name="infoName" />

			<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
				<img :src="goods.cover" class="info__img" alt="">
			</van-uploader>

			<van-field
				v-model="goods.name"
				label="商品名称"
				placeholder="请输入商品名称"
			/>

			<div class="info__name">
				<p>商品分类</p>
				<cube-select
					v-model="goods.category"
					:options="categoryList"
					@change="categoryChange"
				/>
			</div>

			<!-- <van-field
				v-model="goods.category"
				label="其他商品分类"
				placeholder="请输入商品分类名称"
			/> -->

			<van-field
				v-model="goods.price"
				label="商品价格"
				placeholder="请输入商品价格"
			/>
			
			<!-- <van-field
				v-model="goods.inventory"
				label="商品库存"
				placeholder="请输入商品价格"
				disabled
			/> -->

			<!-- <van-field
				v-model="goods.freight"
				label="运费"
				placeholder="请输入商品运费"
				disabled
			/> -->

			<van-field
				v-model="goods.cover"
				label="宝贝封面"
				placeholder="请输入宝贝封面链接"
			/>

			<van-field
				v-model="goods.desc"
				label="宝贝描述"
				placeholder="请输入宝贝描述"
			/>

			<van-field
				v-model="goods.detail"
				label="宝贝详情"
				placeholder="请输入宝贝详情"
			/>

			<!-- <div class="info__name">
				<p>发货地</p>
				<cube-select
					v-model="goods.base"
					:options="base"
					@change="baseChange"
				/>
			</div> -->

			<van-button size="large" @click="submit">确认添加</van-button>

	</div>
</template>

<script>
import ItemHeader from '../components/itemHeader'
import { Field, Button, Uploader } from 'vant'
export default {
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		[Uploader.name]: Uploader,
		ItemHeader
	},
	async mounted () {
		let data = { type: 'goods', shop: this.goods.shop }
		let categoryRes = await this.$api.sendData('https://m.yixiutech.com/category/shop', data);
		categoryRes.data.map(item => {
			this.categoryList.push({value: item._id, text: item.name});
		})

		// let data = { shop: this.goods.shop, category: '5aa0e4b26834c2566635e10b', phoneModel: '5aa0e3434e16d955dc6e4fd4' }
		// let res = await this.$api.sendData('https://yixiu.natappvip.cc/service/shop', data);
		// console.log(res);
	},
  data () {
		return {
			infoName: '发布宝贝',
			goods: {
				shop: '5aa1137f4043b46a5b8f0694',
				cover: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3146109938,3614262430&fm=27&gp=0.jpg'
			},
			base: ['重庆'],
			categoryList: []
		}
	},
	methods: {
		baseChange (value, index) {
			
		},
		categoryChange (value, index) {

		},
		async submit () {
			let goodRes = await this.$api.sendData('https://yixiu.natappvip.cc/goods/shop', this.goods);
			if (goodRes.code == 4001) {
				this.prompt(goodRes.errMsg, 'error').show();
				return;	
			}
			this.prompt(goodRes.data, 'success').show();
			this.$router.push('/sellerHome');
		},
		onRead (file, content) {
			console.log(file);
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
	margin-top: 20px;
	font-size: 14px;
}

.info__name p {
	width: 90px;
}

.info .van-uploader {
	display: flex;
	justify-content: center;
	margin: 10px 0;
}

.info .info__img {
	width: 100px;
	height: 100px;
}

.van-button {
	margin-top: 50px;
}

.info__name .cube-select {
	width: 60%;
}
</style>
