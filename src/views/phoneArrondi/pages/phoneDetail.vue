<template>
  <div class="detail">
		<Header 
      :name="name"
    />
    <Personal 
      :data="data"
    />
    
    <Content 
      :data="data"
    />

    <Footer />
    <div class="space"></div>
	</div>
</template>

<script>
import Header from '../components/header'
import Personal from '../components/personal'
import Content from '../components/detailContent'
import Footer from '../components/footer'
export default {
  components: {
    Header,
    Personal,
    Content,
    Footer
  },
  data () {
    return {
      name: '手机详情',
      data: {},
    }
  },
  async mounted () {
    let phoneId = location.href.split('/').pop();
    let res = await this.$api.getData('https://m.yixiutech.com/goods/' + phoneId);
    this.data = res.data;
  }
}
</script>

<style scoped>
.space {
  width: 100%;
  height: 8vh;
}
</style>
