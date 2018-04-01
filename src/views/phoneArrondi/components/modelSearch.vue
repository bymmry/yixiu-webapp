<template>
  <div class="modelFilter">
		<ul class="nav">
			<li class="nav__item" 
				v-for="(item, index) in phoneName" 
				v-bind:class="{ colors: activeColor }" 
				:key="index" 
				@click="chooseBrand(index)"
			>
				{{ item }}
			</li>
		</ul>
		<ul class="content">
			<li class="content__item" 
				v-for="(item, index) in modelNames" 
				:key="index" 
				@click="chooseModel(item)"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	methods: {
		chooseModel (data) {
			this.$emit('hideSearch', data);
		},
		async chooseBrand (index) {
			this.activeColor  = !this.activeColor;
			let sysModel = await this.$api.getData('https://m.yixiutech.com/phone/model/' + this.brand[ index ]._id);
			
			this.sysModel = sysModel.data;
			this.modelNames = [];
			this.sysModel.map(item => {
				this.modelNames.push(item.name);
			})
		}
	},
  async mounted () {
		const toast = this.$createToast({
			txt: '加载中...',
			type: 'loading'
		})
		toast.show();
		let res = await this.$api.getData('https://m.yixiutech.com/phone/manufacturer');
		this.brand = res.data;
		toast.hide();
		res.data.map(item => {
			this.phoneName.push(item.name);
			this.brand.push(item);
		})
	},
	data () {
		return {
			phoneName: [],
			brand: [],
			activeColor: false,
			modelNames: [],
			sysModel: []
		}
	}
}
</script>

<style scoped>
.modelFilter {
	width: 100%;
	height: 100%;
	display: flex;
}

.colors {
	background: #fff;
}

.nav {
	width: 30%;
	height: 500px;
	overflow-y: scroll;
	border: 1px solid #eee;
}

.nav__item {
	padding: 8% 0;
	text-align: center;
	border-bottom: 1px solid rgb(134, 134, 134);
	background: rgb(247, 247, 247);
}

.content {
	width: 70%;
}

.content__item {
	padding: 4% 0;
	text-align: center;
	border-bottom: 1px solid #eee;
	border-top: none;
	text-align: left;
	text-indent: 10%;
	background: #fff;
}
</style>
