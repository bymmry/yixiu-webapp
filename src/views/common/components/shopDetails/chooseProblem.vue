<template>
  <div class="problem">
    <div class="readySelectedSpace">
      <p class="readySelected">已选：<span v-if="item.name" v-for="(item,index) in selectedProblem" :key="index">{{item.name}}</span></p>
    </div>
    <div class="proContent">
      <div class="problemSort">
        <ul ref="problemSort">
          <li
            :class="{'selected': currentIndex === index}"
            :data-index="index"
            :data-id="item._id"
            @click="selectChildren"
            v-for="(item, index) in items"
            :key="index">{{item.name}}
          </li>
        </ul>
      </div>
      <div
        :class="{'childShow': currentChildIndex === childIndex}"
        class="problemDetail"
        ref="problemDetail"
        :data-index="childIndex"
        v-for="(child, childIndex) in items.length"
        :key="childIndex"
        v-if="parent[childIndex].data.length"
      >
          <span
            @click="selectProblem"
            :data-id="item._id"
            :data-index="index"
            data-isSelected="0"
            v-for="(item, index) in parent[childIndex].data"
            :key="index"
          >{{item.name}}&nbsp;￥{{item.price}}
          </span>
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
  import { Button, TreeSelect, Toast } from 'vant';
  import { getPhoneProblem, getChildrenProblem } from '../../api';
  export default {
    name: 'choose-problem',
    components: {
      [Button.name]: Button,
      [TreeSelect.name]: TreeSelect,
      [Toast.name]: Toast
    },
    data() {
      return {
        nextStepButtonDisabled: true,
        items: [],
        itemsChildren: [],
        currentIndex: 0,
        currentChildIndex: 0,
        selectedProblem: [{
          name: ""
        }],
        selectedServer: [],
        parent: [],
        parentIndex: 0
      }
    },
    props: {
      phoneModel: {
        type: String,
        default: ""
      }
    },
    created() {
      this.getPhoneProblem();
    },
    watch: {
      phoneModel: function () {
        this.getPhoneProblem();
      },
      parent: function (val) {
        return val;
      }
    },
    methods: {
      getPhoneProblem: function () { //获取父元素列表
        let shopId = this.$route.params.data._id;
        getPhoneProblem(shopId).then((res) => {
          if(res.code === 200){
            this.items = res.data;
            this.parent = [];
            if (this.parent.length === this.items.length){

            }else {
              for(let i=0; i<this.items.length; i++){
                this.parent.push({type: i, data: {}});
              }
            }
            // this.parent.length = this.items.length;
            // this.selectedServer.length = this.items.length;
            console.log("step1--------------------->");
            this.getProblem(res.data);
          }
        }, function (err) {
          console.log(err);
        });
      },
      getProblem: function (data) {
        let req = {
          shop: this.$route.params.id,//商铺id
          category: data[this.currentChildIndex]._id,//分类id
          phoneModel: this.phoneModel//手机型号id
        };
        this.getChildrenProblem(req, this.currentChildIndex);
      },
      getChildrenProblem: function (req, index) { // 获取子元素列表
        const toast = this.$createToast({
				  message: '加载中...'
        });
        toast.show();
        // this.parent = [];
        getChildrenProblem(req).then(res => {
          this.itemsChildren = res.data;
          this.parentIndex = index;
          this.parent[index].data = Object.assign(this.itemsChildren, this.parent[index].data);
          console.log("step2------------------------------->");
          setTimeout(function(){
            toast.hide();
          },100)
          // }
        }, err => {
          console.log(err);
        });
      },
      goBack: function () {
        this.$emit("goBackPrevStep", true)
      },
      nextStep: function () {
        this.getSelectedServer();
        this.$emit('returnProblem', this.selectedServer);
      },
      selectChildren: function (item) { //父列表选择
        let target = item.target;
        let parentIndex = target.getAttribute("data-index");
        this.currentChildIndex = Number(parentIndex);
        let problemSort = this.$refs.problemSort;
        let problemSortLi = problemSort.getElementsByTagName("li");
        for(let i=0; i<problemSortLi.length; i++){
          let tar = problemSortLi[i];
          if(this.hasClass(tar, 'selected')){
            this.removeClass(tar, "selected");
          }
        }
        this.addClass(target, 'selected');

        let id = target.getAttribute("data-id");
        let req = {
          shop: this.$route.params.id,//商铺id
          category: id,//分类id
          phoneModel: this.phoneModel//手机型号id
        };
        this.getChildrenProblem(req, this.currentChildIndex);
      },
      selectProblem: function (item) { //子列表选择
        let tar = item.target;
        let isSelected = tar.getAttribute("data-isSelected");
        let childIndex = tar.getAttribute("data-index");

        this.setTarget(tar, isSelected);
        this.getSelectedServer(childIndex);

        if(this.selectedServer.length === 0){
          this.nextStepButtonDisabled = true;
        }else {
          this.nextStepButtonDisabled = false;
        }

      },

      getSelectedServer: function (childIndex) {
        let that = this;
        that.selectedServer = [];
        // this.selectedServer.push(this.parent[this.parentIndex].data[childIndex]);
        let problemSort = this.$refs.problemSort.getElementsByTagName('li');  // 父列表
        let problemDetail = this.$refs.problemDetail; // 子列表
        for(let i=0; i<problemDetail.length; i++){
          let chi = problemDetail[i];
          let index = chi.getAttribute("data-index");
          let spans = chi.getElementsByTagName("span");
          console.log(spans);
          if(spans != 0){
            for(let j=0; j<spans.length; j++){
              let span = spans[j];
              console.log(span);
              let isSelected = span.getAttribute("data-isSelected");
              if(isSelected == "1"){
                that.selectedServer.push(that.parent[index].data[j]);
              }
            }
          }
        }
        // if(problemDetail.length){
        //   for(let i=0; i<problemDetail.length; i++){
        //     let target = problemDetail[i];
        //     console.log(target);
        //     let spans = target.getElementsByTagName("span");
        //     for(let j=0; j<spans.length; j++){
        //       let span = spans[j];
        //       let isSelected = span.getAttribute("data-isSelected");
        //       if(isSelected == "1"){
        //         console.log("that.parent[i].data[j]---------------------------------------------------",i);
        //         console.log(that.parent[i].data);
        //         that.selectedServer.push(that.parent[i].data[childIndex]);
        //       }
        //     }
            
        //   }
        // }
        console.log(this.selectedServer);
        this.selectedProblem = this.selectedServer;
        let TotalFee = 0;
        for(let i=0; i<this.selectedServer.length; i++){
          TotalFee += this.selectedServer[i].price;
        }
        this.selectedServer.TotalFee = TotalFee;
      }
    }
  };
</script>

<style scoped>
  .problem{
    width: auto;
    height: auto;
    font-size: 13px;
  }
  .problem .proContent{
    width: auto;
    height: 41vh;
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
    font-size: 12px;
    border-bottom: 1px solid #c7c7c7;
  }
  .problem .proContent > div.problemSort ul li.selected{
    color: #fd9153;
    border-bottom: 1px solid #fd9153;
  }
  .problem .proContent > div.problemDetail{
    display: none;
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
    bottom: 5px;
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

  .readySelectedSpace{
    height: 20px;
  }
  p.readySelected{
    padding-left: 10px;
    font-size: 12px;
  }
  p.readySelected span{
    color: #fd9153;
    display: inline-block;
    width: auto;
    padding: 0 2px;
  }
  .problem .proContent > div.childShow{
    display: block;
    overflow: scroll;
    /*background-color: #eee;;*/
  }
</style>
