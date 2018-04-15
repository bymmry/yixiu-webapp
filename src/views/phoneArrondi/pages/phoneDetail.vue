<template>
  <div class="detail">
    <div v-show="!paramStatus && !qualityStatus">
      
      <Header 
        :name="name"
      />
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
      <div class="box">
        <p>真机实拍</p>
        <img 
          class="image"
          v-for="(item, index) in images"
          :key="index"
          :src="item.url" 
          alt=""
        />
      </div>

      <Footer 
        :sureOrderData="sureOrderData"
      />
    </div>

    <!-- <product 
			v-show="paramStatus"
      @backDetail="backDetail"
      :data="data"
		/>

		<quality
			v-show="qualityStatus"
      @backDetail="backDetail"
      :data="data"
		/> -->
    
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
  methods: {
    showParam () {
      // this.paramStatus = !this.paramStatus;
      sessionStorage.setItem('info', JSON.stringify(this.data));
      this.$router.push('/product');
    },
    showQuality () {
      sessionStorage.setItem('info', JSON.stringify(this.data));
      this.$router.push('/quality');
      // this.qualityStatus = !this.qualityStatus;
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
    toast.show();
    let detail = JSON.parse(sessionStorage.getItem('detail'));
    this.images = detail.info.photo
    // let phoneId = location.href.split('/').pop();
    let res = await this.$api.getData('https://m.yixiutech.com/goods/' + detail._id);
    toast.hide();
    this.data = res.data;
    // this.images.push(this.data.cover);
    this.sureOrderData = {
      type: 2,
			user: this.getUserInfo()._id,
			shop: detail._id,
			phone: "",
			reamrk: "",
			goods: [this.data._id],
			paymentType: 0,
			price: this.data.price,
			payment: this.data.price * 100
    }
  }
}
</script>

<style scoped>
.detail {
  background: rgb(248, 247, 247);
}

.space {
  width: 100%;
  height: 8vh;
}

.box {
  width: 92%;
  padding: 2%;
  margin: 0 auto;
  border-radius: 5px;
  background: #fff;
}

.box p {
  padding: 2%;
}

.image {
  width: 100%;
  margin-bottom: 10px;
}
</style>
