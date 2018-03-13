<template>
  <div class="info">

		<van-field
			v-model="infos.name"
			label="商铺名称"
			class="item"
			placeholder="请输入商铺名称"
		/>

		<p class="head">身份证正面</p>

		<div class="upload">
			<input class="upload__select" @change="idcardUpload1($event, 'idcard1')" type="file" accept="image/*" />
			<img class="upload__show" :src="infos.certificate[0].src" alt="" />
		</div>

		<p class="head">身份证反面</p>

		<div class="upload">
			<input class="upload__select" @change="idcardUpload2($event)" type="file" accept="image/*" />
			<img class="upload__show" :src="infos.certificate[1].src" alt="" />
		</div>

		<p class="head">营业执照</p>

		<div class="upload">
			<input class="upload__select" @change="licenseUpload($event)" type="file" accept="image/*" />
			<img class="upload__show" :src="infos.certificate[2].src" alt="" />
		</div>

		<p class="head">运营资格证书</p>

		<div class="upload">
			<input class="upload__select" @change="certificateUpload($event)" type="file" accept="image/*" />
			<img class="upload__show" :src="infos.certificate[3].src" alt="" />
		</div>

		<p class="head">商铺封面</p>

		<div class="upload">
			<input class="upload__select" @change="coverUpload($event)" type="file" accept="image/*" />
			<img class="upload__show" :src="infos.cover" alt="" />
		</div>

		<van-field
			v-model="infos.contactNumber"
			label="联系电话"
			placeholder="请输入联系电话"
		/>

		<van-field
			v-model="infos.address"
			label="商铺地址"
			placeholder="请输入商铺详细地址"
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
				ownerOpenid: JSON.parse(sessionStorage.getItem('userData')).wx.openid,
				certificate: [
					{ name: 'idcard1', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  },
					{ name: 'idcard2', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  },
					{ name: 'license', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  },
					{ name: 'certificate', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  }
				]
			},
			time: timeJson,
			money: ''
		}
	},
	methods: {
		async uploadPic (pic, name) {
			let formdata = new FormData();

			formdata.append('file', pic);

			let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}

			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/upload', formdata, config);
			toast.hide();

			this.infos.certificate.map( item => item.name == name ? item.src = res.data : null );

			name == 'cover' ? this.infos.cover = res.data : null;
		},
		coverUpload (event, name) {
			console.log(name);
			this.file = event.target.files[0];
			this.uploadPic(this.file, 'cover');
		},
		async idcardUpload1 (event, name) {
			console.log(name);
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'idcard1');
		},
		async idcardUpload2 (event) {
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'idcard2');
		},
		async licenseUpload (event) {
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'license');
		},
		async certificateUpload (event) {
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'certificate');
		},
		serviceBlur () {
			this.infos.serviceWay = this.serviceWay.split('，');
		},
		add () {
			this.infos.promotion.push({condition: '', denomination: ''});
		},
		async register () {
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/shop', this.infos);
			toast.hide();
			if (res.code == 4001) {
				alert(res.errMsg);
				return;
			}
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
	width: 100%;
	z-index: 8;
	font-size: 50px;
	opacity: 0;
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