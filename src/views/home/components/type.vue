<template>
  <div class="type-container">
    <div class="type">
			<TypeItem 
				v-for="(item, index) in data" 
				:key="index" 
				:name="item.name"
        :icon="item.icon"
        :img="item.img"
				/>
    </div>
  </div>
</template>

<script>
  import TypeItem from './typeItem.vue'
  import phone from '@/assets/home/phone.png';
  import ershoushouji from '@/assets/home/ershoushouji.png';
  import jiadian from '@/assets/home/jiadian.png';
  import peijian from '@/assets/home/peijian.png';
  import shebei from '@/assets/home/shebei.png';
  import car from '@/assets/home/car.png';
  import huishou from '@/assets/home/huishou.png';
  import homeSort from '@/assets/home/homeSort.png';
  import gongchengshi from '@/assets/home/gongchengshi.png';
  export default {
    components: {
			TypeItem
    },
    data () {
    	return {
        list: [
          {name: '手机维修', icon: 'phone'},
          {name: '精品手机', icon: 'ershoushouji'},
          {name: '手机配件', icon: 'peijian'},
          {name: '手机回收', icon: 'huishou'},
          {name: '工程师培训', icon: 'gongchengshi'},
          {name: '家电维修', icon: 'jiadian'},
          {name: '汽车维修', icon: 'car'},
          {name: '企业设备维护', icon: 'shebei'}
        ],
				data: [
        ],
        sortData: [{name: '企业设备维护', icon: 'shebei', img: "shebei"}],
        icons:[phone,ershoushouji,peijian,huishou,gongchengshi,jiadian,car,shebei]
			}
    },
    async mounted () {
      // let res = await this.$api.getData('https://m.yixiutech.com/category/plate/simple');
      // res.data.map((item,index) => {
      //   let config = { 
      //     name: item.name, 
      //     icon: item.fe.icon,
      //     img: this.icons[index]
      //   };
      //   this.data.push(config);
      // })
      this.list.map((item,index) => {
        let config = { 
          name: item.name, 
          icon: item.icon,
          img: this.icons[index]
        };
        this.data.push(config);
      })
      // this.data = this.list;
      console.log(this.data);
    }
  }
</script>

<style scoped>
.type-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
}

.type {
    width: 90%;
    border-bottom: 1px solid #efefef;
    /* border: 2px solid #eee; */
    /* border-radius: 4px; */
		justify-content: space-between;
}
</style>