<template>
	<div class="info">
		<item-header :name="infoName" />

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

			<!-- <van-field
				v-model="goods.cover"
				label="宝贝封面"
				placeholder="请输入宝贝封面链接"
			/> -->

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

			<div class="info__name">
				<p>商品图片</p>
			</div>

			<div class="upload" v-for="(item, index) in goods.cover" :key="index">
				<input class="upload__select" @change="uploadFile($event, index)" type="file" accept="image/*" />
				<img class="upload__show" :src="item" alt="" />
			</div>

			<van-button size="large" @click="addNew">添加新图片</van-button>

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
	},
  data () {
		return {
			infoName: '发布宝贝',
			src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
			goods: {
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				// shop: '5aa27cf18d78c262b3f19937',
				cover: [
					'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'
				]
			},
			base: ['重庆'],
			categoryList: []
		}
	},
	methods: {
		uploadFile (event, index) {
			this.file = event.target.files[0];
			let url = window.URL.createObjectURL(this.file);
			this.goods.cover[ index ] = url;
		},
		addNew () {
			this.goods.cover.push('https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png');
		},
		fileRemove () {

		},
		baseChange (value, index) {
			
		},
		filesAdded(files) {
			const maxSize = 1 * 1024 * 1024
			for (let k in files) {
				const file = files[k]
				if (file.size > maxSize) {
					file.ignore = true
				}
			};
		},
		categoryChange (value, index) {

		},
		async submit () {
			let goodRes = await this.$api.sendData('https://m.yixiutech.com/goods/shop', this.goods);
			if (goodRes.code == 4001) {
				this.prompt(goodRes.errMsg, 'error').show();
				return;	
			}
			this.prompt('发布成功', 'success').show();
			this.$router.push('/sellerHome');
		},
		onRead (file, content) {
			this.goods.cover = file.content;
		}
	}
}
</script>

<style scoped>
.info {
	width: 100%;
	overflow: hidden;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
}

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

.upload {
	width: 100%;
	height: 100px;
}

.upload .upload__show {
	position: absolute;
	width: 100px;
	height: 80px;
	left: 50%;
	margin-left: -50px;
}

.upload .upload__select {
	position: absolute;
	z-index: 8;
	font-size: 50px;
	opacity: 0;
	left: 0;
}

.cube-upload-def {
	width: 90%;
}

.van-button {
	margin-top: 50px;
}

.info__name .cube-select {
	width: 60%;
}
</style>
