<template>
  <div class="info">
		<item-header
			:name="name"
			@backParent="back"
		/>
	</div>
</template>

<script>
import itemHeader from '../components/itemHeader'
export default {
	methods: {
		back () {
			this.$router.go(-1);
		}
	},
	data () {
		return {
			name: '已管理的店铺'
		}
	},
  components: {
		itemHeader
	}
}
</script>

<style scoped>

</style>
