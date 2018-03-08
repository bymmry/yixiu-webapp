<template>
  <div class="info">
		
		
		
		
		
		<van-button size="large" @click="next">{{ nextText }}</van-button>
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
			categoryList: ['平台板块', '维修服务', '普通商品'],
			shop: '5a9fe2a27c67ee2f8c98c9d5',
			manufacturer: '',
			
			
			supportList: ['1', '2']
		}
	},
	async mounted () {
		


	},
	methods: {
		
		handle(res) {
			if (res.code == 4001) {
				this.createToast(res.errMsg, 'error').show();
				return;
			}
			this.active++;
		},
		async next () {
			switch (this.active) {
				case 0:
					let phoneRes = await this.$api.sendData('https://m.yixiutech.com/phone/manufacturer', this.phoneRes);
					this.handle(phoneRes);
					
					break;
				case 1:
					let modelRes = await this.$api.sendData('https://m.yixiutech.com/phone/model', this.phoneModelRes);
					this.handle(modelRes);
					break;
				case 2:
					
					this.handle(categoryRes);
					let supportRes = await this.$api.postData('https://m.yixiutech.com/phone/model/shop', { shop: this.shop, manufacturer: this.manufacturer });
					console.log(supportRes);
					break;
				case 3: 
					this.service['shop'] = this.shop;
					this.service['catagory'] = 1;
					let finish = await this.$api.sendData('https://m.yixiutech.com/service', this.service);
					
					break;
			}
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