<template>
  <div class="search-body">
    <sicon name="search" scale="4"></sicon>
    <input type="text" class="search-body__input" placeholder="请输入想要搜索的内容"/>
    <button class="search-body__btn" @click="search">搜索</button>
  </div>
</template>

<script>
  export default {
    mounted: function () {
      
    },
    data () {
      return {
        
      }
    },
    methods: {
      search () {
        console.log(123)
      }
    }
  }
</script>

<style scoped>
.search-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.search-body .search-body__input {
  width: 60%;
  padding: 18px;
}

.search-body .search-body__btn {
  border: 0;
  background: transparent;
}
</style>