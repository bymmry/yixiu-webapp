<template>
  	<div class="payBail">
	  	<div class="payAttention">
		  <p>缴纳保证金注意事项</p>
	  	</div>
		<van-button @click="surePayBail" bottom-action>
      		<sicon name="nextStep" scale="1.8"></sicon><span>缴纳保证金￥{{this.totalFee}}</span>
    	</van-button>
	</div>
</template>


<script>
import { Button, Dialog } from "vant";
import wx from "weixin-js-sdk";
export default {
  components: {
	[Button.name]: Button,
	[Dialog.name]: Dialog
  },
  data() {
    return {
	  totalFee: 3000,
	  shopId: ""
    };
  },
  methods: {
    surePayBail: function() {
	  console.log(this.totalFee);
	  this.shopId = JSON.parse(localStorage.getItem('shopData'))._id
	  Dialog.confirm({
          title: '是否立即支付',
        }).then(() => {
		  // on confirm
		  console.log(this);
		  let payInfo = {
			  shopId:this.shopId,
			  totalFee: this.totalFee
		  }
          this._pay(payInfo);
        }).catch(() => {
          // on cancel
          console.log("取消");
        });
    },
    _pay: function(payInfo) {
      let isWxMini;
      // console.log(data);
      isWxMini = window.__wxjs_environment === "miniprogram";

      if (isWxMini) {
        console.log(isWxMini);
        let jumpUrl = encodeURIComponent(window.location.origin);
        let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(
          payInfo
        )}&jumpUrl=${jumpUrl}`;
        wx.miniProgram.navigateTo({
          url: path
        });
      } else {
        alert("非小程序环境");
      }
    }
  }
};
</script>

<style scoped>

</style>
