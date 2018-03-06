<template>
  <div class="info">

		<van-field
			v-model="infos.name"
			label="商铺名称"
			placeholder="请输入商铺名称"
		/>

		<p class="head">商铺封面</p>

		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
			<sicon name="camera" scale="10"></sicon>
		</van-uploader>

		<van-field
			v-model="infos.contactNumber"
			label="联系电话"
			placeholder="请输入联系电话"
		/>


		<cube-button @click="startPicker">选择开始营业时间</cube-button>

		<cube-button @click="endPicker">选择结束营业时间</cube-button>

		<van-field
			v-model="infos.serviceWay"
			label="服务方式"
			placeholder="请输入支持的服务方式，用逗号隔开"
		/>

		

		<!-- <van-field
			v-model="infos.contactNum"
			label="联系电话"
			placeholder="请输入联系电话"
		/> -->
		
		<button class="info__btn" @click="register">注册</button>
  </div>
</template>

<script>
import InfoItem from './infoItem'
import { Field, Uploader } from 'vant'
import timeJson from '../data/data.json'
export default {
	mounted () {
		this.startPicker = this.$createPicker({
      title: '选择开始营业时间',
      data: [this.time],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.startHour = `${ selectedVal[0] }:00`;
      },
      onCancel: () => {
        
      }
		})
		this.endPicker = this.$createPicker({
      title: '选择结束营业时间',
      data: [this.time],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
				this.endHour = `${ selectedVal[0] }:00`
				this.infos.businessHours.push(this.startHour + ' - ' + this.endHour);
				console.log(this.infos)
      },
      onCancel: () => {
        
      }
		})
	},
	components: {
		[Field.name]: Field,
		[Uploader.name]: Uploader
	},
	data () {
		return {
			options: ['手机', '电脑', '家电'],
			startHour: '',
			endHour: '',
			infos: {
				name: '',
				cover: '',
				contactNumber: '',
				service: '',
				businessHours: []
			},
			time: timeJson,

		}
	},
	methods: {
		async register () {
			let res = this.$ajax.post('https://yixiu.natappvip.cc/shop', this.infos);
			console.log(111);
			console.log(res);
				// .then(response => {
				// 	console.log(response);
				// }).catch(error => {
				// 	console.log(error);
				// })
		},
		onRead(file) {
			this.infos.cover = file.content;
		},
		startPicker () {
      this.startPicker.show()
		},
		endPicker () {
			this.endPicker.show()
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