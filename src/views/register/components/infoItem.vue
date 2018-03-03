<template>
  <div class="info__item">
      <label><sicon :name="icon" scale="3.8"></sicon></label>
      <input :type="type" :placeholder="tip" class="item__input"/>
  </div>
</template>

<script>
export default {
	props: {
        tip: String,
        type: String,
		icon: String
    }
}
</script>

<style scoped>
.info .info__item {
    width: 100%;
    border-bottom: 2px solid #fff;
    display: flex;
    align-items: center;
    padding: 14px 0;
}

.info__item .item__input {
    width: 80%;
    border: 0;
    margin-left: 24px;
    background: transparent;
    font-size: 20px;
    color: #fff;
}

input::-webkit-input-placeholder{
    color:#fff;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#fff;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#fff
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#fff;
}
</style>