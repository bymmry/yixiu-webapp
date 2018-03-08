<template>
  <div class="newOption">
      <div class="optionBox">
        <sicon name="find-unselect" scale="2.5"></sicon>
        <sicon name="find-select" scale="2.5" color="#0086ff"></sicon>
      </div>
      
      
  </div>
</template>

<script>
  
  export default {
    components: {
      
    },
    methods: {
    }
  }
</script>

<style scoped>
  .newOption{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:flex-end;
    width: 94%;
    height: 27px;
    border-top: 0.3vw solid #ebebeb;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .optionBox{
    width: 30vw;
  }
</style>