<template>
	<div>
		<div class="info">
			<item-header 
				:name="infoName"
				v-on:backParent="back"
			/>

			<div class="shadow" v-show="areaStatus"></div>

			<img class="info__logo" :src="logo" alt="" />

			<!-- <p class="head">身份证正面</p>

			<div class="upload">
				<input class="upload__select" @change="idcardUpload1($event, 'idcard1')" type="file" accept="image/*" />
				<img class="upload__show" :src="infos.certificate[0] ? infos.certificate[0].src : defaults" alt="" />
			</div>

			<p class="head">身份证反面</p>

			<div class="upload">
				<input class="upload__select" @change="idcardUpload2($event)" type="file" accept="image/*" />
				<img class="upload__show" :src="infos.certificate[1] ? infos.certificate[1].src : defaults" alt="" />
			</div>

			<p class="head">营业执照</p>

			<div class="upload">
				<input class="upload__select" @change="licenseUpload($event)" type="file" accept="image/*" />
				<img class="upload__show" :src="infos.certificate[2] ? infos.certificate[2].src : defaults" alt="" />
			</div>

			<p class="head">运营资格证书</p>

			<div class="upload">
				<input class="upload__select" @change="certificateUpload($event)" type="file" accept="image/*" />
				<img class="upload__show" :src="infos.certificate[3] ? infos.certificate[3].src : defaults" alt="" />
			</div>

			<p class="head">下载协议 <a class="link" href="http://t.cn/RnCHOyk">翼修入驻协议.docx</a></p>

			<p class="links">温馨提示: 如果上述链接点击不能下载，请复制以下链接到浏览器上进行下载!</p>

			<van-field
				label="翼修协议地址"
				placeholder="请勿删除协议地址"
				v-model="linkAddress"
			/>
			
			<p class="head">拍照上传翼修入驻协议</p>
			
			<div class="upload">
				<input class="upload__select" @change="protocolUpload($event, 'protocol')" type="file" accept="image/*" />
				<img class="upload__show" :src="infos.certificate[4] ? infos.certificate[4].src : defaults" alt="" />
			</div>-->

			<p class="head">商铺封面</p>

			<div class="upload">
				<input class="upload__select" @change="coverUpload($event)" type="file" accept="image/*" />
				<img class="upload__show" :src="infos.cover" alt="" />
			</div>

			<van-field
				v-model="infos.name"
				label="商铺名称"
				class="item"
				placeholder="请输入商铺名称"
			/>

			<van-field
				v-model="infos.contactNumber"
				label="联系电话"
				placeholder="请输入联系电话"
			/>

			<!-- <van-field
				v-model="infos.notice"
				label="店铺公告"
				placeholder="请输入输入店铺公告"
			/> -->

			<van-field
				v-model="area"
				label="所在地区"
				placeholder="请选择所在地区"
				@click="showArea"
			/>

			<van-field
				v-model="infos.address"
				label="详细地址"
				placeholder="如街道、楼层、门牌号等"
			/>

			<van-field
				v-model="managerPhone"	
				label="添加管理者"
				placeholder="请输入管理者的电话号码"
				@blur="searchId"
			/>

			<cube-button @click="addM">添加商铺管理者</cube-button>

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

			<div class="info-item">
				<p class="info-item__title">请选择服务方式</p>
			</div>

			<div class="service">
				<selects v-for="(item, index) in serviceWay"
					ref="child"
					@sendMsg="setData"
					@remove="removeData"
					:key="index"
					:data="item"
				/>
			</div>

			<cube-button @click="register">更新</cube-button>
		</div>

		<van-area 
				:area-list="areaList"
				v-show="areaStatus"
				@confirm="confirms"
				@cancel="cancels"
			/>
	</div>
  
</template>

<script>
import { Field, Uploader, Icon, Area } from 'vant'
import itemHeader from '../components/itemHeader'
import timeJson from '../data/data.json'
import logo from '@/assets/logo.png'
import file from '@/assets/file.png'
import selects from '../../sellerHome/components/select'
import areaList from '../../my/components/data/area.json'
export default {
	async mounted () {
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
		
		let userData = JSON.parse(sessionStorage.getItem('userData'));

		const toast = this.$createToast({
			txt: '加载中...',
			type: 'loading'
		})
		toast.show();
		let res = await this.$api.sendData('https://m.yixiutech.com/shop/user', { openid: userData.wx.openid })
		
		if (res.code == 200) {
			window.status = true;
			this.infos = res.data;
			let businessHours = this.infos.businessHours[0].split('-');
			this.startHour = businessHours[0].trim();
			this.endHour = businessHours[1].trim();
			this.area = this.infos.address.split('-')[0];
			this.infos.address = this.infos.address.split('-')[1];
			
			this.$refs.child.filter(item => {
				if(this.infos.serviceWay.includes(item.data))  {
					item.selectOn();
				}
			})
		}
		toast.hide();
		window.status = false;
	},
	components: {
		[Field.name]: Field,
		[Uploader.name]: Uploader,
		[Icon.name]: Icon,
		[Area.name]: Area,
		selects,
		itemHeader
	},
	data () {
		return {
			infoName: '更新店铺信息',
			startHour: '',
			areaList: areaList,
			areaStatus: false,
			linkAddress: 'http://t.cn/RnCHOyk',
			managerPhone: '',
			area: '选择身份  选择城市  选择地区',
			endHour: '',
			users: [{
				name: ''
			}],
			tempPhone: '',
			serviceWay: ['用户到店', '上门维修', '线上快递'],
			logo: logo,
			files: file,
			defaults: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
			file: file,
			infos: {
				name: '',
				cover: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png',
				moblie: '',	
				serviceWay: [],
				businessHours: [],
				promotion: [
					{condition: '', denomination: ''}
				],
				ownerOpenid: JSON.parse(sessionStorage.getItem('userData')).wx.openid,
				certificate: []
			},
			time: timeJson,
			money: ''
		}
	},
	methods: {
		async searchId () {
			let user = await this.$api.getData('https://m.yixiutech.com/user/mobile/' + this.managerPhone);
			if (user.code !== 200) {
				this.prompt(user.errMsg, 'error').show();
				return;
			}

		},
		showArea () {
			this.areaStatus = true;
			// let top = window.innerHeight
		},
		confirms (value) {
			let province = value[0].name;
			let city = value[1].name;
			let area = value[2].name;
			this.area = `${province} ${city} ${area}`;
			this.areaStatus = false;
		},
		cancels () {
			this.areaStatus = false;
		},
		back () {
			this.$router.push('/sellerHome');
		},
		addM () {
			this.infos.user.push({});
		},
		async addManager (index) {
			let userInfo = await this.$api.getData('https://m.yixiutech.com/user/mobile/' + this.tempPhone);
			userInfo.code == 200 ? this.infos.user[ index ] = userInfo.data._id : null;
		},
		setData (data) {
			this.infos.serviceWay.push(data);
			console.log(this.infos.serviceWay);
		},
		removeData (data) {
			this.infos.serviceWay.map( (item, index) => {
				if ( item == data ) { 
					this.infos.serviceWay.splice(index, 1)
				}
			})
		},
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
			this.file = event.target.files[0];
			this.uploadPic(this.file, 'cover');
		},
		protocolUpload (event, name) {
			this.infos.certificate.push({ name: 'protocol', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png' })
			this.file = event.target.files[0];
			this.uploadPic(this.file, 'protocol');
		},
		async idcardUpload1 (event, name) {
			this.infos.certificate.push({ name: 'idcard1', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png' })
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'idcard1');
		},
		async idcardUpload2 (event) {
			this.infos.certificate.push({ name: 'idcard2', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  })
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'idcard2');
		},
		async licenseUpload (event) {
			this.infos.certificate.push({ name: 'license', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  })
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'license');
		},
		async certificateUpload (event) {
			this.infos.certificate.push({ name: 'certificate', src: 'https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/camera.png'  })
			this.file = event.target.files[0];

			this.uploadPic(this.file, 'certificate');
		},
		add () {
			this.infos.promotion.push({condition: '', denomination: ''});
		},
		async register () {
			if (this.infos.serviceWay.length == 0) {
				this.prompt('请至少选择一个服务方式', 'error').show();
				return;
			}
			this.infos.address = this.area + '-' + this.infos.address;
			const toast = this.$createToast({
				txt: '加载中...',
				type: 'loading'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/shop/update', this.infos);
			toast.hide();
			if (res.code !== 200) {
				alert(res.errMsg);
				return;
			}
			this.prompt('修改成功', 'success').show();
			this.$router.push('/sellerHome');
		},
		start () {
			this.startPicker.show()
		},
		finish () {
			this.endPicker.show()
		}
	}
}

</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
}

.info {
		width: 100%;
    position: absolute;
    left: 50%;
		background: #eee;
    transform: translate(-50%);
		text-align: center;
		overflow: hidden;
}

.van-area {
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 21;
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:space-around;
}

.links {
	color: #ec3030;
	text-align: left;
	padding: 2%;
}

.info .info__logo {
	width: 200px;
	display: inline-block;
}

.condition {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.link {
	margin-left: 20px;
	font-size: 16px;
	color: red;
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
	z-index: 8;
	font-size: 50px;
	opacity: 0;
	left: 0;
}

.info-item {
	padding: 10px 15px;
	display: flex;
	color: #000;
	align-items: center;
	justify-content: flex-start;
}

.info-item .info-item__content {
	margin-left: 50px;
}

.cube-btn {
	background: #e0620d;
	border-radius: 5px;
	margin: 10px 0;
	display: inline-block;
	width: 60%;
}


.van-field__control {
	background: transparent;
}

.shadow {
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	position: absolute;
	left: 0;
	top: 0;
	z-index: 20;
}

.info .head {
	padding: 10px 15px;
	text-align: left;
	color: #000;
}

.info .van-uploader {
	display: flex;
	justify-content: center;
}

.info .info__btn {
	width: 100%;
	margin-top: 30px;
	padding: 20px 0;
	color: #000;
	background: #e0620d;
	border-radius: 10px;
	border: 2px solid #000;
}

.info .van-field {
	background: transparent;
	color: #000;
	font-size: 1em;
}

.info .info__tip {
	font-size: 20px;
	margin-top: 30px;
}

.info__tip a {
	color: #000;
}

.info__tip .tip__pwd {
	float: left;
}

.info__tip .tip__register {
	float: right;
}

.register {
	background: #ec3030;
}

.svg-icon {
	position: absolute;
	left: 20px;
	top: 40px;
}
</style>