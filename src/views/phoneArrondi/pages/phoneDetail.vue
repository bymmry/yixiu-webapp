<template>
  <div class="detail">
    <Header 
      :name="name"
    />
    <div v-show="!paramStatus && !qualityStatus">
      

      <GoodSwipe 
        :images="images"
      />

      <Content 
        :data="data"
        @showParam="showParam"
        @showQuality="showQuality"
      />

      <!-- <commit/> -->

      <!-- <Personal 
        :data="data"
      /> -->

      <Footer 
        :sureOrderData="sureOrderData"
      />
    </div>

    

    <product 
			v-show="paramStatus"
      @backDetail="backDetail"
      :data="data"
		/>

		<quality
			v-show="qualityStatus"
      @backDetail="backDetail"
      :data="data"
		/>
    

    
    <div class="space"></div>
	</div>
</template>

<script>
import Header from '../components/header'
import Personal from '../components/personal'
import Content from '../components/detailContent'
import Footer from '../components/footer'
import GoodSwipe from '../components/goodSwipe'
import quality from '../components/quality'
import product from '../components/product'
import commit from '../components/commit'
export default {
  mounted () {
    this.data = JSON.parse(sessionStorage.getItem('detail'))
    this.images = thia.data.info.photo;
    console.log(this.data);
  },
  methods: {
    showParam () {
      this.paramStatus = !this.paramStatus;
    },
    showQuality () {
      this.qualityStatus = !this.qualityStatus;
    },
    backDetail () {
      this.paramStatus = false;
      this.qualityStatus = false;
    }
  },
  components: {
    Header,
    Personal,
    Content,
    Footer,
    GoodSwipe,
    quality,
    product,
    commit
  },
  data () {
    return {
      name: '手机详情',
      data: {},
      sureOrderData: {},
      images: [],
      paramStatus: false,
      qualityStatus: false
    }
  },
  async mounted () {
    const toast = this.$createToast({
      txt: '加载中...',
      type: 'loading'
		})
		// toast.show();
    // let phoneId = location.href.split('/').pop();
    // let res = await this.$api.getData('https://m.yixiutech.com/goods/' + phoneId);
    // // toast.hide();
    // this.data = res.data;
    // this.images.push(this.data.cover);
    // this.sureOrderData = {
    //   type: 2,
		// 	user: this.getUserInfo()._id,
		// 	shop: this.data.shop._id,
		// 	phone: "",
		// 	reamrk: "",
		// 	goods: [this.data._id],
		// 	paymentType: 0,
		// 	price: this.data.price,
		// 	payment: this.data.price * 100
    // }

    this.data = JSON.parse(sessionStorage.getItem('detail'));
    // console.log(this.data);
  }
}
</script>

<style scoped>
.space {
  width: 100%;
  height: 8vh;
}

</style>
