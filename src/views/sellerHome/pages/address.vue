<template>
	<div class="info">
		<van-field
			v-model="address.name"
			label="寄件人"
			placeholder="姓名"
		/>

		<van-field
			v-model="address.name"
			label="联系电话"
			placeholder="手机或固定电话"
		/>

		<van-field
			v-model="address.name"
			label="发货地区"
			placeholder="手机或固定电话"
		/>

	</div>
</template>

<script>
import { Area, Field } from 'vant';
export default {
  components: {
		[Area.name]: Area,
		[Field.name]: Field
	}
}
</script>

<style scoped>

</style>
