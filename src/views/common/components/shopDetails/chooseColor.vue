<template>
    <div class="color">
      <div class="colorList" ref="stepsContent">
        <span data-isSelected="0" @click="selectColor" v-for="(item, index) in color">{{item}}</span>
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
  export default {
    name: 'choose-color',
    components: {
      [Button.name]: Button,
    },
    props: {
      model: {
        type: Object
      }
    },
    data() {
      return {
        color: [],
        nextStepButtonDisabled: true,
        selectedColor: ""
      }
    },
    created() {
      //  初始ajax请求数据
      if(this.model.color){
        this.getColor(this.model.color);
      }
    },
    watch: {
      model: function (val) {
        this.model.color = val.color;
        this.getColor(val.color);
      }
    },
    methods: {
      goBack: function () {
        this.$emit("goBackPrevStep", true)
      },
      getColor: function (val) {
        if (val){
          this.color = val;
        }
      },
      selectColor: function (item) {
        let tar = item.target;
        let isSelected = tar.getAttribute("data-isSelected");
        let target = this.$refs.stepsContent;

        this.isOnlyOneSelected(target, 'span');
        this.setTarget(tar, isSelected);
        let nextInfo = this.isShowNextStep(target);

        this.selectedColor = this.color[nextInfo.index];
        this.nextStepButtonDisabled = nextInfo.nextStepButtonDisabled;
      },
      nextStep: function () {
        console.log("------------------------------------>nextStep()");
        console.log(this.selectedColor);
        this.$emit('returnColor', this.selectedColor);
      }
    }
  };
</script>

<style scoped>
  .color{
    width: auto;
    height: auto;
  }
  .color .colorList{
    width: auto;
    height: 46vh;
    overflow: scroll;
    padding: 1vh 10px;
  }
  .color .colorList span{
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
  .color .stepButton{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
  }
  .color .stepButton > div{
    width: 100%;
    flex: 1;
    padding: 0 5px;
  }
  .color .stepButton > div button{
    border-radius: 4px;
  }
  .color .stepButton > div.stepPrev button{
    background-color: #4a4c5b;
  }
  .color .stepButton > div button svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .color .stepButton > div button span{
    vertical-align: middle;
  }
</style>
