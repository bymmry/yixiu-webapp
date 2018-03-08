<template>
  <div class="seller">
		<Header 
			:sellerName="sellerName"
		/>
		<List/>

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
				content: [
					{ name: '统计', icon: 'pv', link: '/pv' },
					{ name: '添加手机品牌', icon: 'pv', link: '/addBrand' },
					{ name: '添加手机型号', icon: 'pv', link: '/addModel' },
					{ name: '添加手机类型', icon: 'pv', link: '/addCatagory' },
					{ name: '添加手机服务', icon: 'pv', link: '/addService' }
				]
			}
		},
		mounted () {
			!this.isRegister && this.$router.push('/businessRegister');
		}
  }
</script>

<style scoped>

</style>