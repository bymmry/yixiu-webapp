<template>
  <div class="phoneList">
		<Header
			:name="name"
		/>

		<div class="filter" v-show="!modelShow">
			<cube-button class="choose-model" @click="showSort">排序</cube-button>
			<cube-button class="choose-model" @click="showModel">机型</cube-button>
			<cube-button class="choose-model" @click="showPrice">价格</cube-button>
			<cube-button class="choose-model" @click="filterType">筛选</cube-button>
		</div>
			
		<div v-show="!filterShow && !modelShow">
			<phoneItem v-for="(item ,index) in result" 
				:key="index"
				:data="item"
			/>
		</div>

		<model-search
			v-show="modelShow"
			@hideSearch="hideSearch"
		/>

		<Filters 
			v-show="filterShow" 
			v-on:backPhoneList="backPhoneList"
		/>
	</div>
</template>

<script>
import Header from '../components/header'
import phoneItem from '../components/phoneItem'
import Filters from '../components/filter'
import modelSearch from '../components/modelSearch';
import { Popup, TreeSelect } from 'vant'

export default {
  components: {
		Header,
		phoneItem,
		Filters,
		modelSearch,
		[Popup.name]: Popup
	},
	data () {
		return {
			name: '商店手机列表',
			result: [],
			phoneList: [],
			modelShow: false,
			filterShow: false,
			// 当前搜索的手机搜索结果
			currentMap: [],
			sortActive: 0,
			priceActive: 0,
			prices: [],
			spaceReg: /\s+/g
		}
	},
	async mounted () {
		let params = location.href.split('/').pop().split('&');
		let res = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category', {category: params[0], shop: '5ab93879d4e7f1497d58d94e'});
		this.phoneList = res.data;
		let searchName = decodeURI(params[1]);

		this.phoneList.map(item => {
			if (item.name == searchName) {
				this.result.push(item);
				this.currentMap.push(item);
			} 
		})
		

	},
	methods: {
		hideSearch (data) {
			let searchName = data.replace(this.spaceReg, '').toLowerCase();
			this.result = [];
			this.phoneList.map(item => {
				item.name == searchName ? this.result.push(item) : null;
			})
			this.modelShow = false;
		},
		backPhoneList (data) {
			let length = 0;
			this.result = [];
			for (let key in data) {
				length++;
			}
			let temp = 0;
			this.phoneList.map(item => {
				for (let key in data) {
					if (item.info.productParam[ key ].indexOf(data[ key ]) !== -1) {
						temp++;
						if ( temp == length ) {
							this.result.push(item) 
						}
					} else {
						continue;
					}
				}
			})
			this.filterShow = false;
		},
		show () {
			this.functionunavailable();
		},
		showSort () {
			this.$createActionSheet({
        title: '请选择排序方式',
        active: this.sortActive,
        data: [
          {
            content: '价格从低到高'
          },
          {
           	content: '价格从高到低'
          }
        ],
        onSelect: (item, index) => {
					this.sortActive = index;
					this.sortActive == 0 ? 
						this.result = this.result.sort(this.smallToBig('price')) : 
						this.result = this.result.sort(this.bigToSmall('price'));
        }
      }).show()
		},
		smallToBig (prop) {
			return function (a, b) {
				return a[prop] - b[prop];
			}
		},
		bigToSmall (prop) {
			return function (a, b) {
				return a[prop] < b[prop]
			}
		},
		showModel () {
			this.modelShow = true;
		},
		showPrice () {
      this.$createActionSheet({
        title: '请选择价格区间',
        active: this.priceActive,
        data: [
          {
            content: '0-1499'
          },
          {
            content: '1500-1999'
          },
          {
            content: '2000-2999'
          },
					{
						content: '3000-4000'
					},
					{
						content: '4000以上'
					}
        ],
        onSelect: (item, index) => {
					this.priceActive = index;
					let lowPrice = item.content.split('-')[0];
					let highPrice = item.content.split('-')[1];
					this.result = [];
					this.currentMap.map(item => {
						if (item.price > lowPrice && item.price < highPrice) {
							this.result.push(item);
						}
					})
        }
      }).show()
    },
		filterType () {
			this.filterShow = !this.filterShow;
		}
	}
}
</script>

<style scoped>
.select {
	width: 25%;
	padding: 0.4em;
	border: 0px;
}

.filter {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.4em 0;
	border-bottom: 1px solid gray;
}

.select option {
	border: 1px solid #000;
}

.popup {
	position: relative;
	transform: translate(0, 0, 0);
}

.choose-model {
	width: 25%;
	padding: 0.4em;
	background: #fff;
	color: #000;
}
</style>
