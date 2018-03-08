<template>
  <div class="search-body">
    <div class="allmap"></div>
    <sicon name="search" scale="4"></sicon>
    <input type="text" class="search-body__input" v-model="content.name" @change="contentChange" placeholder="请输入想要搜索的内容"/>
    <button class="search-body__btn" @click="search">搜索</button>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    mounted () {

    },
    components: {
      [Toast.name]: Toast
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
        Toast.loading({
          // mask: true,
          message: '加载中...'
        });
        // let res = await this.$api.sendData('https://m.yixiutech.com/shop/filter', this.content);
        let res = await this.$api.sendData('https://yixiu.natappvip.cc/shop/filter', this.content);
        res.code == 200 ? this.$emit('sendShopList', res.data) : null;
        Toast.clear();
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
