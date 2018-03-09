<template>
  <div class="info">

		<van-field
			v-model="infos.name"
			label="商铺名称"
			placeholder="请输入商铺名称"
		/>

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

		<van-field
			v-model="infos.serviceWay"
			label="服务方式"
			placeholder="请输入支持的服务方式，用逗号隔开"
		/>

		<div id="allmap"></div>
		
		<button class="info__btn" @click="register">注册</button>
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
			infos: {
				name: '',
				cover: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3146109938,3614262430&fm=27&gp=0.jpg',
				contactNumber: '',
				serviceWay: '',
				position: {
					lng: '',
					lat: ''
				},
				businessHours: []
			},
			time: timeJson
		}
	},
	methods: {
		async register () {
			let res = await this.$ajax.post('https://yixiu.natappvip.cc/shop', this.infos);
			if (res.code == 4001) {
				alert(res.errMsg);
				return;
			}
			this.$router.push('/sellerHome');
		},
		onRead(file) {
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

			function getLoaction (res) {
				let city = res.name;
				map.setCenter(city);
				_this.city = city;
			}

			const myCity = new BMap.LocalCity();
			myCity.get(getLoaction);

			let geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
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

.info .info__img {
	width: 100px;
	height: 100px;
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