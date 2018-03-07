<template>
  <div class="search-body">
    <div class="allmap"></div>
    <sicon name="search" scale="4"></sicon>
    <input type="text" class="search-body__input" v-model="content.name" @change="contentChange" placeholder="请输入想要搜索的内容"/>
    <button class="search-body__btn" @click="search">搜索</button>
  </div>
</template>

<script>
  export default {
    mounted () {
      
    },
    data () {
      return {
        content: {
          name: '',
          serviceName: '',
          position: {
            lng: localStorage.getItem('lng'),
            lat: localStorage.getItem('lat')
          }
        }
      }
    },
    methods: {
      async search () {
        if (this.content.name === '') return;
        let res = await this.$api.sendData('https://yixiu.natappvip.cc/shop/filter', this.content);
        res.code == 200 ? this.$emit('sendShopList', res.data) : null;
      },
      contentChange () {
        this.content['serviceName'] = this.content['name']
      },
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