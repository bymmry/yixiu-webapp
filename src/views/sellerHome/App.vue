<template>
  <div class="seller">
		<Header 
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
		 <!-- 删除店铺信息按钮 慎用 -->
		 <!-- <button @click="deleteData">删除</button> -->
  </div>
</template>

<script>
	import Header from './components/header.vue'
	import List from './components/list.vue'
	import Content from './components/content.vue'
  export default {
    components: {
			Header,
			List,
			Content
		},
		data () {
			return {
				isRegister: true,
				state: '',
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
		async mounted () {
			this.shopData = JSON.parse(localStorage.getItem('shopData'))

			// let data = { shop: '5a9fe2a27c67ee2f8c98c9d5', state: 12 }
			// let res = await this.$api.sendData('https://yixiu.natappvip.cc/order/service/filter', data);
		},
		// 删除店铺信息  慎用
		methods: {
			async deleteData(){
				let req = {
					_id: "5ab5b665e705c235f6fa0e52"
				}
				let res = await this.$api.sendData('https://m.yixiutech.com/shop/delete', req);
				console.log(res);
			}
		}
  }
</script>

<style scoped>

</style>
