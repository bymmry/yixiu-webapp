<template>
  <p class="position__item" @click="pitchOn">
    {{city}}
  </p>
</template>

<script>
  export default {
		props: {
			city: String
    },
    methods: {
      pitchOn: function (e) {
        let currentItem = e.target.innerHTML.trim();
        this.$emit('changeCity', currentItem);
      }
    }
  }
</script>

<style scoped>
.position__item {
  padding: 5%; 
  width: 90%;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}
</style>