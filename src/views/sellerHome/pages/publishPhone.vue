<template>
	<div class="infos">

		<div v-show="!categoryStatus && !paramStatus && !qualityStatus">
			<item-header :name="infosName" @backParent="back" />
			<van-field
				v-model="goods.name"
				label="商品名称"
				placeholder="请输入商品名称"
			/>

			<div class="infos__name">
				<p>商品图片</p>
			</div>

			<div class="upload">
				<input class="upload__select" @change="uploadCover($event)" type="file" accept="image/*" />
				<img class="upload__show" :src="goods.cover" alt="" />
			</div>

			<div class="infos__name">
				<p>商品分类</p>
				<cube-select
					v-model="goods.category"
					:options="categoryList"
					@change="categoryChange"
				/>
			</div>

			<van-button class="btn" size="large" @click="appendCategory">没找到?添加一个分类</van-button>

			<van-field
				v-model="goods.price"
				label="商品价格"
				placeholder="请输入商品价格"
			/>

			<van-field
				v-model="goods.info.primeCost"
				label="商品原价"
				placeholder="请输入商品价格"
			/>

			<van-field
				v-model="goods.desc"
				label="宝贝描述"
				placeholder="请输入宝贝描述"
			/>

			<van-field
				v-model="goods.info.present"
				label="赠品"
				placeholder="请输入赠品信息"
			/>

			<van-field
				v-model="goods.info.promise"
				label="商品保证"
				placeholder="请输入商品保证"
			/>

			<van-field
				v-model="goods.detail"
				label="宝贝详情"
				placeholder="请输入宝贝详情"
			/>

			<van-button class="btn" size="large" @click="addParam">添加手机参数</van-button>

			<van-button class="btn" size="large" @click="openQuality">添加质检数据</van-button>

			<div class="infos__name">
				<p>商品图片</p>
			</div>

			<div class="upload" v-for="(item, index) in goods.info.photo" :key="index">
				<input class="upload__select" @change="uploadFile($event, index)" type="file" accept="image/*" />
				<img class="upload__show" :src="item.url" alt="" />
			</div>

			<van-button class="btn" size="large" @click="addNew">添加新图片</van-button>

			<van-button size="large" @click="submit">确认添加</van-button>

		</div>

		<add-params
			v-show="paramStatus"
			@addParamInfo="addParamInfo"
			@backToPublish="backToPublish"
		/>

		<add-quality
			v-show="qualityStatus"
			@addQualityInfos="addQualityInfos"
			@backToPublish="backToPublish"
		/>

		<add-category 
			v-show="categoryStatus"
			:parentCategory="category"
			v-on:updateCategory="updateCategory"
			v-on:backParent="backParent"
		/>
	</div>
</template>

<script>
import ItemHeader from '../components/itemHeader'
import { Field, Button, Uploader } from 'vant'
import addParams from '../components/addParams'
import addQuality from '../components/addQuality'
import addCategory from './addCatagory'
import selects from '../components/select';
export default {
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		[Uploader.name]: Uploader,
		ItemHeader,
		addCategory,
		addParams,
		addQuality
	},
	async mounted () {
		let data = { type: 'goods', shop: this.goods.shop }
		let categoryRes = await this.$api.sendData('https://m.yixiutech.com/category/shop', data);
		categoryRes.data.map(item => {
			item['name'] == '二手手机' ? this.category = item['_id'] : null;
		})
		
		this.updateCategory();
	},
  data () {
		return {
			infosName: '发布宝贝',
			categoryStatus: false,
			paramStatus: false,
			qualityStatus: false,
			photo: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
			src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
			goods: {
				// shop: JSON.parse(localStorage.getItem('shopData'))._id,
				shop: '5ab93879d4e7f1497d58d94e',
				cover: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
				info: {
					photo: [{
						url: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'
					}],
					version: '',
					primeCost: '',
					present: '',
					assure: [],
					productParam: {},
					qualityParam: {}
				}
			},
			base: ['重庆'],
			categoryList: [],
			category: ''
		}
	},
	methods: {
		async uploadCover (event) {
			this.file = event.target.files[0];
			let url = window.URL.createObjectURL(this.file);

			this.goods.cover = url;

			let formdata = new FormData();

			formdata.append('file', this.file);

			let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}

			const toast = this.$createToast({
				txt: '加载中...'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/upload', formdata, config);
			this.goods.cover = res.data;
		},
		addParamInfo (data) {
			this.goods.info.productParam = data;
			this.paramStatus = false;
		},
		addQualityInfos (data) {
			this.goods.info.qualityParam = data;
			this.qualityStatus = false;
		},
		openQuality () {
			this.qualityStatus = true;
		},
		addParam () {
			this.paramStatus = !this.paramStatus
		},
		backToPublish() {
			this.qualityStatus = false;
			this.paramStatus = false;
		},
		back () {
			this.$router.push('/sellerHome');
		},
		backParent () {
			this.categoryStatus = false;
		},
		async updateCategory () {
			this.categoryStatus = false;
			let hasCategory = await this.$api.getData('https://m.yixiutech.com/category/parent/' + this.category);
			this.categoryList.length = 0;
			hasCategory.data.map(item => {
				this.categoryList.push({value: item._id, text: item.name});
			})
		},
		appendCategory () {
			this.categoryStatus = !this.categoryStatus;
			sessionStorage.setItem('category', 'goods');
		},
		async uploadFile (event, index) {
			this.file = event.target.files[0];
			let url = window.URL.createObjectURL(this.file);

			this.goods.info.photo[ index ].url = url;

			let formdata = new FormData();

			formdata.append('file', this.file);

			let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}

			const toast = this.$createToast({
				txt: '加载中...'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/upload', formdata, config);
			this.goods.info.photo[ index ].url = res.data;
		},
		addNew () {
			this.goods.info.photo.push({
				url: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'
			});
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
			if (goodRes.code !== 200) {
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
.infos {
	width: 100%;
	overflow: hidden;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
	text-align: center;
}

.infos__name {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15px;
	margin-top: 20px;
	font-size: 14px;
}

.infos__name p {
	width: 90px;
}

.infos .van-uploader {
	display: flex;
	justify-content: center;
	margin: 10px 0;
}

.infos .infos__img {
	width: 100px;
	height: 100px;
}

.btn {
	width: 80%;
	display: inline-block;
	color: #fff;
	background: #e0620d;
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
	margin-top: 10px;
}

.infos__name .cube-select {
	width: 60%;
}
</style>
