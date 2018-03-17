<template>
  <div class="model">
    <div class="modelList" ref="stepsContent">
      <span data-isSelected="0" @click="selectModel" v-for="(item, index) in model" :key="index">{{item.name}}</span>
    </div>
    <div class="stepButton">
      <div class="stepPrev">
        <van-button @click="goBack" bottom-action>
          <sicon name="back" scale="1.8"></sicon><span>上一步</span>
        </van-button>
      </div>
      <div class="stepNext">
        <van-button @click="nextStep" bottom-action :disabled="nextStepButtonDisabled">
          <sicon name="nextStep" scale="1.8"></sicon><span>下一步</span>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'vant';
  import { getPhoneModel } from "../../api"
  export default {
    name: 'choose-model',
    components: {
      [Button.name]: Button
    },
    data() {
      return {
        model: [],
        nextStepButtonDisabled: true,
        selectedModel: ""
      }
    },
    props: {
      brand: {
        type: Object
      }
    },
    created() {
      this.getModel(this.brand._id);
    },
    watch: {
      brand: function (val) {
        this.brand = val;
        this.getModel(val._id);
      }
    },
    methods: {
      goBack: function () {
        this.$emit("goBackPrevStep", true)
      },
      getModel: function (id) {
        let shopId = this.$route.params.id;
        let req = {
          shop: shopId,//店铺id
          manufacturer: id//手机品牌id
        };
        getPhoneModel(req).then((res) => {
          if(res.code === 200){
            this.model = res.data;
          }
        }, function (err) {
          console.log(err);
        })
      },
      selectModel: function (item) {
        let tar = item.target;
        let isSelected = tar.getAttribute("data-isSelected");
        let target = this.$refs.stepsContent;

        this.isOnlyOneSelected(target, 'span');
        this.setTarget(tar, isSelected);
        let nextInfo = this.isShowNextStep(target);

        this.selectedModel = this.model[nextInfo.index];
        this.nextStepButtonDisabled = nextInfo.nextStepButtonDisabled;
        this.nextStep();
      },
      nextStep: function () {
        console.log("------------------------------------>nextStep()");
        console.log(this.selectedModel);
        this.$emit('returnModel', this.selectedModel);
      }
    }
  };
</script>

<style scoped>
  .model{
    width: auto;
    height: auto;
  }
  .model .modelList{
    width: auto;
    height: 46vh;
    overflow: scroll;
    padding: 1vh 10px;
  }
  .model .modelList span{
    margin-bottom: 10px;
    display: block;
    width: auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #666666;
    background-color: #fcfcfc;
    border-radius: 4px;
    box-shadow: 2px 2px 2px #ededed;
  }
  .model .stepButton{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 5px;
  }
  .model .stepButton > div{
    width: 100%;
    flex: 1;
    padding: 0 5px;
  }
  .model .stepButton > div button{
    border-radius: 4px;
  }
  .model .stepButton > div.stepPrev button{
    background-color: #4a4c5b;
  }
  .model .stepButton > div button svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .model .stepButton > div button span{
    vertical-align: middle;
  }


</style>
