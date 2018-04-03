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
            <button @click="getMoney">提现</button>
            <button @click="returnMoney" class="other">退保证金</button>
        </div>
        <cube-popup :center="false" type="my-popup" ref="getMyMoney">
            <div class="moneyBox">
                <h3>请输入提现金额(元)</h3>
                <input placeholder="0" v-model="MoneyValue">
                <cube-button @click="sureGet">提现到微信</cube-button>
                <cube-button class="bottom" @click="closeMoney">取消</cube-button>
            </div>
        </cube-popup>
    </div>
</template>

<script>
export default {
    name: "shop-wallet",
    data(){
        return {
            wallentMoney: 0,
            MoneyValue: ""
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
            const getMyMoney = this.$refs.getMyMoney
            getMyMoney.show();
        },
        sureGet: function(){
            const getMyMoney = this.$refs.getMyMoney
            let that = this;
            if (this.MoneyValue != '') {
                console.log(this.MoneyValue,this.wallentMoney)
                if(Number(this.MoneyValue) >= Number(this.wallentMoney)){
                    this.$createToast({
                    type: 'warn',
                    time: 1000,
                    txt: '你没有那么多钱'
                }).show()
                }else{
                    this.$createDialog({
                        type: 'confirm',
                        title: '提现到微信',
                        content: that.MoneyValue + '元',
                        confirmBtn: {
                            text: '确定',
                            active: true,
                            disabled: false,
                            href: 'javascript:;'
                        },
                        cancelBtn: {
                            text: '取消',
                            active: false,
                            disabled: false,
                            href: 'javascript:;'
                        },
                        onConfirm: () => {
                            this.$createToast({
                                type: 'warn',
                                time: 1000,
                                txt: '点击确认按钮'
                            }).show()
                        },
                        onCancel: () => {
                            getMyMoney.hide();
                        }
                    }).show()
                }
                
            }else{
                this.$createToast({
                    type: 'warn',
                    time: 1000,
                    txt: '未输入金额'
                }).show()
            }

            

            // getMyMoney.hide();
        },
        returnMoney: function(){
            alert("请联系客服");
        },
        closeMoney: function(){
            const getMyMoney = this.$refs.getMyMoney
            getMyMoney.hide();
        },
        moneyBackSure: function(){

        }
    }
}
</script>

<style scoped>
    .shopWallet{
        width: 100%;
        height: 85vh;
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
        display: flex;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .shopWallet .funcbtn button{
        flex: 1;
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
    .shopWallet .funcbtn button.other{
        background: #fff;
        color: #2796CB;
    }

    .moneyBox{
        width: 100vw;
        height: 85vh;
        margin: 0 auto;
        background: #fff;
    }
    .moneyBox h3{
        padding: 10px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .moneyBox input{
        display: block;
        margin: 0 auto;
        padding: 5px 10px;
        width: auto;
        height: 30px;
        border: 2px solid #eee;
        border-radius: 5px;
    }
    .moneyBox button{
        margin: 20px auto;
        width: 60%;
    }
    .moneyBox button.bottom{
        width: 100%;
        position: absolute;
        bottom: 0;
    }

</style>
