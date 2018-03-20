<template>
  <div class="order-item" @click="toDetail">
		<img :src="data.cover" alt=""  class="order-item__img"/>
		<div class="order-item__msg">
      <p>服务名称: {{ data.name }}</p>
			<p>服务描述: {{ data.desc }}</p>
    </div>
	</div>
</template>

<script>
export default {
  props: {
		data: Object
  },
  data () {
    return {
      cover: ''
    }
  },
  methods: {
    toDetail () {
      sessionStorage.setItem('serviceItem', JSON.stringify(this.data));
      this.$router.push('/serviceDetail')
    }
  }
}
</script>

<style scoped>
.order-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2%;
  border-bottom: 1px solid gray;
}

.order-item .order-item__img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
