<template>
	<div class="">
		<item-header 
			:name="name"
			@backParent="back"
		/>
		<van-cell-swipe :right-width="40" :left-width="40" :on-close="onClose" v-for="(item, index) in phoneList" :key="index">	
			<van-cell-group>
				<van-cell :title="item.name" :value="item.price" />
			</van-cell-group>
			<span slot="right" class="delete-btn">删除</span>
		</van-cell-swipe>
	</div>
</template>

<script>
import { CellSwipe, Cell, CellGroup, Dialog } from 'vant';
import itemHeader from '../components/itemHeader';
export default {
	methods: {
		back () {
			this.$router.push('/sellerHome');
		},
		onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
						instance.close();
						
          }).catch(() => {
						instance.close();
					})
          break;
      }
    }
	},
  async mounted () {
		let categoryList = await this.$api.sendData('https://m.yixiutech.com/category/shop', {type: 'goods', shop: this.shop});
		
		categoryList.data.map(item => {
			item.name == 'ios' ? this.ios = item._id : null;
			item.name == '安卓' ? this.android = item._id : null;
		})

		let iosList = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category', { shop: this.shop, category: this.ios });
		this.phoneList = iosList.data;
		let androidList = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category', {shop: this.shop, category: this.android});
		this.phoneList = this.phoneList.concat(androidList.data);
	},
	data () {
		return {
			name: '删除已发布的二手手机',
			shop: '5ab93879d4e7f1497d58d94e',
			phoneList: []
		}
	},
	components: {
		[CellSwipe.name]: CellSwipe,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Dialog.name]: Dialog,
		itemHeader
	}
}
</script>

<style scoped>
.delete-btn {
	width: 100%;
	height: 100%;
	background: red;
	line-height: 44px;
	color: #fff;
	display: inline-block;
}
</style>
