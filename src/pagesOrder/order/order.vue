<script setup lang="ts">
import { getOrderPreApi, getOrderPreNowApi, getOrderRepurchaseApi, postOrderApi } from '@/api/order';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { computed, ref } from 'vue'
import type { Goods, OrderParams, OrderResult, Summary, UserAddresses } from '@/types/order'
import { useAddressStore } from '@/store/modules/address';

const query = defineProps<{
  skuId?: string
  count?: number
  addressId?: string
  orderId?: string
}>()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单备注
const buyerMessage = ref('')
// 配送时间
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
// 当前配送时间下标
const activeIndex = ref(0)
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])
// 修改配送时间
const onChangeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  activeIndex.value = ev.detail.value
}
const addressStore = useAddressStore()
const goods = ref<Goods[]>([])
const summary = ref<Summary>()
const userAddresses = ref<UserAddresses[]>([])
const getOrderPreList = async () => {
  let res = (query.skuId && query.count) ? await getOrderPreNowApi({ skuId: query.skuId, count: query.count! })
    : query.orderId ? await getOrderRepurchaseApi(query.orderId)
      : await getOrderPreApi()
  goods.value = res.result.goods
  summary.value = res.result.summary
  userAddresses.value = res.result.userAddresses
  console.log("getOrderPreList::::", res)
}

const selectAddress = computed(() => {
  return addressStore.addressInfo || userAddresses.value.find(item => item.isDefault)
})

const onTapSubmitOrder = async () => {
  if (!selectAddress.value?.id) {
    uni.showToast({
      icon: 'error',
      title: '请选择收货地址'
    })
    return
  }
  const params: OrderParams = {
    goods: goods.value.map(v => {
      return {
        skuId: v.skuId,
        count: v.count
      }
    }),
    addressId: selectAddress.value.id,
    deliveryTimeType: 1,
    buyerMessage: buyerMessage.value,
    payType: 1,
    payChannel: 2
  }
  let res = await postOrderApi(params)
  uni.redirectTo({
    url: `/pagesOrder/order-detail/order-detail?id=${res.result.id}`
  })
  console.log("postOrderApi::::", res)
}

onShow(() => {
  getOrderPreList()
})
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator v-if="selectAddress" class="shipment" hover-class="none" url="/pagesMember/address/address?from=order">
      <view class="user"> {{ selectAddress?.receiver }} {{ selectAddress?.contact }} </view>
      <view class="address"> {{ selectAddress?.fullLocation }} {{ selectAddress?.address }}</view>
      <text class="icon icon-right"></text>
    </navigator>
    <navigator v-else class="shipment" hover-class="none" url="/pagesMember/address/address?from=order">
      <view class="address"> 请选择收货地址 </view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator v-for="item in goods" :key="item.id" :url="`/pages/goods/goods?id=${item.id}`" class="item"
        hover-class="none">
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name ellipsis"> {{ item.name }} </view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.payPrice }}</view>
            <view class="price symbol">{{ item.price }}</view>
          </view>
          <view class="count">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ activeDelivery.text }}</view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input class="input" :cursor-spacing="30" placeholder="选题，建议留言前先与商家沟通确认" v-model="buyerMessage" />
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ summary?.totalPrice.toFixed(2) }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ summary?.postFee.toFixed(2) }}</text>
      </view>
    </view>
  </scroll-view>

  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ summary?.totalPayPrice.toFixed(2) }}</text>
    </view>
    <view class="button" @tap="onTapSubmitOrder" :class="{ disabled: !selectAddress?.id }"> 提交订单 </view>
  </view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.symbol::before {
  content: '¥';
  font-size: 80%;
  margin-right: 5rpx;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png) 20rpx center / 50rpx no-repeat #fff;
  position: relative;

  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }

  .user {
    color: #333;
    margin-bottom: 5rpx;
  }

  .address {
    color: #666;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;

    &:first-child {
      border-top: none;
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;

      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}

.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }

  .item .text {
    width: 125rpx;
  }

  .picker {
    color: #666;
  }

  .picker::after {
    content: '\e6c2';
  }
}

/* 结算清单 */
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .danger {
    color: #cf4444;
  }
}

/* 吸底工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
</style>