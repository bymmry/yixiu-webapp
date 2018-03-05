<template>
  <div class="info">
		<div v-if="active === 0">
			<p class="info__title">添加手机品牌</p>

			<!-- <van-checkbox-group v-model="phoneRes" >
				<van-cell-group>
					<van-cell v-for="(item, index) in phone" :key="index">
						<van-checkbox :name="item.name">{{ item.name }}</van-checkbox>
					</van-cell>
				</van-cell-group>
			</van-checkbox-group> -->

			<cube-select
				v-model="phoneRes"
				:options="phone"
				@change="change"
			/>

		</div>
		<div v-if="active === 1">
			<p class="info__title">添加手机型号</p>

			<van-checkbox-group v-model="phoneModelRes" >
				<van-cell-group>
					<van-cell v-for="(item, index) in phoneModel" :key="index">
						<van-checkbox :name="item">{{ item }}</van-checkbox>
					</van-cell>
				</van-cell-group>
			</van-checkbox-group>

		</div>
		<div v-if="active === 2">
			<p class="info__title">添加手机维修服务</p>

			<van-checkbox-group v-model="serviceRes" >
				<van-cell-group>
					<van-cell v-for="(item, index) in service" :key="index">
						<van-checkbox :name="item">{{ item }}</van-checkbox>
					</van-cell>
				</van-cell-group>
			</van-checkbox-group>

		</div>
		
		<van-button size="large" @click="next">下一步</van-button>
		<div class="space"></div>
  </div>
</template>

<script>
import { Field, Button, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'
export default {
	components: {
		[Field.name]: Field,
		[Button.name]: Button,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup
	},
	data () {
		return {
			active: 1,
			phone: [],
			alias: {},
			phoneRes: '',
			phoneModel: ['iPhone X', 'iPhone 8', 'iPhone 7', 'iPhone 6', 'iPhone SE'],
			phoneModelRes: [],
			service: ['电池电源', '屏幕问题', '摄像头问题', '声音问题', '按键问题', '外壳问题', '信号|有线|无线'],
			serviceRes: [],
			manufacturer: ''
		}
	},
	mounted () {
		let _this = this;
		this.$ajax.get('https://m.yixiutech.com/phone/manufacturer')
			.then( response => {
				let res = response.data;
				res.map(item => {
					_this.phone.push(item.name);
					_this.alias.push(item.alias);
				})
				console.log(_this.phone)
			}).catch( error => {
				console.log(error)
			})
	},
	methods: {
		 change(value, index) {
			this.phoneRes = { name: value, alias: this.alias[ index ] }
    },
		async next () {
			this.submitByType();
			this.active++;
		},
		submitByType () {
			switch (this.active) {
				case 0:
					this.ajax('https://m.yixiutech.com/phone/manufacturer', this.phoneRes);
					break;
				case 1:
					this.ajax('https://m.yixiutech.com/phone/model', this.phoneModelRes);
					break;
				case 2:
					this.ajax('https://m.yixiutech.com/service', this.serviceRes);
					break;
			}
		},
		ajax (url, data) {
			this.$ajax.post(url, data)
				.then((response) => {
					console.log(response)
				}).catch((error) => {
					console.log(error);
				})
		}
	}
}
</script>

<style scoped>
.info .info__title {
	margin-left: 10px;
}

.info .van-button {
	margin-top: 30px;
}

.info .cube-select {
	margin: 20px 0;
}

.space {
	width: 100%;
	height: 8vh;
}
</style>


// 