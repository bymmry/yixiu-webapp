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
        
      }
    }
  }
</script>

<style scoped>
.position__item {
  padding: 16px;
  width: 100%;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}
</style>