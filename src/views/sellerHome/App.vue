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
					{ name: '添加手机维修服务', icon: 'fuwu', link: '/addServices' },
					{ name: '二手手机交易', icon: 'publish', link: '/publishPhone' },
					{ name: '完善信息', icon: 'identification', link: '/updateMsg' },
					{ name: '缴纳保证金', icon: 'baozhengjin', link: '/payBail' }
				],
				shopData: {}
			}
		},
		async mounted () {
			this.shopData = JSON.parse(localStorage.getItem('shopData'))

			// let data = { shop: '5a9fe2a27c67ee2f8c98c9d5', state: 12 }
			// let res = await this.$api.sendData('https://yixiu.natappvip.cc/order/service/filter', data);
		},
  }
</script>

<style scoped>

</style>
