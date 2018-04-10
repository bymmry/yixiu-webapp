<!-- 物流信息 -->
<template>
  <div class="logistics">
    <h3>填写物流信息</h3>
    <div class="inputs">

      <cube-select class="logisticsSelect" v-model="logistics" placeholder="请选择快递公司" :options="theLogisticsName" @change="selectServiceWay">
      </cube-select>
    </div>
    <div class="inputs">
      <cube-input v-model="value" placeholder="请输入运单号"></cube-input>
    </div>
    <div class="buttons">
      <cube-button class="logisticsButtons sure" @click="sureWuliu">确定</cube-button>
      <cube-button class="logisticsButtons" @click="cancleWuliu">取消</cube-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logistics: '',
        theLogistics: [],
        theLogisticsName: [],
        value: '',
        select: {
          company: "",
          value: ""
        }
      };
    },

    components: {},
    async created(){
      let that = this;
      let res = await this.$api.getData(`https://m.yixiutech.com/tracking/com`);
      if(res.code == 200){
        res.data.map((item) => {
          that.theLogisticsName.push(item.com);
        })
        this.theLogistics = res.data;
      }else{
        this.$toast("未获取到物流公司信息");
      }
      
    },
    methods: {
      selectServiceWay(val, index) {
        this.select.company = this.theLogistics[index].no;
      },
      async sureWuliu(){
        let that = this;
        this.select.value = this.value;
        if(this.select.company == ""){
          this.$toast("请选择物流公司");
        }else if(this.select.value == ""){
          this.$toast("请填写运单号");
        }else{
          //确定按钮
          let data = {
            company: this.select.company,
            val: this.select.value
          }
          this.returnSelect(data, "sure");
        }
        // this.returnSelect("close");
      },
      cancleWuliu(){
        this.returnSelect({},"close");
      },
      returnSelect(data, val){
        let re = {
          data: data,
          val: val
        }
        this.$emit("returnSelect", re);
      }
    }
  }

</script>

<style scoped>
  .logistics {
    width: 80vw;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
  }

  .logistics h3 {
    width: auto;
    height: 40px;
    line-height: 40px;
  }
  .logistics .inputs{
    padding: 10px;
  }
  .logistics .buttons{
    display: flex;
  }
  .logistics .buttons .logisticsButtons{
    flex: 1;
    margin: 5px;
  }
  .logistics .buttons .sure{
    background: #f85;
    color: #fff;
  }

</style>
