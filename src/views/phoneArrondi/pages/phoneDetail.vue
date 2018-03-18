<template>
  <div class="detail">

    <Header 
      :name="name"
    />

    <GoodSwipe 
      :images="images"
    />

    <Content 
      :data="data"
    />

    <quality
      :data="data"
    />

    <Personal 
      :data="data"
    />
    

    <Footer 
      :sureOrderData="sureOrderData"
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
export default {
  components: {
    Header,
    Personal,
    Content,
    Footer,
    GoodSwipe,
    quality
  },
  data () {
    return {
      name: '手机详情',
      data: {},
      sureOrderData: {},
      images: []
    }
  },
  async mounted () {
    const toast = this.$createToast({
          message: '加载中...'
		})
		toast.show();
    let phoneId = location.href.split('/').pop();
    let res = await this.$api.getData('https://m.yixiutech.com/goods/' + phoneId);
    toast.hide();
    this.data = res.data;
    this.images.push(this.data.cover);
    this.sureOrderData = {
      type: 2,
			user: this.getUserInfo()._id,
			shop: this.data.shop._id,
			phone: "",
			reamrk: "",
			goods: [this.data._id],
			paymentType: 0,
			price: this.data.price * 100,
			payment: this.data.price * 100
    }
  }
}
</script>

<style scoped>
.space {
  width: 100%;
  height: 8vh;
}

.van-goods-action {
  height: 8vh;
}

.van-hairline {
  height: 8vh;
}
</style>
