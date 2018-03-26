<template>
  <div class="seller">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<Header 
				v-if="shopData"
				:shopData="shopData"
			/>
			<List 
				:shopData="shopData"
			/>
			<Content v-for="(item, index) in content" :key="index"
				:name="item.name"
				:icon="item.icon"
				:link="item.link"
			/>
		</van-pull-refresh>

		 
		 <!-- 删除店铺信息按钮 慎用 -->
		 <!-- <button @click="deleteData">删除</button> -->
  </div>
</template>

<script>
	import { PullRefresh } from 'vant';
	import Header from './components/header.vue'
	import List from './components/list.vue'
	import Content from './components/content.vue'
  export default {
    components: {
			Header,
			List,
			Content,
			[PullRefresh.name]: PullRefresh
		},
		data () {
			return {
				isRegister: true,
				state: '',
				isLoading: false,
				content: [
					{ name: '添加手机维修服务', icon: 'fuwu', link: '/service' },
					{ name: '查看手机服务列表', icon: 'view', link: '/viewServices' },
					{ name: '修改手机维修服务', icon: 'update', link: '/updateService' },
					{ name: '二手手机交易', icon: 'publish', link: '/publishPhone' },
					{ name: '删除已发布二手手机', icon: 'phone', link: '/deletePhone' },
					{ name: '完善信息', icon: 'identification', link: '/updateMsg' },
					{ name: '缴纳保证金', icon: 'baozhengjin', link: '/payBail' },
					{ name: '商家钱包', icon: 'wallet', link: '/shopWallet' }
				],
				shopData: {}
			}
		},
		watch: {
			shopData: function(val){
				this.shopData = val;
			}
		},
		async created () {
			let userData = JSON.parse(sessionStorage.getItem('userData'));
			console.log(userData);
			let res = await this.$api.sendData('https://m.yixiutech.com/shop/user/', {openid: userData.wx.openid});
			if(res.code == 200){
				this.shopData = res.data;
				console.log(this.shopData);
			}

			// let data = { shop: '5a9fe2a27c67ee2f8c98c9d5', state: 12 }
			// let res = await this.$api.sendData('https://yixiu.natappvip.cc/order/service/filter', data);
		},
		// 删除店铺信息  慎用
		methods: {
			async onRefresh() {
				let userData = JSON.parse(sessionStorage.getItem('userData'));
				let res = await this.$api.sendData('https://m.yixiutech.com/shop/user/', {openid: userData.wx.openid});
				this.shopData = res.data;
				this.$toast('刷新成功');
				this.isLoading = false;
			},
			async deleteData(){
				// 删除店铺
				let req = {
					_id: "5ab8d008d4e7f1497d58d925"
				}
				let res = await this.$api.sendData('https://m.yixiutech.com/shop/delete', req);
				console.log(res);

				//删除手机型号
				// let req = {
				// 	_id: "5ab8afbbd4e7f1497d58d906",
				// 	shop: "5ab8ae16d4e7f1497d58d8fc"
				// }
				// let res = await this.$api.sendData('https://m.yixiutech.com/phone/model/delete', req);
				// console.log(res);

				//删除分类
				// let req = {
				// 	_id: "5ab8d946d4e7f1497d58d92a"
				// }
				// let res = await this.$api.sendData('https://m.yixiutech.com/category/delete', req);
				// console.log(res);

			}
		}
  }
</script>

<style scoped>

</style>
