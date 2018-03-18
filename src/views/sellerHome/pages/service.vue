<template>
	<div class="info">
		<div class="box">
			<p>选择品牌</p>
			<div class="service">
				<single-select ref="select"  v-for="(item, index) in brand.list"
					:type="brand.type"
					:key="index" 
					v-on:cancelOther="cancel"
					:data="item.name"
					:manufacturer="item._id"
				/>
			</div>
		</div>
		
		<div class="box">
			<p>选择型号</p>

			<cube-select
				v-model="res.name"
				:options="modelNames"
				@change="modelChange"
			/>
		</div>
		
		<div class="box">
			<p>选择颜色</p>
			<div class="service">
				<single-select ref="select" v-for="(item, index) in colors.list"
					:type="colors.type"
					:key="index"
					v-on:cancelOther="colorSelect"
					:data="item"
				/>
			</div>
		</div>

		<!-- <ul class="service-list">
				<li v-for="(listItem, listIndex) in item" :key="listIndex" class="service">
					<span class="service__item">{{ listItem }}</span>
					<span class="service__price"></span>
				</li>
			</ul> -->

		<div class="box">
			<p>选择问题</p>
			<div class="box-item" v-for="(item, index) in questions" :key="index">
				<p @click="showItem(index)"><sicon name="add" scale="2.4"></sicon><span class="box__name">{{ item.name }}</span></p>
				<van-checkbox-group v-model="result" class="service-list" v-show="item.show">
					<van-cell-group>
						<van-cell v-for="(listItem, listIndex) in item.list" :key="listIndex">
							<van-checkbox class="service-item" :name="listItem.name">
								{{ listItem.name }}
								<span class="price"><input type="text" placeholder="服务的价格"/></span>
							</van-checkbox>
						</van-cell>
					</van-cell-group>
				</van-checkbox-group>
			</div>
		</div>
		
	</div>
</template>

<script>
import selects from '../components/select'
import singleSelect from '../components/singleSelect'
import { Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'
export default {
  components: {
		selects,
		singleSelect,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup
	},
	data () {
		return {
			brand: {
				type: 'brand',
				list: []
			},
			models: [],
			modelNames: [],
			active: '',
			res: {},
			result: [],
			colors: {
				type: 'color',
				list: []},
			questions: [
				{ name: '屏幕问题', show: false, list: [
					{ name: '内屏碎裂', price: 200 },
					{ name: '外屏碎裂', price: 100 }
				]},
				{ name: '电池电源问题', show: false, list: [

				]},
				{ name: '信号|有线|无线连接', show: false, list: [

				]},
				{ name: '摄像头问题', show: false, list: [

				]},
				{ name: '声音问题', show: false, list: [

				]},
				{ name: '按键问题', show: false, list: [

				]},
				{ name: '外壳边框问题', show: false, list: [

				]},
				{ name: '主板维修', show: false, list: [

				]},
				{ name: '其他故障', show: false, list: [

				]},
				{ name: '内存问题', show: false, list: [

				]},
				{ name: '数据问题', show: false, list: [

				]},
				{ name: '安全排查', show: false,  list: [

				]}
			],
			service: []
		}
	},
	async mounted () {
		const toast = this.$createToast({
			txt: '加载中...',
			type: 'correct'
		})
		toast.show();
		let res = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer');
		this.brand.list = res.data;
		toast.hide();
	},
	methods: {
		colorSelect (data) {
			let color = data.split('&')[0];
		},
		modelChange (value, index) {
			this.colors.list = this.models[ index ].color;
		},
		async cancel (data) {
			let zData = data.split('&');
			let type = zData[1];
			let name = zData[0];
			let manufacturer = zData[2]
			
			// 根据手机品牌获取型号
			const toast = this.$createToast({
				txt: '加载中...',
				type: 'correct'
			})
			toast.show();
			let model = await this.$api.getData('https://m.yixiutech.com/phone/model/' + manufacturer);
			this.models = model.data;
			// this.color.list.push()
			model.data.map(item => {
				this.modelNames.push(item.name);
			})
			toast.hide();

			// 取消其他几个子项的选中
			this.$refs.select.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		showItem (index) {
			this.questions[index].show = !this.questions[index].show;
		}
	}
}
</script>

<style scoped>
.info {
	background: #eee;
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:space-between;
}

.service-item {
	position: relative;
}

.service-item .price {
	position: absolute;
	right: 0;
	top: 50%;
	width: 30%;
	transform: translate(0, -50%);
}

.service-item .price input {
	width: 100%;
}

.box {
	width: 96%;
	padding: 2%;
	background: #fff;
	margin-bottom: 4%;
}

.box .box-item p {
	padding: 2%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #eee;
}

.box .svg-icon {
	display: inline-block;
}

.box .box__name {
	display: inline-block;
	margin-left: 10px;
}

</style>
