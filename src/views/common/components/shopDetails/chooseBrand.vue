<template>
  <div class="brand">
    <div class="stepsContent" ref="stepsContent">
      <span data-isSelected="0" @click="selectBrand(index)" class="brand" v-for="(item, index) in brandData">{{item.name}}</span>
    </div>
    <van-button @click="nextStep" class="stepsButton" :disabled="nextStepButtonDisabled" bottom-action size="large">
      <sicon name="nextStep" scale="1.8"></sicon><span>下一步</span>
    </van-button>
  </div>
</template>

<script>
  import { Button } from 'vant';
  import { getPhoneBrand } from "../../api";
  export default {
    name: 'choose-brand',
    components: {
      [Button.name]: Button
    },
    data() {
      return {
        nextStepButtonDisabled: true,
        selectedBrand: "",
        brandData: []
      }
    },
    created() {
      getPhoneBrand().then((res) => {
        if(res.code === 200){
          this.brandData = res.data;
        }
      }, function (err) {
        console.log(err);
      })
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

          that.selectedBrand = that.brandData[nextInfo.index];
          that.nextStepButtonDisabled = nextInfo.nextStepButtonDisabled;
        }

      },
      nextStep: function () {
        console.log("------------------------------------>nextStep()");
        console.log(this.selectedBrand);
        this.$emit('returnBrand', this.selectedBrand);
      }
    }
  };
</script>

<style scoped>
  .brand .stepsContent{
    width: auto;
    height: 48vh;
    padding: 0 2vw;
    overflow-y: scroll;
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
