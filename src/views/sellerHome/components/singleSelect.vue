<template>
  <div class="select" @click="selectOn" v-bind:class="{ border: hasBorder }" :type="type">
		<sicon name="gou" scale="1.4" v-show="hasBorder"></sicon>
		{{ data }}
	</div>
</template>

<script>
export default {
	props: {
		data: String,
		type: String,
		manufacturer: String,
		index: Number
	},
  data () {
		return {
			hasBorder: false
		}
	},
	mounted () {
		
	},
	methods: {
		async selectOn () {
			this.hasBorder = !this.hasBorder;
			this.$emit('cancelOther', this.data + '&' + this.type + '&' + this.manufacturer + '&' + this.index);
		},
		cancelSelect () {
			this.hasBorder ? this.hasBorder = !this.hasBorder : null;
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
