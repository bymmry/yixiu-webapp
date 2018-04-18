<template>
	<div class="position__space">
		<div class="spaceTitle">
			<span>定位/最近访问</span>
			<span class="delData" @click="delData">
				清除记录
				<sicon name="cancel" scale="1.3"></sicon>
			</span>
			
		</div>
		<div class="spaceCityBtn">
			<div class="cityBtn" v-for="(item,index) in recentCity" @click="pitchOn(item)">	
				<sicon v-if="index==0" name="local-local" scale="1.5"></sicon>
				<span>{{item}}</span>
			</div>
		</div>
		<div class="spaceTitle">热门城市</div>
		<div class="spaceCityBtn">
			<div class="cityBtn" v-for="item in spaceCity" @click="pitchOn(item)">{{item}}</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
export default {
	data(){
		return {
			city:"",
			recentCity:[],
			spaceCity:["成都","重庆市","北京市","深圳","西安","广州","贵阳","武汉","上海市"],
		}
	},
	components: {
      [Toast.name]: Toast
    },
	methods: {
		pitchOn(item) {
		  	this.$emit('pitchOn2', item);
		},
		delData(){
			localStorage.removeItem('recentCity');
			this.recentCity = [this.city];
			localStorage.setItem('recentCity', JSON.stringify(this.recentCity));
			Toast('已清除历史记录');
		}
	},
	created(){
		this.city = sessionStorage.getItem('nowcity');
		let recentCityData = JSON.parse(localStorage.getItem('recentCity'));
		
		if (recentCityData && recentCityData!=null) {
			let PD = false;

			for(let item in recentCityData){
				if (recentCityData[item]==this.city) {
					PD = item;
					break;
				}
			}

			if (PD===false) {
				this.recentCity.unshift(this.city)
				this.recentCity = this.recentCity.concat(recentCityData);
				if (this.recentCity.length>3) {
					let newCityData = [this.recentCity[0],this.recentCity[1],this.recentCity[2]]
					this.recentCity = newCityData;
				}
				localStorage.setItem('recentCity', JSON.stringify(this.recentCity));
			}else{
				let changeItem = recentCityData[0];
				recentCityData[0] = recentCityData[PD];
				recentCityData[PD] = changeItem;
				this.recentCity = this.recentCity.concat(recentCityData)
				if (this.recentCity.length>3) {
					let newCityData = [this.recentCity[0],this.recentCity[1],this.recentCity[2]]
					this.recentCity = newCityData;
				}
				localStorage.setItem('recentCity', JSON.stringify(this.recentCity));
			}
		}else{
			this.recentCity.unshift(this.city);
			localStorage.setItem('recentCity', JSON.stringify(recentCityData));
		}

		for(let i in this.recentCity){
			if (this.recentCity[i]=="成都") {
				if (this.recentCity[i+1]) {
					this.recentCity[i] = this.recentCity[i+1]
					i++
				}else{
					delete this.recentCity[i];
					this.recentCity.length = this.recentCity.length-1;
					break;
				}
			}
		}
	}
}
</script>

<style scoped>
.position__space {
	background: #f4f4f4;
	padding: 8px;
	padding-left: 4vw;
	font-weight: 700;
	display: flex;
	flex-direction: column;
	/*border-bottom: 1px solid #d8d8d8;*/
	font-size: 4vw;
}
.spaceTitle{
	color: #939393;
	margin-top: 3vh;
}
.spaceCityBtn{
	margin-top: 3vh;
}
.cityBtn{
	display: inline-block;
	width: 28%;
	min-height: 28px;
	text-align: center;
	line-height: 34px;
	padding-bottom: 5px; 
	border:1px solid #d7d7d7;
	border-radius: 5px;
	background: #fff;
	margin-right: 3%;
	margin-bottom: 2vh;
}
.delData{
	display: flex;
	align-items: center;
	float: right;
	margin-right: 10%;
	font-size: 3vw;
	border: 1px solid #fff;
	border-radius: 2px;
	background: rgba(250,250,250,1);
}
.delData svg{
	margin-left: 3px;
}
</style>