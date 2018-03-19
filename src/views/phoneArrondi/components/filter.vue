<template>
	<div class="filter-page">
		<div class="item">
			<p>内存</p>
			<div class="service">
				<single-select 
					v-for="(item, index) in storages" 
					:key="index"
					:data="item"
					:type="storageType"
				/>
			</div>
		</div>

		<div class="item">
			<p>颜色</p>
			<div class="service">
				<single-select 
					v-for="(item, index) in colors" 
					:key="index"
					:data="item"
					:type="colorType"
				/>
			</div>
		</div>

		<div class="item">
			<p>成色</p>
			<div class="service">
				<single-select 
					v-for="(item, index) in qualities" 
					:key="index"
					:data="item"
					:type="qualityType"
				/>
			</div>
		</div>

		<div class="item">
			<p>版本</p>
			<div class="service">
				<single-select 
					v-for="(item, index) in versions" 
					:key="index"
					:data="item"
					:type="versionType"
				/>
			</div>
		</div>

	</div>
</template>

<script>
import SingleSelect from '../../sellerHome/components/singleSelect'
export default {
  components: {
		SingleSelect
	},
	data () {
		return {
			storages: ['16G', '32G', '64G', '128G'],
			storageType: 'storage',
			colors: ['黑色', '白色', '玫瑰金', '金色'],
			colorType: 'color',
			qualities: ['99新', '95新', '9新', '85新', '8新'],
			qualityType: 'quality',
			versions: ['国行版', '港版', '其他版本'],
			versionType: 'version'
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
	justify-content:space-between;
}

</style>
