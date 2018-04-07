<template>
  <div class="hot-sale">
		<p class="hot-sale__title">品牌热卖</p>
    <van-tabs :active="active">
			<van-tab v-for="(brandItem, index) in hotSale" :title="brandItem.name" :key="index">
					<HotSaleItem v-for="(item, index) in hotSale[index].data" :key="index"
						:src="item.src"
						:name="item.name"
						:price="item.price"
						:type="brandItem.type"
					/>
			</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import HotSaleItem from './hotSaleItem'
import hot from '../data/hot.json'
export default {
  components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
			HotSaleItem
  },
	data () {	
		return {
			active: 0,
			hotSale: hot
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
