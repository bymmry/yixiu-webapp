<template>
  <div class="detail">
		<Header 
      :name="name"
    />
    <Personal />
    
    <Content />

    <Footer />
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
      name: '手机详情'
    }
  }
}
</script>

<style scoped>

</style>
