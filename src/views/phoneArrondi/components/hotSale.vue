<template>
  <div class="hot-sale">
		<p class="hot-sale__title">品牌特卖</p>
    <van-tabs :active="active">
			<van-tab v-for="(item, index) in hotSale" :title="'选项'+ index" :key="index">
					<HotSaleItem v-for="(item, index) in data" :key="index"
						:src="item.src"
						:name="item.name"
						:price="item.price"
					/>
			</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import HotSaleItem from './hotSaleItem'
export default {
  components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
			HotSaleItem
  },
	data () {
		return {
			active: 2,
			data: [
				{ name: 'iPhone6 Plus', price: '5620' , src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0' },
				{ name: 'iPhone6 Plus', price: '5620' , src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0' }
			],
			hotSale: [0, 0, 0, 0]
		}
	}
}
</script>


<style scoped>
.hot-sale .hot-sale__title {
	text-align: center;
	padding: 10px 0;
}

</style>
