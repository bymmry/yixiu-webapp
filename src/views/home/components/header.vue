<template>
  <div class="header">
    <div class="header__pos" @click="sendMsg">
      <span class="pos__name">{{ city }}</span>
      <sicon name="position" scale="2" class="pos__icon"></sicon>
      <div id="allmap"></div>
    </div>
    <router-link class="header__search" to="/shop">
      <input type="text" class="header__input" placeholder="请输入想要搜索的内容"/>
    </router-link>
    <sicon name="more" scale="3.4" class="header__operate"></sicon>
  </div>
</template>

<script>
  export default {
    props: {
      city: String
    },
    data () {
      return {
        // city: ''
      }
    },
    mounted () {
      // this.initPosition();
    },
    methods: {
      removeSpace (str) {
        let spaceReg = /\s|\xA0/g;
        return str.replace(spaceReg, '');
      },
      sendMsg () {
        this.$emit('listenToChild', true);
      }
    }

  }
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  /* background: #66c6ff; */
  background: #fff;
  padding: 10px 0;
}

.header__search {
  width: 60%;
  margin-top: 2px;
}

.header__input {
  width: 90%;
  border-radius: 20px;
  padding: 7px 0 7px 15px;
  font-size: 14px;
  background: #eee;
}

.header__pos {
  display: flex;
  padding: 2vw 0.5vh;
  /* background: rgba(0, 0, 0, 0.2); */
  /* border-radius: 10px; */
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.header__pos .pos__name{
  color: #66c6ff;
}
.pos__icon{
  color: #66c6ff;
}
.header__operate{
  color: #66c6ff;
}
</style>