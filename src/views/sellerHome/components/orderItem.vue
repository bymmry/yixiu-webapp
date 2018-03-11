<template>
  <div class="order-item" @click="detail">
    <img :src="data.user.wx.avatarUrl" class="order-item__img" alt="" />
    <div class="order-item__msg">
      <p>昵称 : {{ data.user.wx.nickName }}</p>
      <p>城市 : {{ data.user.wx.province }} {{ data.user.wx.city }}</p>
      <p>维修类型 : {{ data.remark }}</p>
    </div>
	</div>
</template>

<script>
export default {
  props:{
    data: Object
  },
  methods: {
    detail () {
      localStorage.setItem('detail', JSON.stringify(this.data));
      this.$router.push('/orderDetail');
    }
  }
}
</script>

<style>
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
