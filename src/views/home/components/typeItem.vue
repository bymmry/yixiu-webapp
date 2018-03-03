<template>
  <div class="type__item">
      <sicon name="position" scale="3.8"></sicon>
      <br>
      <p>{{name}}</p>
  </div>
</template>

<script>

  export default {
    props: {
    	name: String
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
}
</style>