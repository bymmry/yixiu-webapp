<template>
	<div class="filter-page">
		<div class="item">
			<p>内存</p>
			<div class="service">
				<single-select 
					ref="storages"
					v-for="(item, index) in storages"
					:key="index"
					:data="item"
					:type="storageType"
					v-on:cancelOther="storageChange"
				/>
			</div>
		</div>

		<div class="item">
			<p>颜色</p>
			<div class="service">
				<single-select 
					ref="colors"
					v-for="(item, index) in colors" 
					:key="index"
					:data="item"
					:type="colorType"
					v-on:cancelOther="colorChange"
				/>
			</div>
		</div>

		<div class="item">
			<p>成色</p>
			<div class="service">
				<single-select
					ref="quality"
					v-for="(item, index) in qualities" 
					:key="index"
					:data="item"
					:type="qualityType"
					v-on:cancelOther="qualityChange"
				/>
			</div>
		</div>

		<div class="item">
			<p>版本</p>
			<div class="service">
				<single-select 
					v-for="(item, index) in versions" 
					ref="version"
					:key="index"
					:data="item"
					:type="versionType"
					v-on:cancelOther="versionChange"
				/>
			</div>
		</div>

		<van-button size="large" @click="search">搜索</van-button>

	</div>
</template>

<script>
import SingleSelect from '../../sellerHome/components/singleSelect'
import { Button } from 'vant'
export default {
	methods: {
		search () {
			this.$emit('backPhoneList', this.filter)
		},
		storageChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.filter['storage'] = name;
			// 取消其他几个子项的选中
			this.$refs.storages.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		colorChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.filter['color'] = name;
			// 取消其他几个子项的选中
			this.$refs.colors.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		qualityChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.filter['quality'] = name;
			// 取消其他几个子项的选中
			this.$refs.quality.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		},
		versionChange (data) {
			let zData = data.split('&');
			let name = zData[0];
			let type = zData[1];
			
			this.filter['version'] = name;
			// 取消其他几个子项的选中
			this.$refs.version.map(item => {
				if (item.type == type && item.data !== name) {
					item.cancelSelect()
				}
			})
		}
	},
  components: {
		SingleSelect,
		[Button.name]: Button
	},
	data () {
		return {
			storages: ['16G', '32G', '64G', '128G'],
			storageType: 'storage',
			colors: ['黑色', '白色', '玫瑰金', '金色', '银灰色'],
			colorType: 'color',
			qualities: ['99新', '95新', '9新', '85新', '8新'],
			qualityType: 'quality',
			versions: ['国行版', '港版', '其他版本'],
			versionType: 'version',
			filter: {}
		}
	}
}
</script>

<style scoped>
.item {
	width: 96%;
	padding: 2%;
}

.item p {
	padding: 2% 0; 
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}

</style>
