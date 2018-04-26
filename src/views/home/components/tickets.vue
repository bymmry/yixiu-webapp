<template>
  <div class="tickets">
		<p class="tickets__title">超值代金券</p>
		<div class="tickets__content">
			<TicketItem
				v-for="(item, index) in data"
				:key="index"
				:name="item.name"
				:award="item.award"
				:condition="item.condition"
				:date="item.date"
			/>
		</div>
	</div>
</template>

<script>
	import TicketItem from './ticketItem.vue'
  export default {
    components: {
			TicketItem
		},
		data () {
			return {
				data: [
					{name: '更换电池', award: '10元代金券', condition: '满99元可用', date: '2018-1-15至2018-2-15'},
					{name: '更换电池', award: '10元代金券', condition: '满99元可用', date: '2018-1-15至2018-2-15'},
					{name: '更换电池', award: '10元代金券', condition: '满99元可用', date: '2018-1-15至2018-2-15'},
					{name: '更换电池', award: '10元代金券', condition: '满99元可用', date: '2018-1-15至2018-2-15'}
				]
			}
		}
	}
</script>

<style scoped>
.tickets {
	width: 100%;
	text-align: center;
}

.tickets__title {
	display: inline-block;
}

.tickets__content {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>