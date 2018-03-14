<template>
  <div class="payBail">
		<sure-order 
			:totalFee="totalFee"
		/>
	</div>
</template>


<script>
import SureOrder from '../../common/components/sureOrder';
export default {
  components: {
		SureOrder
	},
	data () {
		return {
			totalFee: 3000
		}
	}
}
</script>

<style scoped>

</style>
