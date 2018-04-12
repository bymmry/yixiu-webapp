<!-- 菜单 -->
<template>
  <div class="menu">
    <ul>
      <li @click="change(item,index)" v-for="(item, index) in list" :key="index">
        <span :data-index="index" :class="{'active': currentIndex === index}">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'menu-tab',
    data() {
      return {
        currentIndex: 0
      };
    },
    props: {
        list: Array
    },
    methods: {
      change(item, index) {
        this.currentIndex = index;

        this.$emit("returnListClick",item);
      }
    }

  }

</script>

<style scoped>
.menu{
	width: 100%;
  height: 6vh;
  min-height: 40px;
  background-color: #fff;
  color: #4891e4;
}
.menu ul{
  width: 100%;
  height: 100%;
  display: flex;
}
.menu ul li{
  flex: 1;
  text-align: center;
}
.menu ul li span{
  width: auto;
  height: 37px;
  line-height: 37px;
  margin: 0 auto;
  display: inline-block;
}
.menu ul li span.active{
  
  border-bottom: 3px solid #4891e4;
  border-radius: 3px;
}

</style>
