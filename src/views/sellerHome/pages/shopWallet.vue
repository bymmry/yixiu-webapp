<template>
    <div class="shopWallet">
        <div class="navBox">
            <div @click="goBack" class="back"><span><sicon name="find-leftArr" scale="1.2"></sicon>&nbsp;返回</span></div>
            <div class="navtitle">我的钱包</div>
            <div></div>
        </div>
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <div class="countBox">
                <img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/dribbble2.png" alt="">
                <div class="money">{{wallentMoney}} 元</div>
            </div>
        <!-- </van-pull-refresh> -->
        <div class="funcbtn">
            <button>提现</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "shop-wallet",
    data(){
        return {
            wallentMoney: 0
        }
    },
    async created() {
        const toast = this.$createToast({
			txt: '加载中...',
			type: 'correct'
		});
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        let res = await this.$api.sendData('https://m.yixiutech.com/shop/user', { openid: userData.wx.openid });
        if(res.code == 200){
            this.wallentMoney = res.data.money/100;
        }
        toast.hide();
    },
    methods: {
        goBack: function(){
            this.$router.push("/sellerHome");
        },
        getMoney: function(){

        }
    }
}
</script>

<style scoped>
    .shopWallet{
        width: 100%;
        height: 100vh;
    }
    .shopWallet .navBox{
        width: auto;
        height: 15vh;
        line-height: 15vh;
        display: flex;
        background-image: linear-gradient(to right, #434343 0%, black 100%);
        color: #fff;
    }
    .shopWallet .navBox > div{
        flex: 1;
    }
    .shopWallet .navBox .back span{
        display: inline-block;
        padding-left: 10px;
    }
    .shopWallet .navBox .navtitle{
        text-align: center;
    }
    .shopWallet .countBox{
        padding-top: 10vh;
        /*height: 70vh;*/
        text-align: center;
    }
    .shopWallet .countBox img{
        width: 186px;
        height: 263.3px;
    }
    .shopWallet .money{
        position: relative;
        color:#3c6b7a;
        font-size: 6vw;
        bottom: 35px;
    }
    .shopWallet .funcbtn{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .shopWallet .funcbtn button{
        border: none;
        background-color: #2796CB;
        float: left;
        padding: 0;
        width: 100vw;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 6vw;
        
        border-top: 1px solid #eee;
    }

</style>
