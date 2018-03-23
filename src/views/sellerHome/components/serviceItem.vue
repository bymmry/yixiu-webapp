<template>
  <div class="order">
    <van-cell-swipe :right-width="65" :left-width="65" :on-close="onClose" v-for="(item, index) in data" :key="index">	
			<van-cell-group>
				<van-cell :title="item.name" :value="item.price"  @click="toDetail(index)" />
			</van-cell-group>
			<span slot="right" @click="deletes(item._id)" class="delete-btn" >删除</span>
		</van-cell-swipe>
	</div>
</template>

<script>
import { CellSwipe, Cell, CellGroup, Dialog } from 'vant';
export default {
  props: {
		data: Array
  },
  data () {
    return {
      cover: '',
      activeId: ''
    }
  },
  methods: {
    deletes (id) {
      this.activeId = id;
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
          }).then(async () => {
            let res = await this.$api.sendData('https://m.yixiutech.com/service/delete', {_id: this.activeId});
            this.prompt(res.data, 'correct').show();
            this.data.map( (item, index) => {
              item._id == this.activeId ? this.data.splice(index, 1) : null;
            })
						instance.close();
						
          }).catch(() => {
						instance.close();
					})
          break;
      }
    },
    toDetail (index) {
      sessionStorage.setItem('serviceItem', JSON.stringify(this.data[ index ]));
      this.$router.push('/serviceDetail');
    }
  },
  components: {
    [CellSwipe.name]: CellSwipe,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Dialog.name]: Dialog
  }
}
</script>

<style>
.delete-btn {
	width: 100%;
	height: 100%;
	background: red;
	line-height: 44px;
	color: #fff;
	display: inline-block;
}

.price {
  color: red;
}
</style>
