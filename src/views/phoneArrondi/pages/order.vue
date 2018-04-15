<template>
	<div class="order">
		<item-header
			:name="name"
		/>

		<div class="height"></div>

		<div v-show="!addressStatus" class="selectAddress" @click="selectAddress">
			<sicon name="location" scale="3"></sicon>
			<span>请选择收获地址</span>
			<div class="address-btn">
				<sicon name="right" scale="2"></sicon>
			</div>
		</div>

		<div v-show="addressStatus" class="selectAddresses" @click="selectAddress">
			<p><span>姓名:{{ address ? address.name : '' }}</span></p>
			<p><span>电话:{{ address ? address.tel : '' }}</span> </p>
			<p>地址: {{ address ? address.address : '' }} </p>
		</div>

		<div class="info">
			<p class="info__title">订单</p>
			<van-card
				:title="detail.name"
				num="1"
				:price="detail.price"
				:thumb="detail.cover"
				class="card"
			/>

			<van-cell-group class="group">

				<van-field
					class="field"
					label="留言"
					type="textarea"
					v-model="sureOrderData.remark"
					placeholder="请输入留言"
					rows="1"
					autosize
				/>

				<van-field
					label="配送方式"
					icon="clear"
					placeholder="快递"
					disabled
				/>
				
			</van-cell-group>

			<van-coupon-cell
				:coupons="coupons"
				:chosen-coupon="chosenCoupon"
				class="coupon"
				@click="showList = true"
			/>
		</div>

		<div class="info">
			<p class="info__title">支付方式</p>
			<p class="info__title title">微信支付</p>
		</div>

		<van-popup v-model="showList" position="bottom">
			<van-coupon-list
				:disabled-coupons="disabledCoupons"
				@change="onChange"
				@exchange="onExchange"
			/>
		</van-popup>

		<sure-order 
			:sureOrderData="sureOrderData"
			:TotalFee="sureOrderData.price"
			:nextStepButtonDisabled="nextStepButtonDisabled"
			class="sure"
		/>
	</div>
</template>

<script>
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  origin_condition: 0,
  reason: '',
  value: 150,
  name: '优惠券名称',
  start_at: 1489104000,
  end_at: 1514592000
};
import itemHeader from '../components/header';
import SureOrder from '../../common/components/sureOrder'
import iphoneX from '@/assets/iphoneX.png'
import { Card, SubmitBar, Field, Cell, CellGroup, CouponCell, Popup, CouponList, AddressList } from 'vant';
export default {
	methods: {
		selectAddress () {
			window.selectAddress = true;
			this.$router.push('/my/myaddress');
		},
		onSubmit () {
			
		},
		onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
	},
	async mounted () {
		this.detail = JSON.parse(sessionStorage.getItem('detail'));
		let user = JSON.parse(sessionStorage.getItem('userData'));
		console.log(this.detail)

		let address = sessionStorage.getItem('address');
		this.address = JSON.parse(address);

		address ? this.addressStatus = true : this.addressStatus = false;

		this.sureOrderData = {
			type: 2, // 商品类型
			user: user._id, // 所属用户标识，用户id
			shop: this.detail.shop, // 商铺标识，商铺id
			phone: this.address.tel,   // 联系电话
			address: this.address.address, // 地址
			goods: [this.detail._id], // 商品列表 ObjectId
			remark: '', // 备注
			paymentType: 0, // 在线支付
			price: this.detail.price, // 总金额(优惠券前额金额)
			payment: this.detail.price // 实付金额
		}
	},
  components: {
		itemHeader,
		[Card.name]: Card,
		[SubmitBar.name]: SubmitBar,
		[Field.name]: Field,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[CouponCell.name]: CouponCell,
		[Popup.name]: Popup,
		[CouponList.name]: CouponList,
		[AddressList.name]: AddressList,
		SureOrder
	},
	data () {
		return {
			name: '确认订单',
			showList: true,
			imageURL: iphoneX,
			chosenCoupon: -1,
			coupons: [coupon],
			nextStepButtonDisabled: false,
			disabledCoupons: [coupon],
			detail: {},
			addressStatus: false,
			address: '',
			sureOrderData: {
				type: 2, // 商品类型
				user: '', // 所属用户标识，用户id
				shop: '', // 商铺标识，商铺id
				phone: '',   // 联系电话
				address: '', // 地址
				goods: [], // 商品列表 ObjectId
				remark: '', // 备注
				paymentType: 0, // 在线支付
				price: '', // 总金额(优惠券前额金额)
				payment: '' // 实付金额
			}
		}
	}
}
</script>

<style scoped>
.order {
	width: 100%;
	height: 100%;
	background: #eee;
}

.info__title {
	border-left: 5px solid #ffbd5c;
	padding: 0 4%;
}

.info {
	width: 92%;
	padding: 2%;
	background: #fff;
	border-radius: 5px;
	margin: 2% auto 0 auto;
}

.height {
	width: 100%;
	height: 2%;
}

.coupon {
	width: 100%;
	margin: 8% auto;
}

.card {
	width: 100%;
	margin: 2% auto;
}

.sure {
	position: fixed;
	width: 100%;
	bottom: 0;
}

.title {
	border: 0;
	padding: 0 6%;
}

.group {
	width: 100%;
	margin: 8% auto;
	font-size: 12px;
}

.selectAddress {
	width: 86%;
	display: flex;
	background: #fff;
	padding: 2% 5%;
	border-radius: 4px;
	margin: 0 auto;
	justify-content: flex-start;
	align-items: center;
	position: relative;
}

.selectAddresses {
	width: 86%;
	background: #fff;
	padding: 2% 5%;
	border-radius: 4px;
	margin: 0 auto;
	position: relative;
	font-size: 12px;
}

.selectAddress span {
	margin-left: 5%;
}

.address-btn {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translate(0, -50%);
}

</style>
