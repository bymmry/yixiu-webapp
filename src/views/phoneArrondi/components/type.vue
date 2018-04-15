<template>
  <div class="type-container">
    <div class="type">
			<TypeItem 
				v-for="(item, index) in data" 
				:key="index" 
				:name="item.name"
        :icon="item.icon"
        :src="item.src"
        :type="item.type && item.type"
        :classes="item.classes"
				/>
    </div>
  </div>
</template>

<script>
  import TypeItem from './typeItem.vue'
  import iphone from '@/assets/iphone.png';
  import android from '@/assets/android.png';
  import answer from '@/assets/answer.png';
  import youhuiquan from '@/assets/youhuiquan.png';
  export default {
    components: {
			TypeItem
    },
    data () {
    	return {
				data: [
          { name: '苹果上新', icon: iphone, src: '', type: 'ios', classes: 'img1' },
          { name: '安卓上新', icon: android, src: '', type: 'android', classes: 'img'  },
          { name: '手机问答', icon: answer, src: '/find/question', classes: 'imgSpec'  },
          { name: '优惠券', icon: youhuiquan, src: '/coupon', classes: 'img'  }
        ]
			}
    },
    async mounted () {
      // let res = await this.$ap.get('https://m.yixiutech.com/category/plate/simple');
      // this.data = res.data.slice(0, 4);
    }
  }
</script>

<style scoped>
.type-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.type {
    width: 90%;
    border-radius: 4px;
		justify-content: space-between;
}
</style>