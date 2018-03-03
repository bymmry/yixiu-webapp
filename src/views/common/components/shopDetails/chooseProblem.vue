<template>
    <div class="problem">
      <div class="proContent">
        <div class="problemSort">
          <ul ref="problemSort">
            <li :class="{'selected': currentIndex === index}" @click="selectChildren" v-for="(item, index) in items">{{item.text}}</li>
          </ul>
        </div>
        <div class="problemDetail" ref="problemDetail">
          <span @click="selectProblem" data-isSelected="0" v-for="item in itemsChildren">{{item.name}}</span>
        </div>
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
  import { Button, TreeSelect } from 'vant';
  export default {
    name: 'choose-problem',
    components: {
      [Button.name]: Button,
      [TreeSelect.name]: TreeSelect
    },
    data() {
      return {
        nextStepButtonDisabled: true,
        items: [],
        itemsChildren: [],
        currentIndex: 0,
        selectedProblem: ""
      }
    },
    created() {
      this.items = [
        {
          text: '电池电源',
        },
        {
          text: '屏幕问题',
        },
        {
          text: '摄像头问题'
        },
        {
          text: '声音问题'
        },
        {
          text: '按键问题'
        },
        {
          text: '外壳问题'
        },
        {
          text: '信号/有线/无线'
        }
      ]
      this.getProblem();
    },
    methods: {
      getProblem: function () {
        let children = [
          {
            name: '问题1'
          },{
            name: '问题2'
          },{
            name: '问题3'
          }];
        this.itemsChildren = children;
      },
      goBack: function () {
        this.$emit("goBackPrevStep", true)
      },
      nextStep: function () {
        this.$emit('returnProblem', this.selectedProblem);
      },
      selectChildren: function (item) {
        let target = item.target;
        let problemSort = this.$refs.problemSort;
        let problemSortLi = problemSort.getElementsByTagName("li");
        for(let i=0; i<problemSortLi.length; i++){
          let tar = problemSortLi[i]
          if(this.hasClass(tar, 'selected')){
            this.removeClass(tar, "selected");
          }
        }
        this.addClass(target, 'selected');
        this.itemsChildren = [
          {
            name: '问题4'
          },{
            name: '问题5'
          }];
      },
      selectProblem: function (item) {
        let tar = item.target;
        let isSelected = tar.getAttribute("data-isSelected");
        let target = this.$refs.problemDetail;

        this.isOnlyOneSelected(target, 'span');
        this.setTarget(tar, isSelected);
        let nextInfo = this.isShowNextStep(target);

        this.selectedProblem = nextInfo.val;
        this.nextStepButtonDisabled = nextInfo.nextStepButtonDisabled;

      }
    }
  };
</script>

<style scoped>
  .problem{
    width: auto;
    height: auto;
  }
  .problem .proContent{
    width: auto;
    height: 48vh;
    display: flex;
  }
  .problem .proContent > div.problemSort{
    flex: 3;
    overflow: scroll;
  }
  .problem .proContent > div.problemSort ul li{
    width: auto;
    margin: 0 10px;
    padding: 15px 0;
    font-size: 14px;
    border-bottom: 1px solid #c7c7c7;
  }
  .problem .proContent > div.problemSort ul li.selected{
    color: #fd9153;
    border-bottom: 1px solid #fd9153;
  }
  .problem .proContent > div.problemDetail{
    flex: 5;
    padding: 10px 10px;
  }
  .problem .proContent > div.problemDetail span{
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


  .problem .stepButton{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
  }
  .problem .stepButton > div{
    width: 100%;
    flex: 1;
    padding: 0 5px;
  }
  .problem .stepButton > div button{
    border-radius: 4px;
  }
  .problem .stepButton > div.stepPrev button{
    background-color: #4a4c5b;
  }
  .problem .stepButton > div button svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .problem .stepButton > div button span{
    vertical-align: middle;
  }

</style>
