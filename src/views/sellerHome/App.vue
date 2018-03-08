<template>
  <div class="seller">
		<Header 
			:sellerName="sellerName"
		/>
		<List 
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
				sellerName: '小姐姐家的店',
				isRegister: true,
				state: '',
				content: [
					{ name: '统计', icon: 'pv', link: '/pv' },
					{ name: '添加手机品牌', icon: 'brand', link: '/addBrand' },
					{ name: '添加手机型号', icon: 'xinghao', link: '/addModel' },
					{ name: '添加手机类型', icon: 'leixing', link: '/addCatagory' },
					{ name: '添加手机服务', icon: 'fuwu', link: '/addService' },
					{ name: '二手手机交易', icon: 'publish', link: '/publishPhone' }
				]
			}
		},
		async mounted () {
			!this.isRegister && this.$router.push('/businessRegister');
			
			// let data = { shop: '5a9fe2a27c67ee2f8c98c9d5', state: 12 }
			// let res = await this.$api.sendData('https://yixiu.natappvip.cc/order/service/filter', data);
		},
  }
</script>

<style scoped>


</style>
