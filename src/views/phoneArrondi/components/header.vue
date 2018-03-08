<template>
  <div class="header">
		<p>{{ name }}</p>
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
.header {
	width: 100%;
	padding: 1vh 0;
	background: #ffbd5c;
	text-align: center;
	color: #fff;
}

</style>