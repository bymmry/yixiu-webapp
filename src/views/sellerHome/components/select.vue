<template>
  <div class="select " @click="selectOn" v-bind:class="{ border: hasBorder }">
		<sicon name="gou" scale="1.4" v-show="hasBorder"></sicon>
		{{ data }}
	</div>
</template>

<script>
export default {
	props: {
		data: String
	},
  data () {
		return {
			hasBorder: false
		}
	},
	methods: {
		selectOn () {
			this.hasBorder = !this.hasBorder;
			if (this.hasBorder) {
				if (window.status == 'false') {
					this.$emit('sendMsg', this.data)
				}
			} else {
				this.$emit('remove', this.data);
			}
			
		}
	}
}
</script>

<style scoped>
.select {
  width: 30%;
	height: 30px;
	line-height: 30px;
	border: 1px solid gray;
	text-align: center;
	font-size: 12px;
	/* margin-bottom: 10px; */
	margin: 5px 1%;
}

.border {
	border: 1px solid rgb(241, 2, 21);
	position: relative;
}

.svg-icon {
	position: absolute;
	right: 2px;
	bottom: 2px;
	z-index: 2;
}

.border:after {
	position: absolute;
	right: 0;
	bottom: 0;
	content: '';
	width: 0;
	height: 0;
	border-left: 30px solid transparent;
	border-right: 0px solid transparent;
	border-bottom: 20px solid rgb(241, 2, 21);
}
</style>
