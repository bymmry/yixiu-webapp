<template>
  <div class="hot-sale">
		<p class="hot-sale__title">品牌特卖</p>
    <van-tabs :active="active">
			<van-tab v-for="(item, index) in hotSale" :title="item.name" :key="index">
					<HotSaleItem v-for="(item, index) in hotSale[index].data" :key="index"
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
import X from '@/assets/x.jpg';
import iphone7 from '@/assets/7.jpg';
import iphone6s from '@/assets/6s.jpg';
import Plus from '@/assets/8p.jpg';
import p10 from '@/assets/p10.png';
import p9 from '@/assets/p9.png';
import p7 from '@/assets/7p.jpg';
import mate10 from '@/assets/mate10.png'
import s8 from '@/assets/s8.png'
import note8 from '@/assets/note8.jpg'
import w2017 from '@/assets/w2017.jpg'
import s7 from '@/assets/s7.jpg'
export default {
  components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
			HotSaleItem
  },
	data () {	
		return {
			active: 0,
			hotSale: [
					{ "name": "苹果", "data": [
							{ "name": "iPhoneX", "price": "7850" , "src": X },
							{ "name": "iphone8 Plus", "price": "5645" , "src": Plus },
							{ "name": "iphone7", "price": "4236" , "src": iphone7 },
							{ "name": "iphone6s", "price": "3699" , "src": iphone6s }
					]},
					{ "name": "华为", "data": [
							{ "name": "华为P10", "price": "3488" , "src": p10 },
							{ "name": "华为P9", "price": "2569" , "src": p9 },
							{ "name": "华为7PLUS", "price": "1299" , "src": p7 },
							{ "name": "华为Mate10", "price": "5428" , "src": mate10 }
					]},
					{ "name": "三星", "data": [
							{ "name": "GalaxyS8", "price": "4599" , "src": s8 },
							{ "name": "GalaxyNote8", "price": "6488" , "src": note8 },
							{ "name": "三星W2017", "price": "9088" , "src": w2017 },
							{ "name": "GalaxyS7", "price": "2378" , "src": s7 }
					]},
					{ "name": "小米", "data": [
							{ "name": "小米6", "price": "2439" , "src": "https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=3742462462,4027913379&fm=202&src=756&mola=new&crop=v1" },
							{ "name": "小米5X", "price": "1229" , "src": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2994768393,737642248&fm=58" },
							{ "name": "小米MIX2", "price": "2900" , "src": "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2197317217,2841334572&fm=58" },
							{ "name": "小米5Plus", "price": "2299" , "src": "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=107452044,2849880901&fm=85&s=59843D725CA1431B9D51334D030070E0" }
					]}
			]
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
