<template>
  <div class="type__item" @click="route">
      <img :src="icon"  :class="classes" alt="" />
      <br>
      <p>{{name}}</p>
  </div>
</template>

<script>

  export default {
    props: {
      name: String,
      icon: String,
      src: String,
      type: String,
      classes: String
    },
    methods: {
      route () {
        if (this.type) {
          this.$router.push('/phoneList/' + sessionStorage.getItem(this.type));
          window.type = this.type;
          return;
        }
        this.$router.push(this.src);
      }
    }
  }
</script>

<style scoped>
.type__item {
	display: inline-block;
	width: 25%;
	text-align: center;
	font-size: 12px;
  color: #949191;
  margin: 10px 0;
}

.img {
  width: 40px;
}

.img1 {
  width: 44px;
}

.img2 {
  width: 34px;
}

.imgSpec {
  width: 22px;
}
</style>