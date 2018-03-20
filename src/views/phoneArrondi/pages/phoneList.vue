<template>
  <div class="phoneList">
		<Header
			:name="name"
		/>

		<div class="filter">
			<cube-button class="choose-model" @click="showSort">排序</cube-button>
			<cube-button class="choose-model" @click="showModel">机型</cube-button>
			<cube-button class="choose-model" @click="showPrice">价格</cube-button>
			<cube-button class="choose-model" @click="filterType">筛选</cube-button>
		</div>
			
		<div v-show="!filterShow">
			<phoneItem v-for="(item ,index) in data" 
				:key="index"
				:name="item.name"
				:desc="item.desc"
				:price="item.price"
				:cover="item.cover"
				:phone="item._id"
			/>
		</div>

		<Filters v-show="filterShow"></Filters>
	</div>
</template>

<script>
import Header from '../components/header'
import phoneItem from '../components/phoneItem'
import Filters from '../components/filter'
import { Popup } from 'vant'
const col1Data = [{ text: '剧毒', value: '剧毒'}, { text: '蚂蚁', value: '蚂蚁' }, 
  { text: '幽鬼', value: '幽鬼' }]
const col2Data = [{ text: '输出', value: '输出' }, { text: '控制', value: '控制' },
  { text: '核心', value: '核心'}, { text: '爆发', value: '爆发' }, { text: '辅助', value: '辅助' },
  { text: '打野', value: '打野' }, { text: '逃生', value: '逃生' }, { text: '先手', value: '先手' }]
export default {
  components: {
		Header,
		phoneItem,
		Filters,
		[Popup.name]: Popup
	},
	data () {
		return {
			name: '商店手机列表',
			data: [],
			filterShow: false
		}
	},
	async mounted () {
		let param = location.href.split('/').pop().split('&');
		let res = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category/', { category: param[0], shop: param[1]});
		this.data = res.data;

		this.picker = this.$createPicker({
      title: '手机型号选择',
      data: [col1Data, col2Data],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        
      }
		})
		

	},
	methods: {
		showSort () {
			this.$createActionSheet({
        title: '请选择排序方式',
        active: 0,
        data: [
          {
            content: '价格从低到高'
          },
          {
           content: '价格从高到低'
          }
        ],
        onSelect: (item, index) => {
					
        }
      }).show()
		},
		showModel () {
			this.picker.show();
		},
		showPrice () {
      this.$createActionSheet({
        title: '请选择价格区间',
        active: 0,
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
