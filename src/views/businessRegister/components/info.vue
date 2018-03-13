<template>
  <div class="info">

		<van-field
			v-model="infos.name"
			label="商铺名称"
			class="item"
			placeholder="请输入商铺名称"
		/>

		<p class="head">身份证正面</p>

		<!-- <cube-upload
			action="//jsonplaceholder.typicode.com/photos/"
			@files-added="filesAdded" 
		/> -->

		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg" result-type="//jsonplaceholder.typicode.com/photos/">
			<img :src="infos.ID1" class="info__img" alt="">
		</van-uploader>

		<p class="head">身份证背面</p>

		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
			<img :src="infos.ID2" class="info__img" alt="">
		</van-uploader>

		<p class="head">营业执照</p>

		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
			<img :src="infos.License" class="info__img" alt="">
		</van-uploader>

		<p class="head">商户证书</p>

		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
			<img :src="infos.certificate" class="info__img" alt="">
		</van-uploader>

		<p class="head">商铺封面</p>

		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
			<img :src="infos.cover" class="info__img" alt="">
		</van-uploader>

		<van-field
			v-model="infos.contactNumber"
			label="联系电话"
			placeholder="请输入联系电话"
		/>

		<div class="info-item">
			<p class="info-item__title">开始营业时间</p>
			<p class="info-item__content">{{ startHour }}</p>
		</div>
		

		<cube-button @click="start">选择开始营业时间</cube-button>

		<div class="info-item">
			<p class="info-item__title">结束营业时间</p>
			<p class="info-item__content">{{ endHour }}</p>
		</div>

		<cube-button @click="finish">选择结束营业时间</cube-button>

		<div class="condition" v-for="(item, index) in infos.promotion" :key="index">
			<van-field
				v-model="item.condition"
				class="full-cut"
				label="满减条件"
				placeholder="满减条件"
			/>

			<van-field
				v-model="item.denomination"
				class="full-cut"
				label="满减额度"
				placeholder="满减额度"
			/>
		</div>

		<cube-button @click="add">添加满减条件</cube-button>

		<van-field
			v-model="serviceWay"
			label="服务方式"
			placeholder="请输入支持的服务方式，用中文逗号隔开"
			@blur="serviceBlur"
		/>

		<div id="allmap"></div>

		<cube-button @click="register">注册</cube-button>
  </div>
</template>

<script>
import InfoItem from './infoItem'
import { Field, Uploader, Icon } from 'vant'
import timeJson from '../data/data.json'
export default {
	mounted () {
		this.startPicker = this.$createPicker({
      title: '选择开始营业时间',
      data: [this.time],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.startHour = `${ selectedVal[0] }:00`;
      }
		})
		this.endPicker = this.$createPicker({
      title: '选择结束营业时间',
      data: [this.time],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
				this.endHour = `${ selectedVal[0] }:00`
				this.infos.businessHours.push(this.startHour + ' - ' + this.endHour);
				console.log(this.infos)
      }
		})
		this.initPosition();
	},
	components: {
		[Field.name]: Field,
		[Uploader.name]: Uploader,
		[Icon.name]: Icon
	},
	data () {
		return {
			startHour: '',
			endHour: '',
			serviceWay: '',
			infos: {
				name: '',
				cover: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
				contactNumber: '',
				serviceWay: [],
				position: {
					lng: '',
					lat: ''
				},
				businessHours: [],
				promotion: [
					{condition: '', denomination: ''}
				],
				ownerOpenid: JSON.parse(sessionStorage.getItem('userData')).wx.openid
			},
			time: timeJson,
			money: ''
		}
	},
	methods: {
		serviceBlur () {
			this.infos.serviceWay = this.serviceWay.split('，');
		},
		filesAdded(files) {
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
        }
			}
		},
		add () {
			this.infos.promotion.push({condition: '', denomination: ''});
		},
		async register () {
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let res = await this.$ajax.post('https://m.yixiutech.com/shop', this.infos);
			toast.hide();
			if (res.code == 4001) {
				alert(res.errMsg);
				return;
			}
		},
		onRead(file) {
			console.log(file);
			this.infos.cover = file.content;
		},
		start () {
			this.startPicker.show()
		},
		finish () {
			this.endPicker.show()
		},
		initPosition () {
			let map = new BMap.Map("allmap");
			let point = new BMap.Point(116.331398,39.897445);
			map.centerAndZoom(point,12);

			let _this = this;

			let geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					_this.city = r.address.city;
					_this.infos.position.lng = r.point.lng;
					_this.infos.position.lat = r.point.lat;
					
				}
				else {
					alert('failed'+this.getStatus());
				}
			},{enableHighAccuracy: true})
		}
	}
}
</script>

<style scoped>
.info {
    width: 100%;
    position: absolute;
    left: 50%;
    margin-top: 40px;
    transform: translate(-50%);
}
.condition {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.full-cut {
	width: 48%;
}

.info .info__img {
	width: 100px;
	height: 80px;
}

.info-item {
	padding: 10px 15px;
	display: flex;
	color: #fff;
	align-items: center;
	justify-content: flex-start;
}

.info-item .info-item__content {
	margin-left: 50px;
}

.cube-btn {
	background: transparent;
	border: 2px solid #fff;
	border-radius: 5px;
	margin: 10px 0;
}

.van-field__control {
	background: transparent;
}

.info .head {
	padding: 10px 15px;
	color: #fff;
}

.info .van-uploader {
	display: flex;
	justify-content: center;
}

.info .info__btn {
	width: 100%;
	margin-top: 30px;
	padding: 20px 0;
	color: #fff;
	background: transparent;
	border-radius: 10px;
	border: 2px solid #fff;
}

.info .van-field {
	background: transparent;
	color: #fff;
	font-size: 1em;
}

.info .info__tip {
	font-size: 20px;
	margin-top: 30px;
}

.info__tip a {
	color: #fff;
}

.info__tip .tip__pwd {
	float: left;
}

.info__tip .tip__register {
	float: right;
}
</style>