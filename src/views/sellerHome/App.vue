<template>
  <div class="seller">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-show="!waitStatus">
			<Header
				:shopData="shopData"
			/>
			<List 
				:shopData="shopData"
				:modules="modules"
			/>
			<Content v-for="(item, index) in content" :key="index"
				:name="item.name"
				:icon="item.icon"
				:link="item.link"
			/>
		</van-pull-refresh>

		<wait
			v-show="waitStatus"
		/>
		 
		 <!-- 删除店铺信息按钮 慎用 -->
		 <!-- <button @click="deleteData">删除</button> -->
  </div>
</template>

<script>
	import { PullRefresh } from 'vant';
	import Header from './components/header.vue'
	import List from './components/list.vue'
	import Content from './components/content.vue'
	import defaults from '@/assets/default.jpg'
	import wait from '../businessRegister/pages/wait.vue'
  export default {
    components: {
			Header,
			List,
			Content,
			wait,
			[PullRefresh.name]: PullRefresh
		},
		data () {
			return {
				isRegister: true,
				state: '',
				waitStatus: false,
				isLoading: false,
				content: [
					// { name: '添加手机维修服务', icon: 'fuwu', link: '/service' },
					// { name: '查看手机服务列表', icon: 'view', link: '/viewServices' },
					// { name: '修改手机维修服务', icon: 'update', link: '/updateService' },
					// { name: '二手手机交易', icon: 'publish', link: '/publishPhone' },
					// { name: '删除已发布二手手机', icon: 'delete', link: '/deletePhone' },
					// { name: '完善信息', icon: 'identification', link: '/updateMsg' },
					// { name: '缴纳保证金', icon: 'baozhengjin', link: '/payBail' },
					// { name: '商家钱包', icon: 'wallet', link: '/shopWallet' }
				],
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				modules: [
					{ name: '待接单', num: 0, state: 11},
					{ name: '维修中', num: 0, state: 12 },
					{ name: '已完成', num: 0, state: 13 },
					{ name: '浏览量', num: 0, state: 0 }
				],
				shopData: {}
			}
		},
		watch: {
			shopData: function(val){
				this.shopData = val;
			}
		},
		// async created () {
		// 	// let data = { shop: '5a9fe2a27c67ee2f8c98c9d5', state: 12 }
		// 	// let res = await this.$api.sendData('https://yixiu.natappvip.cc/order/service/filter', data);
		// },
		// 删除店铺信息  慎用
		async created () {
			const toast = this.$createToast({
				txt: '加载中...',
				type: 'loading'
			})
			toast.show();
			let userData = JSON.parse(this.urlDataTurnObj(window.location.href)).openid;
			userData !== undefined ? localStorage.setItem('openid', userData) : null;
			let openid = localStorage.getItem('openid');
				
			// let userData = sessionStorage.getItem('userData');
			let res = await this.$api.sendData('https://m.yixiutech.com/shop/user/', {openid: openid});
			this.shopData = res.data;
			toast.hide();

			if (res.data.qualificationState !== '正常') {
				this.waitStatus = true;
				return;
			}


			if (res.data.pay) { //已缴纳保证金
				this.content = [
					{ name: '添加手机维修服务', icon: 'fuwu', link: '/service' },
					{ name: '查看手机服务列表', icon: 'view', link: '/viewServices' },
					{ name: '修改手机维修服务', icon: 'update', link: '/updateService' },
					// { name: '二手手机交易', icon: 'publish', link: '/publishPhone' },
					// { name: '删除已发布二手手机', icon: 'delete', link: '/deletePhone' },
					{ name: '完善信息', icon: 'identification', link: '/updateMsg' },
					{ name: '商家钱包', icon: 'wallet', link: '/shopWallet' }
				];
			} else { // 未缴纳保证金
				this.content = [
					{ name: '缴纳保证金', icon: 'baozhengjin', link: '/payBail' }
				]
				this.prompt('您还未缴纳保证金，请缴纳保证金', 'error').show()
			}

			// this.modules.slice(0, 3).map( async item => {
			// 	let res = await this.$api.sendData('https://m.yixiutech.com/order/service/filter', { shop: this.shop, state: item.state });
			// 	item.num = res.data.length;
			// })
			this.modules[3].num = this.shopData.pv;
		},
		methods: {
			async onRefresh() {
				let userData = JSON.parse(this.urlDataTurnObj(window.location.href)).openid;
				userData !== undefined ? localStorage.setItem('openid', userData) : null;
				let openid = localStorage.getItem('openid');
				
					
				// let userData = sessionStorage.getItem('userData');
				let res = await this.$api.sendData('https://m.yixiutech.com/shop/user/', {openid: openid});

				this.shopData = res.data;

				if (res.data.qualificationState !== '正常') {
					this.waitStatus = true;
          return;
        }

				if (res.data.pay) { //已缴纳保证金
					this.content = [
						{ name: '添加手机维修服务', icon: 'fuwu', link: '/service' },
						{ name: '查看手机服务列表', icon: 'view', link: '/viewServices' },
						{ name: '修改手机维修服务', icon: 'update', link: '/updateService' },
						// { name: '二手手机交易', icon: 'publish', link: '/publishPhone' },
						// { name: '删除已发布二手手机', icon: 'delete', link: '/deletePhone' },
						{ name: '完善信息', icon: 'identification', link: '/updateMsg' },
						{ name: '商家钱包', icon: 'wallet', link: '/shopWallet' }
					];
				} else { // 未缴纳保证金
					this.content = [
						{ name: '缴纳保证金', icon: 'baozhengjin', link: '/payBail' }
					]
					this.prompt('您还未缴纳保证金，请缴纳保证金', 'error').show();
				}
				this.modules.slice(0, 3).map( async item => {
					let res = await this.$api.sendData('https://m.yixiutech.com/order/service/filter', { type: 0, shop: this.shop, state: item.state });
					item.num = res.data.length;
				})
				this.modules[3].num = JSON.parse(localStorage.getItem('shopData')).pv;
				// this.$toast('刷新成功');
				this.isLoading = false;
			},
			async deleteData(){
				// 删除店铺
				let req = {
					_id: "5ac3b078bcbe58709c9bd427"
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
	.seller{
		width: 100vw;
		height: 100vh;
	}
</style>
