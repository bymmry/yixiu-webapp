<template>
  <div class="arrondi">
		<p class="arrondi__title">{{ title }}</p>
		<div class="arrondi__cotent">
			<ArrondiItem v-for="(item, index) in ios" :key="index"
				:name="item.name"
				:src="item.src"
				:price="item.price"
				:primeCost="item.primeCost"
				:icon="item.icon"
			/>
		</div>
  </div>
</template>

<script>
	import ArrondiItem from './arrondiItem.vue'
  export default {
    props: {
			title: String
		},
		components: {
			ArrondiItem
		},
		data () {
			return {
				ios: [
					{ name: 'iPhone X', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0', price: '6500', primeCost: '8999', icon: 'phone'  },
					{ name: 'iPhone X', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0', price: '6500', primeCost: '8999', icon: 'phone'  },
					{ name: 'iPhone X', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0', price: '6500', primeCost: '8999', icon: 'phone'  },
					{ name: 'iPhone X', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0', price: '6500', primeCost: '8999', icon: 'phone'  },
				]
			}
		}
  }
</script>

<style scoped>
.arrondi__title {
	text-align: center;
	padding: 10px 0;
}

.arrondi__cotent {
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>