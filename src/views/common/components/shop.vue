<!-- 店铺详情页 -->
<template>
  <transition name="slide">
    <div>
      <span class="back">
        <sicon name="back" scale="2.5"></sicon>
      </span>
      <cube-scroll class="scroll shop">
        <div class="shopContent">
          <div class="shopImg">
            <img src="" alt="">
          </div>
          <div class="shopDes">
            <h3>shopname</h3>
            <ul>
              <li>营业时间：
                <span></span>
              </li>
              <li>联系方式：
                <span></span>
              </li>
              <li>服务方式：
                <span></span>
              </li>
            </ul>
            <p>位置：
              <span></span>
            </p>
            <div class="otherInfo">
              <span>评价：</span>
              <span>成交单</span>
              <span></span>
            </div>
          </div>
          <div class="about">
            <h3>评价</h3>
            <h4>服务评价</h4>

          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {};
    },

    components: {},

  }

</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .scroll {
    width: 100%;
    height: 91vh;
  }

  .shop {
    width: 100%;
  }

  .back {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    background: #aeb3b4;
    opacity: 0.7;
    border-radius: 50%;
    top: 15px;
    left: 15px;
    z-index: 300;
  }
  .back svg{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-60%) translateY(-50%);
  }

  .shop .shopContent {
    width: 100%;
    height: auto;
  }

  .shop .shopContent .shopImg {
    width: 100%;
    height: 300px;
  }

  .shop .shopContent .shopImg img {
    height: 100%;
    width: auto;
    margin: 0 auto;
  }

  .shop .shopContent .shopDes {
    width: auto;
    height: auto;
    padding: 0 10px;
  }

  .shop .shopContent .shopDes h3 {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .shop .shopContent .shopDes>ul {
    width: auto;
    height: auto;
  }

  .shop .shopContent .shopDes>ul>li {
    width: auto;
    height: 30px;
    line-height: 30px;
    color: #686868
  }

  .shop .shopContent .shopDes>ul>li span {
    margin-left: 10px;
  }

  .shop .shopContent .shopDes p {
    width: auto;
    height: 45px;
    line-height: 45px;
    color: #2a2a2a;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .shop .shopContent .shopDes .otherInfo {
    width: auto;
    height: 30px;
    display: flex;
  }

  .shop .shopContent .shopDes .otherInfo>span {
    flex: 1;
    line-height: 30px;
  }

  .shop .shopContent .about {
    width: auto;
    height: auto;
  }

  .shop .shopContent .about h3 {
    width: auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    background: #eee;
    color: #888888;
  }

  .shop .shopContent .about h4 {
    width: auto;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }

</style>

