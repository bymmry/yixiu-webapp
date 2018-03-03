<template>
  <div class="brand">
    <div class="stepsContent" ref="stepsContent">
      <span data-isSelected="0" @click="selectBrand(index)" class="brand" v-for="(item, index) in mockData.brand">{{item.name}}</span>
    </div>
    <van-button @click="nextStep" class="stepsButton" :disabled="nextStepButtonDisabled" bottom-action size="large">
      <sicon name="nextStep" scale="1.8"></sicon><span>下一步</span>
    </van-button>
  </div>
</template>

<script>
  import { Button } from 'vant';
  export default {
    name: 'choose-brand',
    components: {
      [Button.name]: Button
    },
    data() {
      return {
        nextStepButtonDisabled: true,
        selectedBrand: "",
        mockData: {
          "brand": [
            {"name": '苹果'},
            {"name": '三星'},
            {"name": '索尼'},
            {"name": '小米'},
            {"name": '华为'},
            {"name": '魅族'},
            {"name": '荣耀'},
            {"name": '一加'},
            {"name": '锤子'},
            {"name": 'VIVO'},
            {"name": 'OPPO'},
            {"name": '金立'},
            {"name": '诺基亚'},
          ]
        }
      }
    },
    methods: {
      selectBrand: function (index) {
        let brand = this.$refs.stepsContent.getElementsByTagName("span")[index];
        let that = this;
        _isBrandSelected(brand);
        function _isBrandSelected(target) {
          let isSelected = target.getAttribute("data-isSelected");
          let stepsContent = that.$refs.stepsContent;
          that.isOnlyOneSelected(stepsContent, "span");
          that.setTarget(target, isSelected);
          let nextInfo = that.isShowNextStep(stepsContent);

          console.log(nextInfo);
          that.selectedBrand = nextInfo.val;
          that.nextStepButtonDisabled = nextInfo.nextStepButtonDisabled;
        }

      },
      nextStep: function () {
        this.$emit('returnBrand', this.selectedBrand);
      }
    }
  };
</script>

<style scoped>
  .brand .stepsContent{
    width: auto;
    height: auto;
    padding: 0 2vw;
  }
  .brand .stepsContent span.brand{
    display: inline-block;
    text-align: center;
    background-color: #fcfcfc;
    width: 20vw;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    margin: 10px 2vw;
    border: 1px;
    color: #676767;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #ededed;
  }
  .brand .stepsButton{
    position: absolute;
    bottom: 0;
    border: none;
    border-radius: 3px;
  }
  .brand .stepsButton svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .brand .stepsButton span{
    vertical-align: middle;
  }

</style>
