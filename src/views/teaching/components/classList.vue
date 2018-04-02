<template>
  <div class="classList">
    <div class="cover">
      <img :src="cover" alt="">
    </div>
    <div class="content">
			<h3>{{name}}</h3>
			<p>{{type}}-{{number}}人在学</p>
			<p v-if="fee == '0'">免费</p>
      <p v-else>{{fee}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calss-list',
    props: {
      cover: String,
      name: String,
      type: String,
      number: Number,
      fee: Number
    }
  }

</script>

<style>
  .classList {
    width: auto;
    height: 120px;
    margin: 15px 15px;
    background-color: #fff;
    display: flex;
  }
  .classList .cover {
    flex: 1;
  }
  .classList .content {
    flex: 2;
  }
</style>

