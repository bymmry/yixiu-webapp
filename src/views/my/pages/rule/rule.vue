<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="翼修全国维修联保规范"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <cube-scroll class="scroll">

    <div class="contant canchose">
      <h2>翼修全国维修联保规范</h2>
      <div class="BFC">
        <ul>
          <li>1. 翼修平台有着严格的流程监管制度，工程师不得以维修以外的任何理由转移、查阅、调用客户设备里的任何数据，但翼修平台不排除因不可控因素而造成检修设备数据泄露的任何可能。</li>
          <li>2. 请您务必于下单前备份并清除待检修设备的敏感数据。翼修平台不会承担该设备于维修过程中因数据丢失、泄露等因素而造成的任何损失及责任。</li>
          <li>3. 维修过程中，如因维修失误而造成的其他故障，翼修平台承诺将免费修复，不额外收取费用；如设备完全损坏，翼修平台将向您赔偿一部同等型号等价（不保证地区版本）的设备。</li>
          <li>4. 维修过程中，若由于个人原因，工程师和用户之间出现的任何纠纷问题，翼修平台会积极主动为用户协商解决。</li>
          <li>5. 设备经翼修检测后，如果您自愿放弃维修，需要承担回寄给您的快递费和快递物品保价费。</li>
          <li>6. 对于因跌落、磕碰、挤压或进液面积达10%以上而丧失部分或全部功能的设备，翼修平台仅对您指定需修复的功能负维修责任。对于设备其他已知或未知的故障不承担任何责任。</li>
          <li>7. 请您务必于下单时认真填写待检修设备的相关信息。翼修平台不会承担因您所提交信息的错误或缺漏而导致设备于维修过程中出现任何故障的责任。</li>
          <li>8. 设备维修完成后，如在30天内不在线支付（维修、支付宝、维修支付）维修费用，翼修平台视您放弃设备的处置权，翼修平台将获得设备处理权。</li>
          <li>9. 翼修平台承诺我平台更换零件均采用高品质零配件进行设备维修。</li>
          <li>10. 翼修平台承诺在我平台维修的每一台手机都享受3个月全国联保，即你在一个城市维修后有问题都可以到其他任何一个城市的服务商进行保修。</li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="BFC">
        <h3>免责声明</h3>
      </div>
      <div class="BFC">
        <ul>
          <li>(1) 维修故障点之外的故障不予保修。</li>
          <li>(2) 产品进液或受潮不予保修。</li>
          <li>(3) 自行拆装修理不予保修。</li>
          <li>(4) 人为损坏不予保修。</li>
          <li>(5) 由于受了非正常的外力挤压、冲击或长时间暴露在潮湿、高温的环境中，或由于受到化学侵蚀的氧化，或由于受到高电网电压异常波动，或其他不可抗力导致的产品损坏不予保修。</li>
          <li>(6) 产品在使用过程中的自然磨损和材料自然老化原因导致的产品损坏不予保修。</li>
          <li>(7) 主板上的封机标脱落或丢失不予保修。</li>
        </ul>
      </div>
      
      <div class="line"></div>
      <div class="BFC">
        <h3>【关于维修费用】</h3>
      </div>
      <p>您支付的维修费用由两部分构成：零配件费用和维修工程师的服务费。</p>
      <p>以上条款最终解释权归翼修平台所有。</p>
    </div>

    </cube-scroll>
  </div>

</template>

<script>
  import { NavBar } from 'vant';

  export default {
    data () {
      return {
        //默认信息属性

      }
    },
    components: {
      [NavBar.name]: NavBar
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .scroll {
    width: 100%;
    height: 84vh;
  }
  .myinfo-container{
    min-height: 79vh;
    padding: 2vh 3vw 0vh 3vw;
    background: #fff;
    overflow: hidden;
  }
  .topblank{
    margin-top: 45.6px;
  }
  .contant{
    padding: 80px 4vw;
    padding-top: 0;
  }
  h2{
    font-size: 5vw;
    margin-top: 1vh;
    margin-bottom: 1vh;
    text-align: center;
  }
  .BFC{
    overflow: hidden;
  }
  ul{
    margin: 2vh 0;
    margin-bottom: 0;
  }
  ul li{
    margin-bottom: 2vh;
    line-height: 5.3vw;
    font-size: 4vw;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #E2DED3;
    margin: 2vh 0;
  }
  h3{
    font-weight: 700;
    font-size: 4vw;
    margin-top: 1vh;
  }
  p{
    margin-top: 1vh;
    font-size: 600;
  }
  .canchose{
    -moz-user-select: text;
    -khtml-user-select: text;
    user-select: text;
  }
</style>